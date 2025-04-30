import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import router from './router' 
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'

const pinia = createPinia()
createApp(App)
    .use(router)
    .use(pinia)
    .use(MotionPlugin)
    .mount('#app')