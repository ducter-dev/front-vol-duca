import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './index.css'
import router from './router'
import 'flowbite'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')