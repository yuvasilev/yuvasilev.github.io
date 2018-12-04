import mutations from './mutations'
import * as actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations,
  actions,
  getters
}
