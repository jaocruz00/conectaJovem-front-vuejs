<template>
  <div class="bg-slate-50 flex items-center justify-center min-h-screen p-6">
    <div class="max-w-md w-full text-center">
      <div class="mb-8 relative">
        <div
          class="absolute inset-0 bg-blue-100 blur-3xl rounded-full opacity-50 scale-75"
        ></div>
        <img
          src="/logo.png"
          alt="IPMO"
          class="relative mx-auto w-24 h-auto drop-shadow-sm"
        />
      </div>

      <h1 class="text-6xl font-black text-slate-800 mb-4">404</h1>
      <h2 class="text-2xl font-bold text-slate-700 mb-3">
        Ops! Página não encontrada
      </h2>
      <p class="text-slate-500 mb-10 leading-relaxed">
        Parece que o caminho que você tentou acessar não existe ou foi movido.
        Não se preocupe, vamos te levar de volta para o seu painel.
      </p>

      <div class="space-y-4">
        <a
          href="/dashboard"
          class="inline-flex items-center justify-center w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all gap-3 group"
        >
          <i
            class="fas fa-home transition-transform group-hover:-translate-y-0.5"
          ></i>
          Voltar ao Início
        </a>

        <!-- <button
          onclick="history.back()"
          class="flex items-center justify-center w-full text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
        >
          <i class="fas fa-arrow-left mr-2 text-xs"></i>
          Retornar à página anterior
        </button> -->
      </div>

      <div class="mt-16 pt-8 border-t border-slate-200">
        <p class="text-xs text-slate-400">
          Se isso parece ser um erro do sistema, por favor
          <a href="#" class="text-blue-500 hover:underline font-medium"
            >contate o suporte</a
          >.
        </p>
      </div>
    </div>
  </div>
</template>
