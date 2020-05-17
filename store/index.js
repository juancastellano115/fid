
export const state = () => ({
  ciudad: ''
})

export const mutations = {
  guardarciudad (state, payload) {
    state.ciudad = payload
  }
}
export const actions = {

}
export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },

  loggedInUser (state) {
    return state.auth.user
  }
}
