<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import api from "/src/services/api.js";
import { toast } from "vue-sonner";

// --- ESTADO DO FORMULÁRIO PRINCIPAL ---
const nomeGrupo = ref("");
const nomeFormulario = ref("");
const formDescription = ref("");
const dataAcampamento = ref("");
const campLogo = ref("");
const slotsType = ref("unlimited");
const maxSlots = ref(null);
const formularioStatus = ref("active");
const requerPagamentpo = ref(false);
const valorPagamento = ref(0);
const selectedPaymentMethods = ref([]);
const fields = ref([]);
const formulariosSalvos = ref([]);
const editandoFormId = ref(null);
const mostrarVisualizacao = ref(false);

// --- TIPOS DE CAMPO DISPONÍVEIS ---
const FIELD_TYPES = [
  { label: "Texto Curto", value: "text" },
  { label: "Texto Longo", value: "textarea" },
  { label: "Número", value: "number" },
  { label: "Data", value: "date" },
  { label: "Seleção (Dropdown)", value: "select" },
  { label: "Múltipla Escolha", value: "checkbox" },
  { label: "E-mail", value: "email" },
];

const paymentMethods = [
  { id: "pix", label: "PIX" },
  { id: "credit_card", label: "Cartão de Crédito" },
  { id: "boleto", label: "Boleto" },
];

// --- ESTADO DO NOVO CAMPO ---
const currentField = reactive({
  type: "text",
  label: "",
  required: false,
  optionsString: "",
});

// --- COMPUTED ---
const hasNomeField = computed(() => {
  return fields.value.some((f) => f.label.toLowerCase().includes("nome"));
});

// --- MÉTODOS ---
const addField = () => {
  if (!currentField.label) return;

  const newField = {
    id: Date.now(),
    type: currentField.type,
    label: currentField.label,
    required: currentField.required,
    options: currentField.optionsString
      ? currentField.optionsString.split(",").map((s) => s.trim())
      : [],
  };

  fields.value.push(newField);

  // Resetar campo atual
  currentField.label = "";
  currentField.required = false;
  currentField.optionsString = "";
};

const removeField = (id) => {
  fields.value = fields.value.filter((f) => f.id !== id);
};

const togglePaymentMethod = (methodId) => {
  const index = selectedPaymentMethods.value.indexOf(methodId);
  if (index > -1) {
    selectedPaymentMethods.value.splice(index, 1);
  } else {
    selectedPaymentMethods.value.push(methodId);
  }
};

const cancelEditing = () => {
  editandoFormId.value = null;
  resetaFormulario();
};

const resetaFormulario = () => {
  nomeGrupo.value = "";
  nomeFormulario.value = "";
  formDescription.value = "";
  dataAcampamento.value = "";
  campLogo.value = "";
  slotsType.value = "unlimited";
  maxSlots.value = null;
  formularioStatus.value = "active";
  requerPagamentpo.value = false;
  valorPagamento.value = 0;
  selectedPaymentMethods.value = [];
  fields.value = [];
};

// --- API ACTIONS ---
const fetchForms = async () => {
  try {
    const { data } = await api.get("/forms");
    formulariosSalvos.value = data;
  } catch (error) {
    console.error("Erro ao buscar formulários:", error);
  } finally {
  }
};

const saveForm = async () => {
  const dadosFormulario = {
    nomeGrupo: nomeGrupo.value,

    nome: nomeFormulario.value,
    descricao: formDescription.value,
    dataAcampamento: dataAcampamento.value,
    campLogo: campLogo.value,
    slotsType: slotsType.value,
    maxSlots: slotsType.value === "limited" ? maxSlots.value : "unlimited",
    status: formularioStatus.value,
    requerPagamentpo: requerPagamentpo.value,
    valorPagamento: valorPagamento.value,
    paymentMethods: selectedPaymentMethods.value,
    fields: fields.value,
  };

  try {
    if (editandoFormId.value) {
      await api.put(`/forms/${editandoFormId.value}`, dadosFormulario);
    } else {
      const res = await api.post("/criarformulario", dadosFormulario);

      if (res.status === 201 || res.status === 200) {
        toast.success(res.data, {
          style: { background: "#6ee7b7", color: "#000" },
        });
        resetaFormulario();
      } else {
        toast.error("Erro ao criar formulario");
      }
    }
    await fetchForms();
    resetaFormulario();
    editandoFormId.value = null;
  } catch (error) {
    alert("Erro ao salvar formulário");
    toast.error("Erro ao criar formulario");
  }
};

const handleEditForm = (form) => {
  editandoFormId.value = form.id;
  nomeGrupo.value = form.nomeGrupo;
  nomeFormulario.value = form.name;
  formDescription.value = form.descricao;
  dataAcampamento.value = form.dataAcampamento;
  campLogo.value = form.campLogo;
  slotsType.value = form.slotsType;
  maxSlots.value = form.maxSlots === "unlimited" ? null : form.maxSlots;
  formularioStatus.value = form.status;
  requerPagamentpo.value = form.requerPagamentpo;
  valorPagamento.value = form.valorPagamento;
  selectedPaymentMethods.value = form.paymentMethods;
  fields.value = [...form.fields];
};

