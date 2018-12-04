import * as mTypes from './mutationsType'

export default {
  [mTypes.ADD_TO_CARD](state, item) {
    let added = false

    item.count = item.count ? item.count : 1
    state.list = state.list.map(listItem => {
      if (listItem.id === item.id) {
        listItem.count++
        added = true
      }

      return listItem
    })

    !added ? state.list.push(item) : ''
  },
  [mTypes.REDUCE_COUNT](state, itemId) {
    state.list = state.list.map(listItem => {
      if (listItem.id === itemId) {
        listItem.count !== 1 ? listItem.count-- : ''
      }
      return listItem
    })
  },
  [mTypes.REMOVE_FROM_CARD](state, itemId) {
    state.list = state.list.filter(item => item.id !== itemId)
  },
  [mTypes.SET_CARD_ITEMS](state, items) {
    state.list = items
  }
}
