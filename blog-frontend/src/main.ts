import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

// 创建 pinia 实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 创建应用实例
const app = createApp(App)

// 注册插件
app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 挂载应用
app.mount('#app')
