<template>
  <v-container>
    <h1>{{ senderinfo.nombre }}</h1>
    <div id="messages" class="cajaConversacion">
      <h4 v-for="(text,index) in mensajes" :key="index">
        <Mensaje :mensaje="text" />
      </h4>
    </div>
    <v-text-field v-model="mensaje" outlined shaped class="messagebox" @change="send" />
  </v-container>
</template>

<script>
import Mensaje from '../components/mensaje'
export default {
  components: {
    Mensaje
  },
  sockets: {
    async  messageReceived (data) {
      if (data.sender._id === this.senderinfo.id) {
        await this.mensajes.push(data)
        this.scrollToBottom()
        this.$axios.post('/chat/seen', {
          sender: data.sender._id,
          receiver: this.$auth.user._id
        })
      }
    }
  },
  props: {
    mensajes: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    senderinfo: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      mensaje: ''
    }
  },
  computed: {
    getId () {
      return this.$auth.user._id
    }
  },
  watch: {
    mensajes () {
      this.scrollToBottom()
    }
  },
  methods: {
    async send () {
      if (this.mensaje) {
        const objetoMensaje = { sender: this.$auth.user._id, receiver: this.senderinfo.id, message: this.mensaje, createdAt: new Date() }
        await this.mensajes.push(objetoMensaje)
        this.$socket.client.emit('send_message', objetoMensaje)
        this.$emit('mensajenuevo', { mensaje: this.mensaje, id: this.senderinfo.id })
        this.mensaje = ''
        this.scrollToBottom()
      }
    },
    scrollToBottom () {
      const container = this.$el.querySelector('#messages')
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>

<style>
.cajaConversacion{
  overflow-x: hidden;
  overflow-x: auto;
  height: 400px;
}
</style>
