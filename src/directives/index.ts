import {App, VNode} from 'vue'
const directives = (app: App) => {
  app.directive('mdirective', {
    // 绑定元素的父组件挂载前调用
    // //@ts-ignore
    // beoforeMount(el:HTMLElement, binding:any, vnode:VNode):void {
    //   console.log('m-directive beforeMount: ', el, binding, vnode)
    // },
    // 绑定元素的父组件挂载时调用
    mounted(el:HTMLElement, binding:any, vnode:VNode):void {
      console.log('m-directive beforeMount: ', el, binding, vnode)
    },
  })
  
  app.directive('mfocus', {
    mounted(el:HTMLElement){
      el.focus();
    }
  })
  // app.directive('mfocus', (el, bind) => {
//   console.log(el, bind)
// })
}
export default directives