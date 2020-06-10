<template>
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
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.seen"
          :key="item.seen"
          v-text="item.seen"
        />

        <v-divider
          v-else-if="!index % 2 === 0 "
          :key="index"
          :inset="1"
        />

        <v-list-item
          v-else
          :key="item.createdAt"
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
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  // componente para crear una lista de usuarios y su último mensaje en la pantalla de chats
  data () {
    return {
      items: null
    }
  },
  async mounted () {
    const datos = await this.$axios.get('/chat/conversaciones')
    this.items = datos.data
  }
}
</script>

<style>

</style>
