<template>
  <v-data-table
    :headers="headers"
    :items="datos"
    :sort-by="['calories', 'fat']"
    :sort-desc="[false, true]"
    multi-sort
    class="elevation-1"
  />
</template>
<script>
export default {
  props: {
    datos: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          value: 'nombre'
        },
        { text: 'Email', value: 'email' },
        { text: 'Género', value: 'genero' },
        { text: 'Likes', value: 'likes' },
        { text: 'Rol', value: 'rol' },
        { text: 'Registro', value: 'registro' }
      ]
    }
  }
}
</script>
