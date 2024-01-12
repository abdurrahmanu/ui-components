import { createApp, onMounted } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import './assets/tailwind.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia).mount('#app')
