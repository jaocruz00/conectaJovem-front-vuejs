<script setup>
import { ref } from "vue";
import { mask } from "vue-the-mask";
import api from "../../services/api";

const vMask = mask;

const form = ref({
  matricula: null,
  nomePessoa: "",
  cpf: "",
  dataNascimento: null,
  celular: "",
  telefone: "",
  rg: "",
  naturalDe: "",
  grauDeInstrucao: "",
  estadoCivil: "",
  nomeInstituidor: "",
  companheiroNome: "",
  companheiroDatanascimento: null,
  irrfCompanheiroSim: "",
  companheiroCpf: "",
  email: "",
  endereco: "",
  bairro: "",
  cidade: "",
  cep: "",
  dataAdmissao: null,
  cargo: "",
  secretaria: "",
  expedidaEm: null,
  orgaoEmissor: "",
  categoriaApoPen: "",
  tipobeneficio: "",
  qtdDependentes: null,
  aceitaWhatsApp: "",
});

const enviarFormulario = async () => {
  try {
    const response = await api.post("/reqaposentadoria", form.value);
    console.log("Sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    alert("Erro ao enviar o formulário. Verifique o console.");
  }
};
</script>
<template>
  <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <!-- <div class="flex items-center justify-between mb-6"> -->
    <form @submit.prevent="enviarFormulario">
      <div class="border-b border-slate-100 pb-5">
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
          Requerimento aposentadoria
        </h2>
        <p class="text-slate-500">
          Preencha as informações abaixo para gerar os documentos
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >CPF:</label
          >
          <input
            type="text"
            v-model="form.cpf"
            placeholder="000.000.000-00"
            v-mask="'###.###.###-##'"
            required
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Matrícula:</label
          >
          <input
            type="number"
            v-model.number="form.matricula"
            placeholder="Ex: 12345"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Nome Pessoa:</label
          >
          <input
            type="text"
            v-model="form.nomePessoa"
            placeholder="Nome"
            required
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Data Nascimento:</label
          >
          <input
            type="date"
            v-model="form.dataNascimento"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Celular:</label
          >
          <input
            type="text"
            v-model.number="form.celular"
            placeholder="(00) 00000-0000"
            v-mask="'(##) #####-####'"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Telefone:</label
          >
          <input
            type="text"
            v-model="form.telefone"
            v-mask="'(##) ####-####'"
            placeholder="(00) 0000-0000"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5">RG:</label>
          <input
            type="text"
            v-model="form.rg"
            placeholder="00.000.000-0"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Natural De:</label
          >
          <input
            type="text"
            v-model="form.naturalDe"
            placeholder="Ourinhos"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Grau de Instrução:</label
          >
          <input
            type="text"
            v-model="form.grauDeInstrucao"
            placeholder="Ensino Médio Completo"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Estado Civil:</label
          >
          <input
            type="text"
            v-model="form.estadoCivil"
            placeholder="Solteiro"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="md:col-span-2 mt-6 mb-2">
          <h3 class="text-lg font-bold text-slate-800 tracking-tight">
            Informações do Companheiro
          </h3>
          <p class="text-slate-500 text-sm">
            Dados do cônjuge ou companheiro(a).
          </p>
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Nome Companheiro:</label
          >
          <input
            type="text"
            v-model="form.companheiroNome"
            placeholder="Nome companheiro"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Data Nascimento Companheiro:</label
          >
          <input
            type="date"
            v-model="form.companheiroDatanascimento"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >CPF Companheiro:</label
          >
          <input
            type="text"
            v-model="form.companheiroCpf"
            v-mask="'###.###.###-##'"
            placeholder="000.000.000.00"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="md:col-span-2 mt-6 mb-2">
          <h3 class="text-lg font-bold text-slate-800 tracking-tight">
            Endereço e Profissional
          </h3>
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Email:</label
          >
          <input
            type="email"
            v-model="form.email"
            placeholder="email@exemplo.com"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Endereço:</label
          >
          <input
            type="text"
            v-model="form.endereco"
            placeholder="Altino Arantes, 362"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Bairro:</label
          >
          <input
            type="text"
            v-model="form.bairro"
            placeholder="Centro"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Cidade:</label
          >
          <input
            type="text"
            v-model="form.cidade"
            placeholder="Ourinhos"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >CEP:</label
          >
          <input
            type="text"
            v-model="form.cep"
            placeholder="19900-000"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Data Admissão:</label
          >
          <input
            type="date"
            v-model="form.dataAdmissao"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Cargo:</label
          >
          <input
            type="text"
            v-model="form.cargo"
            placeholder="Assistente administrativo"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Secretaria:</label
          >
          <input
            type="text"
            v-model="form.secretaria"
            placeholder="Meio ambientes"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Qtd Dependentes:</label
          >
          <input
            type="number"
            v-model.number="form.qtdDependentes"
            placeholder="0"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-sm font-semibold text-slate-700 mb-1.5"
            >Aceita WhatsApp:</label
          >
          <select
            v-model="form.aceitaWhatsApp"
            class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
          >
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          class="px-8 py-3 bg-green-800 hover:bg-green-950 text-white font-semibold rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95"
        >
          Enviar Cadastro
        </button>
      </div>
    </form>
  </div>
  <!-- </div> -->
</template>
