<script setup>
import { ref, computed, onMounted, watch } from "vue";
import api from "/src/services/api.js";

const participantes = ref([]);
const qtdParticipantes = ref("0");
const porcentagemPagamento = ref();
const receitaConfirmada = ref("0");
const receitaPendente = ref("0");
const listaEventos = ref([]);

const dataInicio = ref("");
const dataFim = ref("");

onMounted(async () => {
  try {
    const response = await api.get("/dadosrelatorio");
    participantes.value = response.data.participantes;
    qtdParticipantes.value = response.data.qtdParticipantes;
    porcentagemPagamento.value = response.data.porcentagemPagamento;
    receitaConfirmada.value = response.data.receitaConfirmada;
    receitaPendente.value = response.data.receitaPendente;

    listaEventos.value = response.data.dataEvento;
  } catch (error) {
    console.error("Erro na requisição:", error);
    router.push("/login");
  }
});

// Computed que filtra a lista original baseada nas datas
const eventosFiltrados = computed(() => {
  if (!dataInicio.value && !dataFim.value) return listaEventos.value;

  return listaEventos.value.filter((evento) => {
    const dataEv = new Date(evento.data);
    const inicio = dataInicio.value ? new Date(dataInicio.value) : null;
    const fim = dataFim.value ? new Date(dataFim.value) : null;

    // Ajuste de offset para evitar problemas de fuso horário no input date
    dataEv.setMinutes(dataEv.getMinutes() + dataEv.getTimezoneOffset());

    return (!inicio || dataEv >= inicio) && (!fim || dataEv <= fim);
  });
});

// --- ESTADOS DE INTERFACE ---
const tabAtiva = ref("participants");
const searchTerm = ref("");
const filterStatus = ref("all");
const filterForm = ref("all");
const expandedParticipant = ref(null);

// --- MOCK DE DADOS (Substitua pela sua API/Props) ---
const forms = ref([
  {
    id: "f1",
    name: "Evento Tech 2024",
    editionNumber: 1,
    groupName: "Geral",
    paymentAmount: 150.0,
  },
  {
    id: "f2",
    name: "Workshop Vue 3",
    editionNumber: 2,
    groupName: "Avançado",
    paymentAmount: 80.0,
  },
]);

const participantGroups = ref([
  {
    cpf: "123.456.789-00",
    name: "João Silva",
    totalPaid: 150.0,
    totalPending: 80.0,
    participations: [
      {
        id: "p1",
        formId: "f1",
        formName: "Evento Tech 2024",
        paymentStatus: "paid",
        paymentMethod: "pix",
        createdAt: "2024-03-20",
      },
      {
        id: "p2",
        formId: "f2",
        formName: "Workshop Vue 3",
        paymentStatus: "pending",
        paymentMethod: null,
        createdAt: "2024-03-25",
      },
    ],
  },
]);

// --- LÓGICA DE NEGÓCIO (Computed) ---

// 1. Estatísticas Gerais (Cards do Topo)
const stats = computed(() => {
  const total = participantGroups.value.reduce(
    (acc, g) => acc + g.participations.length,
    0,
  );
  const paidCount = participantGroups.value.reduce(
    (acc, g) =>
      acc + g.participations.filter((p) => p.paymentStatus === "paid").length,
    0,
  );

  return {
    total,
    paymentRate: total > 0 ? (paidCount / total) * 100 : 0,
    totalRevenue: participantGroups.value.reduce(
      (acc, g) => acc + g.totalPaid,
      0,
    ),
    pendingRevenue: participantGroups.value.reduce(
      (acc, g) => acc + g.totalPending,
      0,
    ),
  };
});

// 2. Filtro da Lista de Participantes
const filteredParticipantGroups = computed(() => {
  return participantGroups.value.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      group.cpf.includes(searchTerm.value);

    const matchesStatus =
      filterStatus.value === "all" ||
      group.participations.some((p) => p.paymentStatus === filterStatus.value);

    const matchesForm =
      filterForm.value === "all" ||
      group.participations.some((p) => p.formId === filterForm.value);

    return matchesSearch && matchesStatus && matchesForm;
  });
});

// 3. Estatísticas por Formulário
const formStats = computed(() => {
  return forms.value.map((form) => {
    const participations = participantGroups.value
      .flatMap((g) => g.participations)
      .filter((p) => p.formId === form.id);
    return {
      formName: form.name,
      groupName: form.groupName,
      requirePayment: form.paymentAmount > 0,
      total: participations.length,
      paid: participations.filter((p) => p.paymentStatus === "paid").length,
      pending: participations.filter((p) => p.paymentStatus === "pending")
        .length,
      revenue:
        participations.filter((p) => p.paymentStatus === "paid").length *
        form.paymentAmount,
    };
  });
});

