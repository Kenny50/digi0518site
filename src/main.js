// FILE: main.js

import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import router from './router/initRouter'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

app.use(Quasar, {
    plugins: {},
})
app.use(VueApexCharts);

app.use(router)
app.mount('#app')
