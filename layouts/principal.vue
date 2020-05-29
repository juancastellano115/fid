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

        <v-toolbar-title class="d-none d-md-inline">
          <strong>Fid!</strong>
        </v-toolbar-title>

        <v-spacer />
        <v-btn v-if="this.$auth.user.rol === 'ADMIN'" to="/admin" color="red">
          ADMIN
        </v-btn>

        <v-btn icon to="/chat">
          <v-icon>mdi-chat</v-icon>
        </v-btn>

        <v-btn icon :to="'/usuarios/'+ this.$auth.user._id">
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

<style>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(25,147,147,0.1);
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #7a7a7a;
}
</style>
