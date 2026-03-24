<script setup>
import { ref, onMounted, computed } from "vue";
import api from "/src/services/api.js";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import CadastroCoordenador from "./cadastroCoordenador.vue";
import ListaCoordenadores from "./listaCoordenadores.vue";
import CadastroFormulario from "./cadastroformulario.vue";
import Relatorios from "./Relatorios.vue";

const router = useRouter();

const nome = ref("");
const email = ref("");
const cargo = ref("");

const tabAtiva = ref("coordenador");

onMounted(async () => {
  try {
    const response = await api.get("/dados");
    console.log(response.data);

    nome.value = response.data.nome;
    email.value = response.data.email;
  } catch (error) {
    console.error("Erro na requisição:", error);
    router.push("/login");
  }
});

const logout = async () => {
  try {
    localStorage.removeItem("user_data");
    router.push("/login");
  } catch (error) {
    console.error("Erro ao deslogar no servidor:", error);
  }
};
</script>

<template>
  <!-- Sistema  -->
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8"
  >
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Painel do Administrador
            </h1>
            <p class="text-gray-600">
              Gerenciamento de acampamentos e coordenadores
            </p>
            <p class="text-sm text-gray-500 mt-1">Logado: {{ nome }}</p>
            <p class="text-sm text-gray-500 mt-1">E-mail: {{ email }}</p>
          </div>
          <button
            @click="logout"
            class="px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-white transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <div class="w-full">
        <div class="grid w-full grid-cols-4 bg-gray-200 p-1 rounded-lg">
          <button
            @click="tabAtiva = 'coordenador'"
            :class="[
              tabAtiva === 'coordenador'
                ? 'bg-white shadow'
                : 'hover:bg-gray-300',
            ]"
            class="py-2 text-sm font-medium rounded-md transition-all"
          >
            Gerenciamento de Coordenador
          </button>
          <button
            @click="tabAtiva = 'cadastroformulario'"
            :class="[
              tabAtiva === 'cadastroformulario'
                ? 'bg-white shadow'
                : 'hover:bg-gray-300',
            ]"
            class="py-2 text-sm font-medium rounded-md transition-all"
          >
            Cadastro de Formulário
          </button>
          <button
            @click="tabAtiva = 'relatorios'"
            :class="[
              tabAtiva === 'relatorios'
                ? 'bg-white shadow'
                : 'hover:bg-gray-300',
            ]"
            class="py-2 text-sm font-medium rounded-md transition-all"
          >
            Relatórios
          </button>
          <button
            @click="tabAtiva = 'migration'"
            :class="[
              tabAtiva === 'migration'
                ? 'bg-white shadow'
                : 'hover:bg-gray-300',
            ]"
            class="py-2 text-sm font-medium rounded-md transition-all"
          >
            Migração
          </button>
        </div>

        <div class="mt-6">
          <div v-if="tabAtiva === 'coordenador'">
            <CadastroCoordenador />
            <br />
            <br />
            <Suspense>
              <ListaCoordenadores />
            </Suspense>
          </div>

          <div v-if="tabAtiva === 'cadastroformulario'">
            <CadastroFormulario />
          </div>

          <div v-if="tabAtiva === 'relatorios'">
            <Relatorios />
          </div>

          <div v-if="tabAtiva === 'migration'">
            <DataMigration />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="flex h-screen">
    <aside
      id="sidebar"
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 text-slate-600 transition-transform -translate-x-full md:translate-x-0 md:static md:inset-0"
    >
      <div
        class="flex items-center h-16 bg-white border-b border-slate-100 gap-3 px-6"
      >
        <img src="/logo.png" class="w-8" alt="Logo" />

        <span class="text-slate-800 font-bold text-lg tracking-tight"
          >IPMO</span
        >
      </div>

      <nav class="mt-4 px-4 space-y-1 overflow-y-auto h-[calc(100vh-85px)]">
        <p class="text-[10px] uppercase font-bold text-slate-400 ml-2 mb-2">
          Principal
        </p>

        <router-link
          to="/dashboard"
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-green-600 transition-all"
        >
          <i class="fas fa-home w-5 text-center"></i> Dashboard
        </router-link>

        <p
          class="text-[10px] uppercase font-bold text-slate-400 ml-2 mt-6 mb-2"
        >
          Aposentadoria
        </p>

        <router-link
          to="/reqaposentadoria"
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-green-600 transition-all"
        >
          <i class="fas fa-user-check w-5 text-center"></i> Req aposentadoria
        </router-link>

        <router-link
          to="/provavida"
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-green-600 transition-all"
        >
          <i class="fas fa-heartbeat w-5 text-center"></i> Prova de vida
        </router-link>

        <router-link
          to="/listaaposentados"
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-green-600 transition-all"
        >
          <i class="fas fa-users w-5 text-center"></i> Lista aposentados
        </router-link>

        <router-link
          to="/simulador"
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-green-600 transition-all w-full text-left"
        >
          <i class="fas fa-calculator w-5 text-center"></i>
          Simulador
        </router-link>

        <p
          class="text-[10px] uppercase font-bold text-slate-400 ml-2 mt-6 mb-2"
        >
          Outros
        </p>

        <router-link
          to="/requerimentogenerico"
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-green-600 transition-all"
        >
          <i class="fas fa-file-contract w-5 text-center"></i> Requerimento
          genérico
        </router-link>

        <p
          class="text-[10px] uppercase font-bold text-slate-400 ml-2 mt-6 mb-2"
        >
          Rh
        </p>

        <router-link
          to="/abono"
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-green-600 transition-all"
        >
          <i class="fas fa-money-bill-wave w-5 text-center"></i> Abono
        </router-link>

        <router-link
          to="/margemconsignado"
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-green-600 transition-all"
        >
          <i class="fas fa-percentage w-5 text-center"></i> Margem Consignado
        </router-link>
      </nav>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header
        class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8"
      >
        <div class="flex items-center gap-4">
          <button @click="alternarMenu" class="md:hidden text-slate-600">
            <i class="fas fa-bars text-xl"></i>
          </button>

          <div
            class="hidden lg:flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:bg-white transition-all"
          >
            <i class="fas fa-search text-slate-400 mr-2"></i>
            <input
              type="text"
              placeholder="Buscar no banco..."
              class="bg-transparent outline-none text-sm w-64"
            />
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden md:block text-right">
            <p class="text-sm font-bold text-slate-800 leading-tight">
              {{ nome || "Carregando..." }}
            </p>
            <span
              class="text-[10px] py-0.5 px-2 bg-slate-100 text-slate-600 rounded-full font-bold uppercase"
              >{{ cargo || "Carregando..." }}</span
            >
          </div>
          <div class="relative group">
            <button
              class="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden group-hover:ring-2 group-hover:ring-green-500 transition-all"
            >
              <img
                src="https://ui-avatars.com/api/?name=Professor&background=2563eb&color=fff"
                alt="Perfil"
              />
            </button>

            <div
              class="absolute right-0 pt-2 w-48 hidden group-hover:block z-[100]"
            >
              <div
                class="bg-white rounded-xl shadow-xl border border-slate-100 py-2"
              >
                <a
                  href="/perfil"
                  class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <i class="fas fa-user mr-2"></i> Perfil
                </a>

                <hr class="my-2 border-slate-100" />

                <button
                  @click="logout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <i class="fas fa-sign-out-alt mr-2"></i> Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="flex-1 bg-slate-50 relative overflow-y-auto p-5">
        <router-view />
      </div>
    </main>
  </div>

  <div
    v-if="modalAberto"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-none transition-opacity"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all border border-slate-100"
    >
      <div
        class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
      >
        <h3 class="text-xl font-bold text-slate-800 tracking-tight">
          Selecione suas questoes!
        </h3>
        <button
          @click="navegarParaQuestoes"
          class="group p-2 rounded-full hover:bg-red-50 transition-colors"
        >
          <i
            class="fas fa-times text-slate-400 group-hover:text-red-500 transition-colors"
          ></i>
        </button>
      </div>

      <div class="p-8 text-slate-600 leading-relaxed">
        <div class="flex items-start gap-4 mb-6">
          <div class="bg-green-50 p-3 rounded-xl">
            <i class="fa-solid fa-lightbulb text-green-600 text-xl"></i>
          </div>
          <p class="text-lg text-slate-600 leading-relaxed">
            Ao fundo, você pode encontrar e selecionar as questões que deseja
            usar.
          </p>
        </div>

        <div
          class="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100"
        >
          <p class="text-lg flex items-center gap-2">
            1. Clique no
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-200"
            >
              <i class="fa-solid fa-file-circle-plus text-green-600"></i>
            </span>
            para adicionar questões.
          </p>
          <p class="text-lg flex items-center gap-2 flex-wrap">
            2. Finalize clicando em
            <span
              class="inline-flex items-center gap-1.5 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
            >
              <i class="fas fa-magic text-[10px]"></i> Ver prova
            </span>
            no topo.
          </p>
        </div>
      </div>

      <div class="px-8 pb-8 flex justify-center">
        <button
          @click="navegarParaQuestoes"
          class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95"
        >
          Entendi, vamos lá!
        </button>
      </div>
    </div>
  </div> -->
</template>
