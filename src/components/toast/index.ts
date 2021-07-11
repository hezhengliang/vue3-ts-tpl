import type { App } from 'vue';
import Toast from './Toast.vue'
import mountComponent from './mount'
//定义弹出组件的函数
function showToast(text:string, duration = 1200) {
  const options = {
    text,
    duration
  }
  const {el} = mountComponent(Toast, {
    props: { ...options}
  })
  el.classList.add('mtoast-box')
}

// 注册为全局组件的函数
export default {
  install(app: App) {
    app.config.globalProperties.$mtoast = showToast
  }
}
