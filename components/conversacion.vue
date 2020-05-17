<template>
  <v-container>
    <h1>{{ senderinfo.nombre }}</h1>
    <h4 v-for="(text,index) in mensajes" :key="index">
      <span v-if="text.sender === getId">Tú: </span> {{ text.message }}
    </h4>
    <v-text-field v-model="mensaje" outlined class="messagebox" @change="send" />
  </v-container>
</template>

<script>
export default {
  sockets: {
    messageReceived (data) {
      this.mensajes.push(data)
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
  async mounted () {

  },
  methods: {
    send () {
      if (this.mensaje) {
        const objetoMensaje = { sender: this.$auth.user._id, receiver: this.senderinfo.id, message: this.mensaje }
        this.mensajes.push(objetoMensaje)
        this.$socket.client.emit('send_message', objetoMensaje)
        this.$emit('mensajenuevo', { mensaje: this.mensaje, id: this.senderinfo.id })
        this.mensaje = ''
      }
    }
  }
}
</script>

<style>

</style>
