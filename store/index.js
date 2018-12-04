import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import card from './modules/card'

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null
    },
    modules: {
      card
    },
    mutations: {
      ...mutations
    },
    actions: {
      ...actions,
      async nuxtServerInit({ commit, dispatch }, { app, req }) {
        Promise.all([await dispatch('card/RESTORE_CARD')])
      }
    }
  })
}

export default createStore
