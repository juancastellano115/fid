<template>
  <v-content>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="3">
          <v-card
            max-width="450"
            class="mx-auto"
          >
            <v-toolbar
              color="blue"
              dark
            >
              <v-toolbar-title>Mensajes</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-list v-if="items.length > 0" three-line>
              <template v-for="(item, index) in items">
                <v-list-item
                  :key="item.createdAt"
                  @click="setConversation(index)"
                >
                  <v-list-item-avatar>
                    <v-img :src="`http://localhost:4000/resources/users/${item.foto}?width=50&height=50`" alt="foto" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.nombre }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.lastMessage }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon v-if="item.seen==false && item.lastMessageSender==false" color="red">
                      mdi-circle
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </template>
            </v-list>
            <p v-else class="text--primary text-center pa-3">
              ¡Aún no tienes conversaciones!
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <Conversacion v-if="conversaciones" :senderinfo="conversaciones" :mensajes="mensajes" @mensajenuevo="OnMensajeNuevo" />
          <div v-else>
            <v-row justify="center">
              <v-col cols="3" md="4" class="d-flex justify-center">
                <img width="300" src="chat.svg" alt="chats">
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import Conversacion from '../components/conversacion'
export default {
  // página de los chats
  layout: 'principal',
  middleware: 'auth',
  components: {
    Conversacion
  },
  sockets: {
    // handler de mensaje recibido
    messageReceived (data) {
      if (data.isFirstMessage) {
        const sender = data.sender
        this.items.unshift({ id: sender._id, foto: sender.foto, nombre: sender.nombre, seen: false })
      }
      // mapeo de los usuarios para asignar el mensaje recibido
      this.items.map((u) => {
        if (u.id === data.sender._id) {
          u.lastMessage = data.message
          u.lastMessageSender = false
          if (this.conversaciones != null) {
            u.seen = this.conversaciones.id === data.sender._id
          } else { u.seen = false }
        }
      })
    }
  },
  // prefetch
  async asyncData ({ $axios }) {
    const items = await $axios.$get('/chat/conversaciones/')
    return { items }
  },
  data () {
    return {
      conversaciones: null,
      mensajes: []
    }
  },
  mounted () {
    // emitimos al servidor que nos hemos conectado al chat
    this.$socket.client.emit('user_chat_connected', this.$auth.user._id)
    // si venimos de la pantalla de artículo comprobamos que no se repite el chat
    if (this.$route.params.user && !this.$auth.user.chats.includes(this.$route.params.user.id)) {
      let repeat = false
      for (const iterator of this.items) {
        if (iterator.id === this.$route.params.user.id) { repeat = true }
      }
      if (!repeat) {
        this.items.unshift(this.$route.params.user)
      }
      this.conversaciones = this.$route.params.user
    }
  },
  methods: {
    // para mostrar una conversación al hacer click
    async setConversation (index) {
      this.conversaciones = this.items[index]
      const obj = {
        sender: this.conversaciones.id,
        receiver: this.$auth.user._id
      }
      // mandamos que la conversación ha sido vista
      if (!this.conversaciones.seen && this.conversaciones.lastMessageSender === false) {
        this.items[index].seen = true
        this.$axios.post('/chat/seen', obj)
      }
      const msjs = await this.$axios.$post('http://localhost:4000/api/chat/specificConversation', obj)
      this.mensajes = msjs.message
    },
    // handler al escribir un mensaje desde el componente conversación
    OnMensajeNuevo (data) {
      this.items.map((u) => {
        if (u.id === data.id) {
          u.lastMessage = data.mensaje
          u.lastMessageSender = true
        }
      })
    }
  }
}
</script>
<style scoped>
.expand{
    width: 100%;
    height: 100%;
}
.redon{
    border-bottom-right-radius: 80px;
}
</style>
