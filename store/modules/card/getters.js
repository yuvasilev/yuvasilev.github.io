export default {
  priceTotal(state) {
    let count = 0
    if (state.list.length !== 0) {
      state.list.forEach(item => {
        count += item.price * item.count
      })
    }
    return count
  }
}
