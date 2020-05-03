<template>
  <v-app id="principal">
    <v-content>
      <v-app-bar
        dense
        flat
        color="primary"
        dark
        hide-on-scroll
      >
        <v-btn icon to="/" nuxt>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-toolbar-title>Fid!</v-toolbar-title>

        <v-spacer />

        <v-btn icon>
          <v-icon>mdi-chat</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-face</v-icon>
        </v-btn>

        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-btn @click="logout">
            Cerrar sesión
          </v-btn>
        </v-menu>
      </v-app-bar>
      <v-container fluid pa-0>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
