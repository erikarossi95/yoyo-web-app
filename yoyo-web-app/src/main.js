import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Vue3Youtube from 'vue3-youtube'

const app = createApp(App)

app.use(router)
app.component('Youtube', Vue3Youtube)
app.mount('#app')
