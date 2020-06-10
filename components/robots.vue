<template>
  <div class="recog">
    <robotAnimation />
    <h1>Nuestros robots están determinando...</h1>
    <v-progress-circular v-if="cargando" indeterminate size="64" />
    <h2 v-else>
      Que eres <span class="text-lowercase">{{ genero }}</span>
    </h2>
    <v-btn color="primary" class="mt-5 d-block ma-auto" @click="success">
      ¡Siguiente!
    </v-btn>
  </div>
</template>

<script>
import robotAnimation from './robotAnimation'
export default {
  // este componente se encarga de hacer la petición a la inteligencia artificial del servidor
  name: 'Robots',
  components: {
    robotAnimation
  },
  props: {
    data: {
      type: Object,
      default: null,
      required: true
    }
  },
  data () {
    return {
      cargando: true,
      genero: ''
    }
  },
  async created  () {
    try {
      this.cargando = true
      const resp = await this.$axios.post('/fotoRecog', this.data.data)
      this.genero = resp.data.genero
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      this.cargando = false
    }
  },
  methods: {
    success () {
      this.$swal({
        title: '¡Genial!',
        text: 'Ya estás dentro, ahora te llevaré a la pantalla principal',
        type: 'success'
      }).then((result) => {
        if (result.value) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
