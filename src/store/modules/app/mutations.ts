import { MutationTree } from 'vuex'
import { AppState } from './state'
export enum AppMutationsType {
  SET_SIZE = 'SET_SIZE',
  ADD_COUNT = 'ADD_COUNT'
}
export type AppMutations<S = AppState> = {
  [AppMutationsType.SET_SIZE](state:S, payload: number):void,
  [AppMutationsType.ADD_COUNT](state: S, payload: number): void
}

export const mutations: MutationTree<AppState> & AppMutations = {
  [AppMutationsType.SET_SIZE](state, payload) {

  },
  [AppMutationsType.ADD_COUNT](state, payload) {
    state.count += payload
  }
}