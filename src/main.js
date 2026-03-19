import { createApp } from "vue";
import "./style.css"; // Certifique-se que o Tailwind está aqui dentro
import "./assets/main.css";

import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);

app.use(router);
app.mount("#app");
