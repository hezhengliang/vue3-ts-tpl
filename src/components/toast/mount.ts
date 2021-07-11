import { render, h } from 'vue'
import type { Component, VNode} from 'vue';

const createElement = () => typeof document !== 'undefined' && document.createElement('div')

const mountComponent = (component:Component, { props, children, element, app }: any) => {
  let el = element ? element : createElement()
  let vNode: VNode|null = h(component, props, children)
  if (app && app._context) {
    vNode.appContext = app._context
  }
  render(vNode, el)
  const destroy = () => {
    if (el) {
      render(null, el)
    }
    el = null
    vNode = null
  }
  document.body.appendChild(el)
  return { vNode, destroy, el }
}

export default mountComponent