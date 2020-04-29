import decode from 'jwt-decode'

export const state = () => ({
  token: '',
  usuarioDB: ''
})

export const mutations = {
  obtenerUsuario (state, payload) {
    state.token = payload
    if (payload === '') {
      state.usuarioDB = ''
    } else {
      state.usuarioDB = decode(payload)
      // this.$router.push({ name: 'dashboard' })
    }
  }
}
export const actions = {

  guardarUsuario ({ commit }, payload) {
    localStorage.setItem('token', payload)
    commit('obtenerUsuario', payload)
  },
  cerrarSesion ({ commit }) {
    commit('obtenerUsuario', '')
    localStorage.removeItem('token')
    // router.push({ name: 'login' })
  },
  leerToken ({ commit }) {
    const token = localStorage.getItem('token')
    if (token) {
      commit('obtenerUsuario', token)
    } else {
      commit('obtenerUsuario', '')
    }
  }
}
