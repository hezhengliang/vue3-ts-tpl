import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '@/store/index'
import { AppState } from './state'
import { AppMutations } from './mutations'
enum AppActionType {
  ACTION_SET_SIZE = 'setSizeAction'
}
type AugmentedActionContext = {
  commit<K extends keyof AppMutations>(
    key: K,
    payload: Parameters<AppMutations[K]>[1],
  ): ReturnType<AppMutations[K]>
} & Omit<ActionContext<AppState, RootState>, 'commit'>

export interface AppActions {
  [AppActionType.ACTION_SET_SIZE]({state, commit}: AugmentedActionContext, paras: number): void 
}

export const actions: ActionTree<AppState, RootState> & AppActions = {
  [AppActionType.ACTION_SET_SIZE]({state, commit}, paras){

  }
}