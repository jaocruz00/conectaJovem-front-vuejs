<script setup>
import { ref, computed } from "vue";
import api from "/src/services/api.js";

const searchTerm = ref("");
const coordinators = ref([
  {
    id: 1,
    name: "João Silva",
    document: "123.456.789-00",
    age: 35,
    camp: "Vale Verde",
    validationCode: "COORD-001",
    createdAt: new Date().toISOString(),
  },
]);

// Lógica de Filtragem (Equivalente ao useMemo do React)
const filteredCoordinators = computed(() => {
  const search = searchTerm.value.toLowerCase();
  if (!search) return coordinators.value;

  return coordinators.value.filter(
    (c) =>
      c.name.toLowerCase().includes(search) ||
      c.validationCode.toLowerCase().includes(search) ||
      c.camp.toLowerCase().includes(search),
  );
});

// Ações
const openEditDialog = (coordinator) => {
  console.log("Editando:", coordinator);
};

const viewQRCode = (coordinator) => {
  console.log("Vendo QR Code de:", coordinator.name);
};

const deleteCoordinator = (id) => {
  if (confirm("Tem certeza que deseja excluir este coordenador?")) {
    coordinators.value = coordinators.value.filter((c) => c.id !== id);
  }
};
</script>

<template>
  <div
    class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
  >
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center gap-2 text-xl font-semibold text-gray-900">
        <Users class="w-5 h-5 text-blue-600" />
        Gerenciamento de Coordenadores
      </div>
      <p class="mt-1 text-sm text-gray-500">
        Visualize e gerencie todos os coordenadores cadastrados
      </p>
    </div>

    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <div class="relative flex-1 max-w-md">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          />
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar por nome, código ou acampamento..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div
        v-if="filteredCoordinators.length === 0"
        class="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl"
      >
        <Users class="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p class="text-gray-500 font-medium">
          {{
            searchTerm
              ? "Nenhum coordenador encontrado"
              : "Nenhum coordenador cadastrado ainda"
          }}
        </p>
      </div>

      <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th class="px-4 py-3">Nome</th>
              <th class="px-4 py-3">Documento</th>
              <th class="px-4 py-3">Idade</th>
              <th class="px-4 py-3">Acampamento</th>
              <th class="px-4 py-3">Código</th>
              <th class="px-4 py-3">Data Cadastro</th>
              <th class="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="coordinator in filteredCoordinators"
              :key="coordinator.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ coordinator.name }}
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ coordinator.document }}
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ coordinator.age }} anos
              </td>
              <td class="px-4 py-3 text-gray-600">{{ coordinator.camp }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                >
                  {{ coordinator.validationCode }}
                </span>
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ new Date(coordinator.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex justify-end gap-1">
                  <button
                    @click="openEditDialog(coordinator)"
                    class="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                    title="Editar"
                  >
                    <Pencil class="w-4 h-4" />
                  </button>
                  <button
                    @click="viewQRCode(coordinator)"
                    class="p-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors"
                    title="Ver QR Code"
                  >
                    <QrCode class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteCoordinator(coordinator.id)"
                    class="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                    title="Excluir"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-500 italic"
      >
        <p>
          Total de coordenadores:
          <span class="font-semibold text-gray-800">{{
            filteredCoordinators.length
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
