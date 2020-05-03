import decode from 'jwt-decode'

export const state = () => ({
  UserID: '',
  token: ''
})

export const mutations = {
  obtenerUsuario (state, payload) {
    state.token = payload
    if (payload === '') {
      state.UserID = ''
    } else {
      state.UserID = decode(payload)
    }
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
