<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12" md="6" offset-sm="3">
          <v-card class="grey lighten-4 pa-3 ma-5 mb-12" elevation="20">
            <v-container fluid class="text-center">
              <v-avatar size="120">
                <img
                  :src="`http://localhost:4000/resources/users/${objetodatos.perfil.foto}?width=150&height=150`"
                  alt="Foto"
                >
              </v-avatar>
              <h1>{{ objetodatos.perfil.nombre }}</h1>
              <h1>{{ objetodatos.perfil.ciudad }}</h1>
              <h2>{{ objetodatos.perfil.likes }} <v-icon>mdi-star</v-icon> </h2>
              <v-btn v-if="objetodatos.perfil._id != this.$auth.user._id && !starred" color="primary" @click="like">
                STAR
              </v-btn>
              <v-btn v-if="objetodatos.perfil._id === this.$auth.user._id" to="editarPerfil" color="primary" class="mt-4">
                EDITAR PERFIL
              </v-btn>
            </v-container>
            <p class="display-1">
              Artículos
            </p>
            <Products :cards="objetodatos.articulos" :cargando="false" />
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-footer
      class="font-weight-medium primary"
      absolute
    >
      <div class="text-center white--text footer-center">
        {{ new Date().getFullYear() }} — <strong>Fid!</strong>
      </div>
    </v-footer>
  </div>
</template>

<script>
import Products from '../../components/products'
export default {
  layout: 'principal',
  middleware: 'auth',
  components: {
    Products
  },
  async asyncData ({ $axios, params }) {
    const objetodatos = await $axios.$get('/articulos?id=' + params.perfil)
    return { objetodatos }
  },
  data () {
    return {
      starred: false
    }
  },
  created () {
    if (this.$auth.user.likesOtorgados.includes(this.objetodatos.perfil._id)) {
      // eslint-disable-next-line no-console
      this.starred = true
    }
  },
  methods: {
    like () {
      this.objetodatos.perfil.likes += 1
      this.starred = true
      this.$axios.get('/usuarios/like/' + this.objetodatos.perfil._id)
    }
  }
}
</script>

<style>
.footer-center{
    width: 100%;
}
</style>
