<template>
  <div>
    <h1>Página principal autenticada</h1>
    <p>{{ usuarioDB }}</p>
    <nuxt-link to="foto">
      foto
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'auth',
  computed: mapState([
    'usuarioDB'
  ])
}
</script>

<style>

</style>
