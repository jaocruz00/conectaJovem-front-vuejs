<script setup>
import { ref, reactive } from "vue";
import api from "/src/services/api.js";
import { toast } from "vue-sonner";

const CAMPS = ["Norte", "Sul", "Leste", "Oeste"];

const formData = reactive({
  nome: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  camp: "",
  event: "",
  team: "",
  local: "",
});

const cadastrarCoordenador = async () => {
  console.log("Dados enviados:", formData);
  try {
    const response = await api.post("/cadastrarcoordenador", formData);
    console.log("Sucesso:", response.data);

    if (response.status === 201 || response.status === 200) {
      toast.success("Cadastrado com sucesso", {
        style: { background: "#6ee7b7", color: "#000" },
      });
    }

    formData.value = "";
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    alert("Erro ao enviar o formulário. Entre em contato com o suporte.");
  }
};
</script>

<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-hidden border border-slate-200"
  >
    <div class="p-6 border-b border-slate-200">
      <h3 class="text-xl font-semibold flex items-center gap-2">
        <UserPlus class="w-5 h-5" />
        Cadastro de Coordenador
      </h3>
      <p class="text-sm text-slate-500 mt-1">
        Preencha os dados do coordenador para gerar um código de validação
      </p>
    </div>

    <div class="p-6">
      <form @submit.prevent="cadastrarCoordenador" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-2">
            <label for="nome" class="text-sm font-medium">Nome Completo</label>
            <input
              id="nome"
              v-model="formData.nome"
              placeholder="Digite o nome completo"
              class="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="cpf" class="text-sm font-medium">CPF</label>
            <input
              id="cpf"
              v-model="formData.cpf"
              placeholder="RG ou CPF"
              class="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="dataNascimento" class="text-sm font-medium"
              >Data Nascimento</label
            >
            <input
              id="dataNascimento"
              type="date"
              v-model="formData.dataNascimento"
              class="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="email" class="text-sm font-medium"
              >E-mail (Opcional)</label
            >
            <input
              id="email"
              type="email"
              v-model="formData.email"
              placeholder="email@exemplo.com"
              class="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="camp" class="text-sm font-medium">Acampamento</label>
            <select
              id="camp"
              v-model="formData.camp"
              class="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option disabled value="">Selecione o acampamento</option>
              <option v-for="camp in CAMPS" :key="camp" :value="camp">
                {{ camp }}
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label for="event" class="text-sm font-medium"
              >Evento (Opcional)</label
            >
            <input
              id="event"
              v-model="formData.event"
              placeholder="Ex: Retiro de Jovens 2025"
              class="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="team" class="text-sm font-medium"
              >Equipe (Opcional)</label
            >
            <input
              id="team"
              v-model="formData.team"
              placeholder="Ex: Equipe Alpha"
              class="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="local" class="text-sm font-medium"
              >Local (Opcional)</label
            >
            <input
              id="local"
              v-model="formData.local"
              placeholder="Ex: Cidade, Estado"
              class="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full md:w-auto cursor-pointer flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
        >
          <Check class="w-4 h-4" />
          Cadastrar Coordenador
        </button>
      </form>
    </div>
  </div>
</template>
