<script setup>
import { ref, computed } from "vue";
import api from "/src/services/api.js";

const searchTerm = ref("");

const showModal = ref(false);
const selectedCoord = ref({});
const viewQRCode = (coordinator) => {
  selectedCoord.value = coordinator;
  showModal.value = true;
};

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

const coordenadores = ref("");

try {
  const response = await api.get("/listacoordenadores");
  coordenadores.value = response.data;
} catch (e) {
  console.log("Erro ao buscar lista de coordenadores!");
}

// Lógica de Filtragem (Equivalente ao useMemo do React)
// const filteredCoordinators = computed(() => {
//   const search = searchTerm.value.toLowerCase();
//   if (!search) return coordinators.value;

//   return coordinators.value.filter(
//     (c) =>
//       c.name.toLowerCase().includes(search) ||
//       c.validationCode.toLowerCase().includes(search) ||
//       c.camp.toLowerCase().includes(search),
//   );
// });
const filteredCoordinators = computed(() => {
  return (coordenadores.value || []).filter((c) => c.nome !== null);
});

// Ações
const openEditDialog = (coordinator) => {
  console.log("Editando:", coordinator);
};

const deleteCoordinator = (id) => {
  if (confirm("Tem certeza que deseja excluir este coordenador?")) {
    coordinators.value = coordinators.value.filter((c) => c.id !== id);
  }
};

const calculateAge = (birthday) => {
  if (!birthday) return "-";

  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Ajusta a idade se o mês atual for anterior ao mês de nascimento
  // ou se for o mesmo mês, mas o dia atual for anterior ao dia de nascimento
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age + " anos";
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
              v-for="coordinator in coordenadores"
              :key="coordinator.codigo"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3 font-medium text-gray-900">
                {{ coordinator.nome || "Não informado" }}
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ coordinator.documento || "-" }}
              </td>
              <!-- <td class="px-4 py-3 text-gray-600">
                {{ coordinator.idade ? coordinator.idade + " anos" : "-" }}
              </td> -->
              <td class="px-4 py-3 text-gray-600">
                <span>{{ calculateAge(coordinator.idade) }}</span>
              </td>

              <td class="px-4 py-3 text-gray-600">
                {{ coordinator.acampamento || "-" }}
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                >
                  {{ coordinator.codigo }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium"
                >
                  {{
                    new Date(coordinator.DataCadastro).toLocaleDateString(
                      "pt-BR",
                    )
                  }}
                </span>
              </td>

              <td class="px-4 py-3 text-right">
                <div class="flex justify-end gap-1">
                  <button
                    @click="openEditDialog(coordinator)"
                    class="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                    title="Editar"
                  >
                    <i class="fas fa-pencil-alt"></i>
                  </button>

                  <button
                    @click="viewQRCode(coordinator)"
                    class="p-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors"
                    title="Ver QR Code"
                  >
                    <i class="fas fa-qrcode"></i>
                  </button>

                  <button
                    @click="deleteCoordinator(coordinator.id)"
                    class="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                    title="Excluir"
                  >
                    <i class="fas fa-trash-alt"></i>
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

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200"
    >
      <button
        @click="showModal = false"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <i class="fas fa-times text-lg"></i>
      </button>

      <div class="space-y-4">
        <div
          class="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100"
        >
          <div class="text-center space-y-3">
            <div>
              <p
                class="text-[10px] uppercase tracking-widest text-indigo-500 font-bold"
              >
                Coordenador
              </p>
              <p class="text-gray-900 font-semibold">
                {{ selectedCoord.name }}
              </p>
            </div>
            <div>
              <p
                class="text-[10px] uppercase tracking-widest text-indigo-500 font-bold"
              >
                Acampamento
              </p>
              <p class="text-gray-900 font-semibold">
                {{ selectedCoord.camp || "Não informado" }}
              </p>
            </div>
            <div>
              <p
                class="text-[10px] uppercase tracking-widest text-indigo-500 font-bold mb-1"
              >
                Código de Validação
              </p>
              <span
                class="inline-block bg-indigo-600 text-white px-3 py-1 rounded text-sm font-mono tracking-wider"
              >
                {{ selectedCoord.validationCode }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="bg-white border-2 border-dashed border-gray-100 p-4 rounded-xl flex flex-col items-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/330px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png"
            alt="QR Code"
            class="w-48 h-48 object-contain"
          />

          <button
            class="mt-4 w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-lg border border-gray-200 transition-all text-sm font-medium"
          >
            <i class="fas fa-download text-xs"></i>
            Baixar QR Code
          </button>
        </div>

        <div class="text-[11px] text-gray-400 text-center leading-tight">
          <p>Este QR Code contém o código de validação do coordenador.</p>
          <p>Guarde-o com segurança para validação futura.</p>
        </div>
      </div>
    </div>
  </div>
</template>
