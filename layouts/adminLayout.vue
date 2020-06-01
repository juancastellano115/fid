<template>
  <v-app dark>
    <v-content>
      <v-app-bar
        color="gray"
        dark
      >
        <v-btn icon to="/" nuxt>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title>Panel de administrador</v-toolbar-title>
        <v-spacer />
        <v-btn text class="primary--text" @click="logout">
          CERRAR SESIÓN
        </v-btn>
      </v-app-bar>
      <nuxt />
      <v-content />
    </v-content>
  </v-app>
</template>

<script>
export default {
  theme: { dark: true },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
