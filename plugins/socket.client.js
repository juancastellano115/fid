import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

export default function () {
  Vue.use(VueSocketIOExt, socket)
}
