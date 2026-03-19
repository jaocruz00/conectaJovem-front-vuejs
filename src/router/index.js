import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

const routes = [
  {
    path: "",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: { public: true },
  },

  {
    path: "/sistema",
    name: "sistema",
    component: () => import("../views/sistema.vue"),
    meta: { public: true },
  },

  {
    path: "/sistema",
    component: () => import("../views/sistema.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/dashboard/dashboard.vue"),
      },

      {
        path: "/perfil",
        name: "perfil",
        component: () => import("../views/login/perfil.vue"),
      },
      {
        path: "/reqaposentadoria",
        name: "reqaposentadoria",
        component: () => import("../views/aposentado/reqaposentadoria.vue"),
      },

      {
        path: "/listaaposentados",
        name: "lsitaaposentados",
        component: () => import("../views/aposentado/listaaposentados.vue"),
      },
      {
        path: "/provavida",
        name: "provavida",
        component: () => import("../views/aposentado/provavida.vue"),
      },

      {
        path: "/requerimentogenerico",
        name: "requerimentogenerico",
        component: () => import("../views/requerimentos/generico.vue"),
      },
      {
        path: "/abono",
        name: "abono",
        component: () => import("../views/rh/abono.vue"),
      },
      {
        path: "/margemconsignado",
        name: "margemconsignado",
        component: () => import("../views/rh/margemconsignado.vue"),
      },
      {
        path: "/simulador",
        name: "simulador",
        component: () => import("../views/aposentado/simulador.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "paginaerro",
        component: () => import("../views/login/paginaerro.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const isPublic = to.matched.some((record) => record.meta.public);

  // Se a rota não for pública e não houver token válido
  if (!isPublic && (!userData?.token || !isTokenValid(userData.token))) {
    localStorage.removeItem("user_data");
    return next({ name: "login" });
  }

  // Se o usuário já está logado e tenta ir para o Login
  if (to.name === "login" && userData?.token && isTokenValid(userData.token)) {
    return next({ name: "dashboard" });
  }

  next();
});

export default router;
