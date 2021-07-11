import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module
} from 'vuex'

import { RootState } from '@/store/index'
import { state } from './state'
import { mutations, AppMutations } from './mutations'
import { actions, AppActions } from './actions'
import type { AppState } from './state'

export { AppState }

export type AppStore<S = AppState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
& {
  commit<K extends keyof AppMutations, P extends Parameters<AppMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<AppMutations[K]>
} & {
  dispatch<K extends keyof AppActions>(
    key: K,
    payload: Parameters<AppActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<AppActions[K]>
};
export const store: Module<AppState, RootState> = {
  state,
  mutations,
  actions,
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // namespaced: true,
}