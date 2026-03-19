<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const email = ref("leonardohsmacedo@gmail.com");
const senha = ref("Leonardo");
const cargo = ref("");

const realizarLogin = async () => {
  if (!cargo.value) {
    alert("Selecione se você é Superior ou coordenador");
    return; // Interrompe a execução
  }

  try {
    const response = await axios.post("http://localhost:8080/login", {
      email: email.value,
      senha: senha.value,
      cargo: cargo.value,
    });

    const userData = response.data;

    localStorage.setItem("user_data", JSON.stringify(userData));

    router.push("/dashboard");
  } catch (e) {
    senha.value = ""; // Boa prática: limpa apenas a senha
  }
};
</script>
<!-- login -->

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md bg-white rounded-xl shadow-md">
      <!-- Header -->
      <div class="text-center space-y-2 p-6 border-b">
        <h2 class="text-2xl font-bold">Bem-vindo</h2>
        <p class="text-gray-500 text-sm">Faça login para acessar sua conta</p>
      </div>

      <!-- Content -->
      <div class="p-6">
        <form @submit.prevent="realizarLogin" class="space-y-5">
          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium">E-mail</label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              >
                📧
              </span>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                v-model="email"
                class="w-full pl-10 pr-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-gray-50 transition"
              />
              <!-- <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                v-model="email"
                class="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              /> -->
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium">Senha</label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              >
                🔒
              </span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                v-model="senha"
                class="w-full pl-10 pr-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-gray-50 transition"
              />
              <!-- <input
                id="password"
                type="password"
                placeholder="••••••••"
                v-model="password"
                class="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              /> -->
            </div>
          </div>

          <!-- regra -->
          <div class="space-y-3">
            <label class="text-sm font-medium">Cargo</label>

            <div class="space-y-2">
              <label
                class="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition"
              >
                <input type="radio" value="coordenador" v-model="cargo" />
                <span class="flex-1">Coordenador</span>
              </label>

              <label
                class="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition"
              >
                <input type="radio" value="superior" v-model="cargo" />
                <span class="flex-1">Superior</span>
              </label>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full cursor-pointer bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition"
          >
            Entrar
          </button>

          <!-- Forgot -->
          <div class="text-center">
            <button type="button" class="text-sm text-blue-600 hover:underline">
              Esqueceu sua senha?
            </button>
          </div>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-2 text-gray-500">OU</span>
            </div>
          </div>

          <!-- Create account -->
          <button
            type="button"
            class="w-full border py-2 rounded-md hover:bg-gray-50 transition"
          >
            Criar conta
          </button>

          <!-- Info -->
          <div
            class="mt-4 p-3 bg-blue-50 rounded-md text-xs text-gray-600 space-y-1"
          >
            <p><strong>Credenciais de teste:</strong></p>
            <p>Superior: qualquer email + senha: admin123</p>
            <p>Coordenador: qualquer email + senha: coord123</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- Sistema  -->
<!-- <template>
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
            <p class="text-sm text-gray-500 mt-1">
              Logado como: {{ userEmail }}
            </p>
          </div>
          <button
            @click="handleLogout"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-white transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <div class="w-full">
        <div class="grid w-full grid-cols-4 bg-gray-200 p-1 rounded-lg">
          <button
            @click="activeTab = 'coordinators'"
            :class="[
              activeTab === 'coordinators'
                ? 'bg-white shadow'
                : 'hover:bg-gray-300',
            ]"
            class="py-2 text-sm font-medium rounded-md transition-all"
          >
            Gerenciamento de Coordenador
          </button>
          <button
            @click="activeTab = 'forms'"
            :class="[
              activeTab === 'forms' ? 'bg-white shadow' : 'hover:bg-gray-300',
            ]"
            class="py-2 text-sm font-medium rounded-md transition-all"
          >
            Cadastro de Formulário
          </button>
          <button
            @click="activeTab = 'reports'"
            :class="[
              activeTab === 'reports' ? 'bg-white shadow' : 'hover:bg-gray-300',
            ]"
            class="py-2 text-sm font-medium rounded-md transition-all"
          >
            Relatórios
          </button>
          <button
            @click="activeTab = 'migration'"
            :class="[
              activeTab === 'migration'
                ? 'bg-white shadow'
                : 'hover:bg-gray-300',
            ]"
            class="py-2 text-sm font-medium rounded-md transition-all"
          >
            Migração
          </button>
        </div>

        <div class="mt-6">
          <div v-if="activeTab === 'coordinators'">
            <CoordinatorManagement />
          </div>

          <div v-if="activeTab === 'forms'">
            <DemoGuide />
            <FormBuilder class="mt-4" />
          </div>

          <div v-if="activeTab === 'reports'">
            <Reports />
          </div>

          <div v-if="activeTab === 'migration'">
            <DataMigration />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
