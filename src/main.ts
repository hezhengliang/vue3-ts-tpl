import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import "amfe-flexible/index.js";
import directives from '@/directives';
//@ts-ignore
import Toast from '@/components/toast/index.ts'

const app = createApp(App)

directives(app)

app.use(Toast)
app.use(store).use(router).mount('#app')
