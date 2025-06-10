import "@/assets/main.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import "vuetify/styles";

const app = createApp(App)

app.use(createPinia());
app.mount("#app");