// 4. Métodos de Pagamento
const paymentMethodStats = computed(() => {
  const methods = {};
  const allPaid = participantGroups.value
    .flatMap((g) => g.participations)
    .filter((p) => p.paymentStatus === "paid");

  if (allPaid.length === 0) return [];

  allPaid.forEach((p) => {
    const m = p.paymentMethod || "Outro";
    methods[m] = (methods[m] || 0) + 1;
  });

  return Object.keys(methods).map((key) => ({
    method: key.toUpperCase(),
    count: methods[key],
    percentage: (methods[key] / allPaid.length) * 100,
  }));
});

// --- FUNÇÕES DE AUXÍLIO ---
const getAttendanceStatus = (participationId, formId) => {
  // Simulação de check-in (aqui você buscaria em outra lista de presença se houver)
  return { checked: false };
};

const exportToCSV = () => {
  console.log("Exportando dados...", filteredParticipantGroups.value);
  alert("Função de exportação chamada!");
};
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="flex flex-row items-center justify-between pb-2">
          <h3 class="text-sm font-medium">Participantes Únicos</h3>
          <i class="fas fa-users h-4 w-4 text-gray-400"></i>
        </div>
        <div class="text-2xl font-bold">{{ qtdParticipantes }}</div>
        <p class="text-xs text-gray-500 mt-1">
          {{ stats.total }} inscrições totais
        </p>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="flex flex-row items-center justify-between pb-2">
          <h3 class="text-sm font-medium">Taxa de Pagamento</h3>
          <i class="fas fa-check-circle h-4 w-4 text-green-600"></i>
        </div>
        <div class="text-2xl font-bold">{{ porcentagemPagamento }}%</div>

        <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            class="bg-blue-600 h-2 rounded-full"
            :style="{ width: stats.paymentRate + '%' }"
          ></div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="flex flex-row items-center justify-between pb-2">
          <h3 class="text-sm font-medium">Receita Confirmada</h3>
          <i class="fas fa-dollar-sign h-4 w-4 text-green-600"></i>
        </div>
        <div class="text-2xl font-bold text-green-600">
          R$ {{ receitaConfirmada }}
        </div>
        <p class="text-xs text-gray-500 mt-1">Pagamentos recebidos</p>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="flex flex-row items-center justify-between pb-2">
          <h3 class="text-sm font-medium">Receita Pendente</h3>
          <i class="fas fa-clock h-4 w-4 text-orange-600"></i>
        </div>
        <div class="text-2xl font-bold text-orange-600">
          R$ {{ receitaPendente }}
        </div>
        <p class="text-xs text-gray-500 mt-1">Aguardando pagamento</p>
      </div>
    </div>

    <div class="w-full">
      <div class="flex bg-gray-100 p-1 rounded-lg mb-4 max-w-max">
        <button
          @click="tabAtiva = 'participants'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-all',
            tabAtiva === 'participants'
              ? 'bg-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          <i class="fas fa-user-check mr-2"></i> Por Participante
        </button>
        <button
          @click="tabAtiva = 'forms'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-all',
            tabAtiva === 'forms'
              ? 'bg-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          Por Formulário
        </button>
        <button
          @click="tabAtiva = 'payments'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-all',
            tabAtiva === 'payments'
              ? 'bg-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          Métodos de Pagamento
        </button>
        <button
          @click="tabAtiva = 'dataevento'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-all',
            tabAtiva === 'dataevento'
              ? 'bg-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          Data do evento
        </button>
      </div>

      <div v-if="tabAtiva === 'participants'" class="space-y-4">
        <div class="bg-white rounded-xl shadow-sm">
          <div class="p-6 -b -gray-100">
            <div class="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold">
                  Relatório por Participante
                </h3>
                <p class="text-sm text-gray-500">
                  Visualize o histórico completo de cada participante (agrupado
                  por CPF)
                </p>
              </div>
              <button
                @click="exportToCSV"
                class="inline-flex items-center px-4 py-2 rounded-md bg-white hover:bg-gray-50 text-sm font-medium"
              >
                <i class="fas fa-download mr-2"></i> Exportar CSV
              </button>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="relative">
                <i
                  class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                ></i>
                <input
                  type="text"
                  v-model="searchTerm"
                  placeholder="Buscar por CPF ou nome..."
                  class="w-full pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <select
                v-model="filterStatus"
                class="w-full p-2 rounded-md bg-white"
              >
                <option value="all">Todos os Status</option>
                <option value="paid">Pagos</option>
                <option value="pending">Pendentes</option>
              </select>

              <select
                v-model="filterForm"
                class="w-full p-2 rounded-md bg-white"
              >
                <option value="all">Todos os Formulários</option>
                <option v-for="form in forms" :key="form.id" :value="form.id">
                  {{ form.name }}
                </option>
              </select>
            </div>

            <div class="space-y-3">
              <div
                v-if="filteredParticipantGroups.length === 0"
                class="text-center py-12 text-gray-500 rounded-lg"
              >
                <i class="fas fa-users text-4xl mb-3 text-gray-300"></i>
                <p>Nenhum participante encontrado</p>
              </div>

              <div
                v-for="(group, index) in filteredParticipantGroups"
                :key="group.cpf"
                class="rounded-lg -l-4 -l-blue-500 overflow-hidden"
              >
                <div
                  @click="
                    expandedParticipant =
                      expandedParticipant === group.cpf ? null : group.cpf
                  "
                  class="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h4 class="font-bold text-gray-900">{{ group.name }}</h4>
                      <span
                        class="px-2 py-1 text-xs font-semibold bg-blue-50 -blue-200 rounded text-blue-700"
                        >{{ group.cpf }}</span
                      >
                      <span
                        class="px-2 py-1 text-xs font-semibold bg-gray-100 rounded text-gray-600"
                      >
                        {{ group.participations.length }}
                        {{
                          group.participations.length === 1
                            ? "inscrição"
                            : "inscrições"
                        }}
                      </span>
                    </div>
                    <div class="flex gap-3 text-sm">
                      <span class="text-gray-600"
                        >Total pago:
                        <span class="text-green-600 font-medium"
                          >R$ {{ group.totalPaid.toFixed(2) }}</span
                        ></span
                      >
                      <span v-if="group.totalPending > 0" class="text-gray-600">
                        • Pendente:
                        <span class="text-orange-600 font-medium"
                          >R$ {{ group.totalPending.toFixed(2) }}</span
                        >
                      </span>
                    </div>
                  </div>
                  <i
                    :class="[
                      'fas text-gray-400',
                      expandedParticipant === group.cpf
                        ? 'fa-chevron-up'
                        : 'fa-chevron-down',
                    ]"
                  ></i>
                </div>

                <div
                  v-show="expandedParticipant === group.cpf"
                  class="p-6 pt-0 bg-white"
                >
                  <div class="overflow-x-auto rounded-lg">
                    <table class="w-full text-sm text-left">
                      <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                          <th class="px-4 py-3">Formulário/Edição</th>
                          <th class="px-4 py-3">Grupo</th>
                          <th class="px-4 py-3 text-center">
                            Status Pagamento
                          </th>
                          <th class="px-4 py-3 text-center">Método</th>
                          <th class="px-4 py-3 text-center">Valor</th>
                          <th class="px-4 py-3 text-center">Presença</th>
                          <th class="px-4 py-3">Data Cadastro</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y">
                        <tr
                          v-for="participation in group.participations"
                          :key="participation.id"
                          class="hover:bg-gray-50"
                        >
                          <td class="px-4 py-3 font-medium">
                            <div class="flex flex-col">
                              <span>{{ participation.formName }}</span>
                              <span class="text-xs text-gray-500 font-normal"
                                >Edição
                                {{
                                  forms.find(
                                    (f) => f.id === participation.formId,
                                  )?.editionNumber
                                }}</span
                              >
                            </div>
                          </td>
                          <td class="px-4 py-3">
                            <span class="rounded px-2 py-0.5">{{
                              forms.find((f) => f.id === participation.formId)
                                ?.groupName || "-"
                            }}</span>
                          </td>
                          <td class="px-4 py-3 text-center">
                            <span
                              :class="[
                                'px-2.5 py-0.5 rounded-full text-xs font-bold text-white',
                                participation.paymentStatus === 'paid'
                                  ? 'bg-green-600'
                                  : 'bg-gray-400',
                              ]"
                            >
                              {{
                                participation.paymentStatus === "paid"
                                  ? "Pago"
                                  : "Pendente"
                              }}
                            </span>
                          </td>
                          <td class="px-4 py-3 text-center text-gray-600">
                            {{
                              participation.paymentMethod
                                ? participation.paymentMethod.toUpperCase()
                                : "-"
                            }}
                          </td>
                          <td class="px-4 py-3 text-center font-medium">
                            R$
                            {{
                              forms
                                .find((f) => f.id === participation.formId)
                                ?.paymentAmount?.toFixed(2) || "0.00"
                            }}
                          </td>
                          <td class="px-4 py-3 text-center">
                            <span
                              v-if="
                                getAttendanceStatus(
                                  participation.id,
                                  participation.formId,
                                )?.checked
                              "
                              class="bg-blue-600 text-white px-2 py-0.5 rounded text-xs flex items-center justify-center"
                            >
                              <i class="fas fa-check-circle mr-1"></i> Presente
                            </span>
                            <span
                              v-else
                              class="-gray-300 text-gray-500 px-2 py-0.5 rounded text-xs"
                              >Ausente</span
                            >
                          </td>
                          <td class="px-4 py-3 text-gray-600">
                            {{
                              new Date(
                                participation.createdAt,
                              ).toLocaleDateString("pt-BR")
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tabAtiva === 'forms'" class="space-y-4">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-1">
            Estatísticas por Formulário
          </h3>
          <p class="text-sm text-gray-500 mb-6">
            Desempenho de cada formulário criado
          </p>

          <div class="space-y-4">
            <p
              v-if="formStats.length === 0"
              class="text-center text-gray-500 py-8"
            >
              Nenhum participante cadastrado ainda
            </p>
            <div
              v-for="(stat, index) in formStats"
              :key="index"
              class="rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h4 class="font-bold text-gray-900">{{ stat.formName }}</h4>
                  <span
                    v-if="stat.groupName"
                    class="text-xs rounded px-2 mt-1 inline-block"
                    >{{ stat.groupName }}</span
                  >
                </div>
                <span
                  v-if="stat.requirePayment"
                  class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                >
                  R$ {{ stat.revenue.toFixed(2) }}
                </span>
              </div>
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p class="text-xs text-gray-500 uppercase">Total</p>
                  <p class="text-xl font-bold">{{ stat.total }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase">Pagos</p>
                  <p class="text-xl font-bold text-green-600">
                    {{ stat.paid }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase">Pendentes</p>
                  <p class="text-xl font-bold text-orange-600">
                    {{ stat.pending }}
                  </p>
                </div>
              </div>
              <div
                v-if="stat.requirePayment"
                class="w-full bg-gray-100 rounded-full h-2"
              >
                <div
                  class="bg-blue-600 h-2 rounded-full"
                  :style="{ width: (stat.paid / stat.total) * 100 + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tabAtiva === 'payments'" class="space-y-4">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-1">Métodos de Pagamento</h3>
          <p class="text-sm text-gray-500 mb-6">
            Distribuição dos pagamentos recebidos
          </p>

          <div class="space-y-4">
            <p
              v-if="paymentMethodStats.length === 0"
              class="text-center text-gray-500 py-8"
            >
              Nenhum pagamento confirmado ainda
            </p>
            <div
              v-for="(stat, index) in paymentMethodStats"
              :key="index"
              class="flex items-center gap-4 p-4 rounded-lg"
            >
              <div class="flex-1">
                <div class="flex justify-between mb-2">
                  <span class="font-medium">{{ stat.method }}</span>
                  <span class="text-sm text-gray-500"
                    >{{ stat.count }} pagamentos</span
                  >
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full"
                    :style="{ width: stat.percentage + '%' }"
                  ></div>
                </div>
              </div>
              <span
                class="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded"
                >{{ stat.percentage.toFixed(0) }}%</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Data do evento -->

      <div v-if="tabAtiva === 'dataevento'" class="space-y-4">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
          >
            <div>
              <h3 class="text-lg font-semibold text-gray-800">
                Datas do Evento
              </h3>
              <p class="text-sm text-gray-500">
                Filtrar cronograma por período
              </p>
            </div>

            <div class="flex items-center gap-2">
              <input
                type="date"
                v-model="dataInicio"
                class="text-sm border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span class="text-gray-400">até</span>
              <input
                type="date"
                v-model="dataFim"
                class="text-sm border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div class="space-y-3">
            <p
              v-if="eventosFiltrados.length === 0"
              class="text-center text-gray-400 py-8 italic"
            >
              Nenhum evento encontrado para este período.
            </p>

            <div
              v-for="(evento, index) in eventosFiltrados"
              :key="index"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500 transition-all"
            >
              <span class="font-medium text-gray-700">{{ evento.nome }}</span>
              <span class="text-sm font-semibold text-blue-600">
                {{ new Date(evento.data).toLocaleDateString("pt-BR") }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
