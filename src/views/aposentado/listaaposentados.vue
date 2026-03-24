<script setup>
import { ref } from "vue";

// Exemplo de dados recebidos
const dados = ref([
  {
    id: 1,
    nome: "João Silva",
    tipo: "Aposentado",
    processo: "12345-67",
  },
  {
    id: 1,
    nome: "Leonardo Henrique da Silva Macedo",
    tipo: "Aposentado",
    processo: "12345-67",
  },
  {
    id: 2,
    nome: "Maria Souza",
    tipo: "Pensionista",
    processo: "98765-43",
  },
]);
</script>

<template>
  <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-bold text-slate-800">Lista de segurados</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-slate-600">
        <thead class="text-xs text-slate-500 uppercase bg-slate-50">
          <tr>
            <th scope="col" class="px-6 py-3">Nome</th>
            <th scope="col" class="px-6 py-3">Tipo</th>
            <th scope="col" class="px-6 py-3">Processo</th>
            <th scope="col" class="px-6 py-3 rounded-r-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in dados"
            :key="item.id"
            class="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <td class="px-6 py-4 font-semibold text-slate-700">
              {{ item.nome }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  item.tipo === 'Aposentado'
                    ? 'bg-sky-50 text-sky-700'
                    : 'bg-amber-50 text-amber-700',
                ]"
              >
                {{ item.tipo }}
              </span>
            </td>
            <td class="px-6 py-4 font-mono text-xs text-slate-500">
              {{ item.processo }}
            </td>
            <td class="px-6 py-4">
              <button
                class="text-green-600 hover:text-green-800 font-medium mr-3"
              >
                <i class="fas fa-edit"></i>
              </button>

              <button
                class="text-blue-600 hover:text-blue-800 font-medium mr-3"
              >
                <i class="fas fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
