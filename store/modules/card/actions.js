import * as mTypes from './mutationsType'

export async function ADD({ dispatch, commit }, data) {
  commit(mTypes.ADD_TO_CARD, data)
  dispatch('SAVE_CARD')
}

export async function REMOVE({ dispatch, commit }, data) {
  commit(mTypes.REMOVE_FROM_CARD, data)
  dispatch('SAVE_CARD')
}

export async function REDUCE_COUNT({ dispatch, commit }, data) {
  commit(mTypes.REDUCE_COUNT, data)
  dispatch('SAVE_CARD')
}

export async function SetCardItems({ commit }, value) {
  commit(mTypes.SET_CARD_ITEMS, value)
}

export async function CLEAR_CARD_ITEMS({ commit, dispatch }) {
  commit(mTypes.SET_CARD_ITEMS, [])
  dispatch('SAVE_CARD')
}

export async function RESTORE_CARD({ commit, dispatch }) {
  let items = []

  if (this.$storage.getUniversal('card')) {
    items = this.$storage.getUniversal('card')

    if (!!items) {
      dispatch('SetCardItems', items)
    }
  }
}

export async function SAVE_CARD({ commit, dispatch, state }) {
  this.$storage.setUniversal('card', state.list)
}
