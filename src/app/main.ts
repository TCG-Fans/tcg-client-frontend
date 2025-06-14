import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { APP_ROUTER } from "./router/router.ts";
import {ToastService} from "primevue";

const app  = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).use(APP_ROUTER).use(ToastService)

app.mount('#app')