onMounted(fetchForms);
</script>

<template>
  <div class="space-y-6">
    <div
      class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div class="p-6 border-b border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-bold flex items-center gap-2 text-gray-800">
              <i class="fas fa-file-alt text-blue-600"></i>
              {{
                editandoFormId
                  ? "Editando Formulário"
                  : "Construtor de Formulários"
              }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              {{
                editandoFormId
                  ? "Faça as alterações necessárias e salve"
                  : "Crie formulários personalizados para cadastro de participantes"
              }}
            </p>
          </div>
          <button
            v-if="editandoFormId"
            @click="cancelEditing"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar Edição
          </button>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700"
              >Grupo / Acampamento *</label
            >
            <input
              v-model="nomeGrupo"
              type="text"
              placeholder="Ex: Acampamento Verão 2024"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700"
              >Nome do Formulário *</label
            >
            <input
              v-model="nomeFormulario"
              type="text"
              placeholder="Ex: Formulário de Inscrição"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Descrição</label>
            <input
              v-model="formDescription"
              type="text"
              placeholder="Breve descrição"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700"
              >Data do Acampamento (Opcional)</label
            >
            <input
              v-model="dataAcampamento"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700"
              >Logo URL (Opcional)</label
            >
            <input
              v-model="campLogo"
              type="url"
              placeholder="https://..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <div v-if="campLogo" class="mt-2">
              <img
                :src="campLogo"
                class="h-16 w-16 object-contain border rounded-md bg-gray-50"
                alt="Preview"
              />
            </div>
          </div>
        </div>

        <div class="border border-blue-100 rounded-xl p-5 bg-blue-50 space-y-4">
          <div class="flex items-center gap-2">
            <i class="fas fa-users text-blue-600"></i>
            <span class="font-semibold text-blue-900">Controle de Vagas</span>
          </div>

          <div class="space-y-3">
            <label
              @click="slotsType = 'unlimited'"
              class="flex items-center p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-all"
            >
              <input
                type="radio"
                value="unlimited"
                v-model="slotsType"
                class="w-4 h-4 text-blue-600"
              />
              <span class="ml-3 text-sm text-gray-700 font-medium"
                >Sem limite de vagas</span
              >
            </label>

            <label
              @click="slotsType = 'limited'"
              class="flex items-center p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-all"
            >
              <input
                type="radio"
                value="limited"
                v-model="slotsType"
                class="w-4 h-4 text-blue-600"
              />
              <span class="ml-3 text-sm text-gray-700 font-medium"
                >Quantidade específica de vagas</span
              >
            </label>
          </div>

          <div v-if="slotsType === 'limited'" class="pl-7 space-y-2">
            <label class="text-sm font-medium text-blue-900"
              >Número de Vagas Disponíveis *</label
            >
            <input
              v-model="maxSlots"
              type="number"
              min="1"
              class="w-full md:w-48 px-3 py-2 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p class="text-xs text-blue-700 flex items-center gap-1">
              <i class="far fa-lightbulb"></i> As vagas serão decrementadas
              automaticamente
            </p>
          </div>
        </div>

        <div class="border rounded-xl p-5 bg-green-50 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i
                :class="
                  formularioStatus === 'active'
                    ? 'fas fa-check-circle text-green-600'
                    : 'fas fa-times-circle text-yellow-600'
                "
              ></i>
              <span class="font-semibold text-gray-900"
                >Status do Formulário</span
              >
            </div>
            <div class="flex items-center gap-3">
              <span
                :class="[
                  'text-sm font-bold',
                  formularioStatus === 'active'
                    ? 'text-green-700'
                    : 'text-yellow-700',
                ]"
              >
                {{ formularioStatus === "active" ? "Ativo" : "Inativo" }}
              </span>
              <div
                @click="
                  formularioStatus =
                    formularioStatus === 'active' ? 'inactive' : 'active'
                "
                :class="[
                  'w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300',
                  formularioStatus === 'active'
                    ? 'bg-green-500'
                    : 'bg-gray-300',
                ]"
              >
                <div
                  :class="[
                    'bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300',
                    formularioStatus === 'active'
                      ? 'translate-x-6'
                      : 'translate-x-0',
                  ]"
                ></div>
              </div>
            </div>
          </div>
          <p
            class="text-sm"
            :class="
              formularioStatus === 'active'
                ? 'text-green-700'
                : 'text-yellow-700'
            "
          >
            {{
              formularioStatus === "active"
                ? "✅ Formulário ativo - Coordenadores podem cadastrar participantes"
                : "⚠️ Formulário inativo - Não permite novas inscrições"
            }}
          </p>
        </div>

        <div class="border rounded-xl p-5 bg-amber-50 space-y-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="requerPagamentpo"
              class="w-4 h-4 rounded text-amber-600"
            />
            <span class="font-medium text-gray-900"
              >Exigir pagamento de taxa de inscrição</span
            >
          </label>

          <p v-if="!requerPagamentpo" class="text-sm text-amber-700 italic">
            ⚠️ A inscrição será gratuita
          </p>

          <div
            v-if="requerPagamentpo"
            class="pl-6 space-y-4 border-l-2 border-amber-200"
          >
            <div class="space-y-2">
              <label class="text-sm font-medium">Valor da Taxa (R$) *</label>
              <input
                v-model="valorPagamento"
                type="number"
                step="0.01"
                class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium"
                >Métodos de Pagamento Disponíveis *</label
              >
              <div class="grid grid-cols-2 gap-3 mt-2">
                <div
                  v-for="method in paymentMethods"
                  :key="method.id"
                  @click="togglePaymentMethod(method.id)"
                  :class="[
                    'flex items-center p-3 rounded-lg border cursor-pointer transition-all',
                    selectedPaymentMethods.includes(method.id)
                      ? 'bg-indigo-50 border-indigo-500'
                      : 'bg-white hover:bg-gray-50',
                  ]"
                >
                  <input
                    type="checkbox"
                    :checked="selectedPaymentMethods.includes(method.id)"
                    class="w-4 h-4 text-indigo-600"
                  />
                  <span class="ml-3 text-sm font-medium">{{
                    method.label
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-6">
          <h3 class="font-bold text-gray-900 mb-4">
            Adicionar Campo ao Formulário
          </h3>

          <div
            v-if="fields.length > 0 && !hasNomeField"
            class="mb-4 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg flex gap-3"
          >
            <i class="fas fa-exclamation-triangle text-orange-600 mt-1"></i>
            <p class="text-sm text-orange-800">
              <strong>Atenção:</strong> Adicione um campo
              <strong>"Nome"</strong> obrigatório para os relatórios.
            </p>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
          >
            <div class="space-y-2">
              <label class="text-sm font-medium">Tipo</label>
              <select
                v-model="currentField.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
              >
                <option
                  v-for="t in FIELD_TYPES"
                  :key="t.value"
                  :value="t.value"
                >
                  {{ t.label }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Rótulo do Campo</label>
              <input
                v-model="currentField.label"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div
              v-if="['select', 'checkbox'].includes(currentField.type)"
              class="space-y-2"
            >
              <label class="text-sm font-medium">Opções (vídgula)</label>
              <input
                v-model="currentField.optionsString"
                type="text"
                placeholder="Opção 1, Opção 2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div class="flex items-center h-10">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="currentField.required"
                  class="w-4 h-4"
                />
                <span class="text-sm">Obrigatório</span>
              </label>
            </div>
          </div>
          <button
            @click="addField"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm"
          >
            <i class="fas fa-plus mr-2"></i> Adicionar Campo
          </button>
        </div>

        <div v-if="fields.length > 0" class="border-t border-gray-100 pt-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-gray-900">
              Campos Adicionados ({{ fields.length }})
            </h3>
            <button
              @click="mostrarVisualizacao = true"
              class="text-sm text-blue-600 font-bold hover:underline"
            >
              <i class="fas fa-eye mr-1"></i> Visualizar
            </button>
          </div>

          <div class="space-y-2">
            <div
              v-for="(field, index) in fields"
              :key="field.id"
              class="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl"
            >
              <div class="flex items-center gap-4">
                <span class="text-xs font-bold text-gray-400"
                  >#{{ index + 1 }}</span
                >
                <div>
                  <p class="font-bold text-gray-800">{{ field.label }}</p>
                  <div class="flex gap-2 mt-1">
                    <span
                      class="px-2 py-0.5 bg-gray-200 text-gray-700 text-[10px] font-bold uppercase rounded"
                      >{{ field.type }}</span
                    >
                    <span
                      v-if="field.required"
                      class="px-2 py-0.5 border border-red-200 text-red-600 text-[10px] font-bold uppercase rounded"
                      >Obrigatório</span
                    >
                  </div>
                </div>
              </div>
              <button
                @click="removeField(field.id)"
                class="p-2 text-red-400 hover:text-red-600 transition-colors"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-gray-100 flex gap-3">
          <button
            @click="saveForm"
            :disabled="fields.length === 0"
            class="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-300 transition-all"
          >
            <i class="fas fa-save mr-2"></i>
            {{ editandoFormId ? "Atualizar Formulário" : "Salvar Formulário" }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="formulariosSalvos.length > 0"
      class="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
    >
      <h3 class="text-lg font-bold text-gray-800 mb-6">Formulários Ativos</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="form in formulariosSalvos"
          :key="form.id"
          :class="[
            'p-5 border-2 rounded-xl transition-all',
            editandoFormId === form.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-100 bg-white',
          ]"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <h4 class="font-bold text-gray-900">{{ form.name }}</h4>
              <p class="text-xs text-gray-500">{{ form.nomeGrupo }}</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="handleEditForm(form)"
                class="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <i class="fas fa-edit text-gray-600"></i>
              </button>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mt-4">
            <span
              class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded"
              >{{ form.fields.length }} campos</span
            >
            <span
              v-if="form.requerPagamentpo"
              class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded"
              >R$ {{ form.valorPagamento }}</span
            >
            <span
              v-else
              class="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded"
              >Gratuito</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
