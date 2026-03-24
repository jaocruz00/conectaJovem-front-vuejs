<!-- <script setup>
onMounted(async () => {
  try {
    const response = await api.get("/dados");
    nome.value = response.data.nome;
    instituicao.value = response.data.instituicao;
    prefEmbQues.value = response.data.prefEmbQuestoes;
    prefEmbAlt.value = response.data.prefEmbAlternativas;
    prefDuasColunas.value = response.data.prefDuasColunas;
  } catch (error) {
    console.error("Erro na requisição:", error);
    router.push("/dashboard");
  }
});
</script> -->
<template>
  <!-- Header -->
  <div
    class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
  >
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Meu Perfil</h1>
      <p class="text-slate-500 text-sm">
        Gerencie suas informações pessoais e preferências.
      </p>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Card lateral - Avatar + info rápida -->
    <div class="lg:col-span-1">
      <div
        class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div class="bg-gradient-to-br from-indigo-500 to-indigo-700 h-24"></div>
        <div class="px-6 pb-6">
          <!-- Avatar -->
          <div class="flex justify-center -mt-10 mb-4">
            <div class="relative">
              <div
                class="w-20 h-20 rounded-full bg-indigo-100 border-4 border-white shadow-md flex items-center justify-center"
              >
                <span class="text-2xl font-bold text-indigo-600">JS</span>
              </div>
              <button
                class="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white hover:bg-indigo-700 transition-colors"
                title="Alterar foto"
              >
                <i
                  class="fa-solid fa-camera text-white"
                  style="font-size: 9px"
                ></i>
              </button>
            </div>
          </div>

          <div class="text-center mb-5">
            <h2 class="font-bold text-slate-800 text-lg">João Silva</h2>
            <p class="text-slate-500 text-sm">joao.silva@email.com</p>
            <span
              class="inline-block mt-2 px-3 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full"
            >
              Professor
            </span>
          </div>

          <div class="border-t border-slate-100 pt-4 space-y-3">
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <i class="fa-solid fa-school text-indigo-400 w-4 text-center"></i>
              <span>Escola Estadual Central</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <i
                class="fa-solid fa-location-dot text-indigo-400 w-4 text-center"
              ></i>
              <span>São Paulo, SP</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <i
                class="fa-solid fa-calendar text-indigo-400 w-4 text-center"
              ></i>
              <span>Membro desde Jan 2024</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card de estatísticas -->
      <div
        class="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mt-5"
      >
        <h3
          class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4"
        >
          Resumo
        </h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-600">Questões criadas</span>
            <span class="font-bold text-indigo-600">148</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-1.5">
            <div
              class="bg-indigo-500 h-1.5 rounded-full"
              style="width: 74%"
            ></div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-600">Catergorias</span>
            <span class="font-bold text-indigo-600">148</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-1.5">
            <div
              class="bg-indigo-500 h-1.5 rounded-full"
              style="width: 50%"
            ></div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-600">Provas geradas</span>
            <span class="font-bold text-emerald-600">32</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-1.5">
            <div
              class="bg-emerald-500 h-1.5 rounded-full"
              style="width: 40%"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulário de edição -->
    <div class="lg:col-span-2 space-y-5">
      <!-- Dados pessoais -->
      <div
        class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-slate-100"
        >
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-user text-indigo-500 text-sm"></i>
            <h3 class="font-semibold text-slate-700">Dados Pessoais</h3>
          </div>
          <button
            class="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors flex items-center gap-1"
          >
            <i class="fa-solid fa-pen text-xs"></i> Editar
          </button>
        </div>

        <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Nome
            </label>
            <input
              type="text"
              value="João"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Sobrenome
            </label>
            <input
              type="text"
              value="Silva"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              E-mail
            </label>
            <input
              type="email"
              value="joao.silva@email.com"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Telefone
            </label>
            <input
              type="tel"
              value="(11) 99999-0000"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              CPF
            </label>
            <input
              type="text"
              value="000.000.000-00"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Data de Nascimento
            </label>
            <input
              type="date"
              value="1990-05-20"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Dados profissionais -->
      <div
        class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-slate-100"
        >
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-briefcase text-indigo-500 text-sm"></i>
            <h3 class="font-semibold text-slate-700">Dados Profissionais</h3>
          </div>
        </div>

        <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Instituição
            </label>
            <input
              type="text"
              value="Escola Estadual Central"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Cargo / Função
            </label>
            <select
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            >
              <option>Professor</option>
              <option>Coordenador</option>
              <option>Diretor</option>
              <option>Outro</option>
            </select>
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Disciplina
            </label>
            <input
              type="text"
              value="Matemática"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Cidade / Estado
            </label>
            <input
              type="text"
              value="São Paulo, SP"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Segurança -->
      <div
        class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-slate-100"
        >
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-lock text-indigo-500 text-sm"></i>
            <h3 class="font-semibold text-slate-700">Segurança</h3>
          </div>
        </div>

        <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Senha atual
            </label>
            <input
              type="password"
              placeholder="••••••••"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div class="sm:col-span-1">
            <!-- espaço vazio intencional -->
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Nova senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"
            >
              Confirmar nova senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Botões de ação -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4"
      >
        <button
          class="w-full sm:w-auto px-5 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
        >
          <i class="fa-solid fa-trash-can mr-2"></i> Excluir conta
        </button>

        <div class="flex gap-3 w-full sm:w-auto">
          <button
            class="flex-1 sm:flex-none px-5 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            class="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm font-medium text-sm"
          >
            <i class="fa-solid fa-floppy-disk mr-2 text-xs"></i> Salvar
            alterações
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
