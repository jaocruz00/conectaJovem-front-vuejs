<script setup>
import { ref } from "vue";

// Simulação de dados que viriam de uma API
const membros = ref([
  {
    id: 1,
    nome: "Ana Maria Silva",
    iniciais: "AM",
    cor: "bg-indigo-500",
    presenca: "95% (20/21)",
    status: "Pago",
    progresso: 90,
  },
  {
    id: 2,
    nome: "Ricardo Oliveira",
    iniciais: "RO",
    cor: "bg-orange-400",
    presenca: "60% (12/21)",
    status: "Pendente",
    progresso: 45,
  },
  {
    id: 3,
    nome: "Beatriz Ferraz",
    iniciais: "BF",
    cor: "bg-emerald-500",
    presenca: "100% (21/21)",
    status: "Pago",
    progresso: 98,
  },
]);

const formatStatus = (status) => {
  return status === "Pago"
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 font-sans">
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard de Engajamento</h1>
      <p class="text-gray-500">Visão geral de métricas e status financeiro.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </span>
          <span class="text-sm font-medium text-green-500"
            >+5% vs mês ant.</span
          >
        </div>
        <h3 class="text-gray-500 text-sm font-medium">Presença Média</h3>
        <p class="text-2xl font-bold text-gray-800">87.4%</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-green-100 text-green-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span class="text-sm font-medium text-red-500">2 pendentes</span>
        </div>
        <h3 class="text-gray-500 text-sm font-medium">Receita Mensal</h3>
        <p class="text-2xl font-bold text-gray-800">R$ 12.450,00</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </span>
          <span class="text-sm font-medium text-purple-500"
            >Alta atividade</span
          >
        </div>
        <h3 class="text-gray-500 text-sm font-medium">
          Índice de Participação
        </h3>
        <p class="text-2xl font-bold text-gray-800">92%</p>
      </div>
    </div>

    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div
        class="p-6 border-b border-gray-100 flex justify-between items-center"
      >
        <h2 class="text-lg font-bold text-gray-800">
          Status dos Participantes
        </h2>
        <button
          class="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md active:scale-95"
        >
          Exportar Relatório
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase"
              >
                Membro
              </th>
              <th
                class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase"
              >
                Presença
              </th>
              <th
                class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase"
              >
                Pagamento
              </th>
              <th
                class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase"
              >
                Nível de Participação
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="membro in membros"
              :key="membro.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 flex items-center">
                <div
                  :class="[
                    membro.cor,
                    'h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3',
                  ]"
                >
                  {{ membro.iniciais }}
                </div>
                <span class="font-medium text-gray-700">{{ membro.nome }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ membro.presenca }}
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    formatStatus(membro.status),
                    'px-2 py-1 rounded-full text-xs font-bold',
                  ]"
                >
                  {{ membro.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="w-full bg-gray-200 rounded-full h-2 max-w-[150px]">
                  <div
                    class="bg-indigo-600 h-2 rounded-full"
                    :style="{ width: membro.progresso + '%' }"
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
