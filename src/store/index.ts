import {createStore, createLogger} from 'vuex';
import { AppState } from './modules/app/state'
import { store as app, AppStore } from './modules/app/index'

export type RootState = {
  app: AppState
}

export type Store = AppStore<Pick<RootState, 'app'>>

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
// Plug in session storage based persistence
// plugins.push(createPersistedState({ storage: window.sessionStorage }))

export const store = createStore({
  plugins,
  modules: {
    app,
  }
})

// export function useStore(): Store {
//   return store as Store
// }
