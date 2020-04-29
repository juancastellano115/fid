<template>
  <v-app>
    <nuxt />
  </v-app>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  created () {
    if (process.client) {
      this.leerToken()
    }
  },
  methods: {
    ...mapActions(['leerToken'])
  }
}
</script>
