let state = {
  keyword: ''
}
let mutations = {
  SAVEKEYWORD (state, word) {
    state.keyword = word
  }
}

export default {
  state,
  mutations
}
