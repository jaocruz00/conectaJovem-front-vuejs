<script setup>
import { ref } from "vue";
import { mask } from "vue-the-mask";
import api from "../../services/api";

const vMask = mask;

const form = ref({
  cpf: "",
  nomePessoa: "",
  categoria: "",
  dataNascimento: null,
  celular: "",
  endereco: "",
  bairro: "",
  cidade: "",
  cep: "",
  email: "",
  estadoCivil: "",
  nomecompanheiro: "",
  dataNascimentoCompanheiro: null,
  cpfCompanheiro: "",
  dependenteQtd: null,
  aceitaWhatsApp: "",
});

const enviarFormulario = async () => {
  try {
    // Ajustar a rota da API conforme necessário para Prova de Vida
    const response = await api.post("/provadevida", form.value);
    console.log("Sucesso:", response.data);
    alert("Prova de vida enviada com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    alert("Erro ao enviar a prova de vida. Verifique o console.");
  }
};
</script>

<template>
  <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div class="flex items-center justify-between mb-6">
      <form @submit.prevent="enviarFormulario">
        <div class="border-b border-slate-100 pb-5">
          <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
            Prova de Vida
          </h2>
          <p class="text-slate-500">
            Preencha as informações abaixo para realizar a prova de vida.
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
              >Categoria:</label
            >
            <select
              v-model="form.categoria"
              class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm appearance-none"
            >
              <option value="" disabled selected>
                Selecione uma categoria
              </option>
              <option value="Aposentado">Aposentado</option>
              <option value="Pensionista">Pensionista</option>
            </select>
          </div>

          <div class="flex flex-col md:col-span-2">
            <label class="text-sm font-semibold text-slate-700 mb-1.5"
              >Nome Completo:</label
            >
            <input
              type="text"
              v-model="form.nomePessoa"
              placeholder="Nome completo"
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

          <div class="md:col-span-2 mt-4 mb-1">
            <h3 class="text-lg font-bold text-slate-800 tracking-tight">
              Endereço e Contato
            </h3>
          </div>

          <div class="flex flex-col md:col-span-2">
            <label class="text-sm font-semibold text-slate-700 mb-1.5"
              >Endereço:</label
            >
            <input
              type="text"
              v-model="form.endereco"
              placeholder="Rua, Número, Complemento"
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
              placeholder="00000-000"
              v-mask="'#####-###'"
              class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
            />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-semibold text-slate-700 mb-1.5"
              >Celular:</label
            >
            <input
              type="text"
              v-model="form.celular"
              placeholder="(00) 00000-0000"
              v-mask="'(##) #####-####'"
              class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
            />
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

          <div class="md:col-span-2 mt-4 mb-1">
            <h3 class="text-lg font-bold text-slate-800 tracking-tight">
              Dados do Companheiro(a)
            </h3>
          </div>

          <div class="flex flex-col md:col-span-2">
            <label class="text-sm font-semibold text-slate-700 mb-1.5"
              >Nome Companheiro:</label
            >
            <input
              type="text"
              v-model="form.nomecompanheiro"
              placeholder="Nome completo"
              class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
            />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-semibold text-slate-700 mb-1.5"
              >CPF Companheiro:</label
            >
            <input
              type="text"
              v-model="form.cpfCompanheiro"
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
              class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
            />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-semibold text-slate-700 mb-1.5"
              >Nasc. Companheiro:</label
            >
            <input
              type="date"
              v-model="form.dataNascimentoCompanheiro"
              class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm"
            />
          </div>

          <div class="md:col-span-2 mt-4 mb-1">
            <h3 class="text-lg font-bold text-slate-800 tracking-tight">
              Outras Informações
            </h3>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-semibold text-slate-700 mb-1.5"
              >Estado Civil:</label
            >
            <select
              v-model="form.estadoCivil"
              class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-400 outline-none transition-all text-sm appearance-none"
            >
              <option value="" disabled selected>Selecione</option>
              <option value="Solteiro(a)">Solteiro(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Viúvo(a)">Viúvo(a)</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-semibold text-slate-700 mb-1.5"
              >Qtd Dependentes:</label
            >
            <input
              type="number"
              v-model.number="form.dependenteQtd"
              placeholder="0"
              min="0"
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
            Gerar prova de vida
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
