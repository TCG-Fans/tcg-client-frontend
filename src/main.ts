import { createApp } from 'vue'
import './app/styles/style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { APP_ROUTER } from "./app/router/router.ts";

const app  = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).use(APP_ROUTER)

app.mount('#app')
