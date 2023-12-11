import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import "primeflex/primeflex.css";

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Card', Card)

app.mount('#app')
