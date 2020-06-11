<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12" md="6" class="ma-auto">
          <v-card class="grey lighten-4 pa-3 ma-sm-0 ma-md-10" elevation="20">
            <v-container fluid>
              <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
                <v-carousel-item
                  v-for="(foto, i) in objetodatos.articulo.fotos"
                  :key="i"
                  :src="
                    `http://localhost:4000/resources/products/${foto}?width=1000&height=800`
                  "
                />
              </v-carousel>
              <v-row class="text-center justify-center">
                <v-col class="d-flex align-center">
                  <p class="display-3">
                    {{ objetodatos.articulo.nombre }}
                  </p>
                </v-col>
                <v-col class="d-flex align-center justify-center">
                  <p class="display-3">
                    {{ objetodatos.articulo.precio }}€
                  </p>
                </v-col>
              </v-row>
              <v-card flat>
                <v-card-text>
                  {{ objetodatos.articulo.desc }}
                </v-card-text>
              </v-card>
              <div
                v-if="objetodatos.propietario._id !== this.$auth.user._id"
                class="d-flex justify-center mt-10"
              >
                <v-btn
                  dark
                  rounded
                  x-large
                  color="teal accent-3"
                  @click="redirectToChat"
                >
                  <v-icon>
                    mdi-chat
                  </v-icon>
                </v-btn>
              </div>
              <v-row justify="center" class="ma-sm-5 ma-md-8">
                <v-col cols="12" md="4">
                  <div
                    v-if="objetodatos.articulo.alergenos.length > 0"
                    class="d-flex justify-space-around rounded grey lighten-3 alergenos"
                  >
                    <v-icon
                      v-for="alergeno in objetodatos.articulo.alergenos"
                      :key="alergeno"
                    >
                      {{ alergeno }}
                    </v-icon>
                  </div>
                  <div v-else class="text-center text--secondary">
                    ¡Sin alérgenos!
                  </div>
                </v-col>
              </v-row>
              <v-row justify="center" class="text-center">
                <v-col
                  cols="12"
                  md="6"
                  class="grey lighten-2 usuario"
                  @click="redirect"
                >
                  <v-row>
                    <v-col cols="4">
                      <h2>{{ objetodatos.propietario.nombre }}</h2>
                    </v-col>
                    <v-col
                      cols="4"
                      class="d-flex align-content-center justify-center"
                    >
                      <h2>
                        {{ objetodatos.propietario.likes
                        }}<v-icon size="30">
                          mdi-star
                        </v-icon>
                      </h2>
                    </v-col>
                    <v-col cols="4">
                      <v-avatar>
                        <img
                          :src="
                            `http://localhost:4000/resources/users/${objetodatos.propietario.foto}?width=50&height=50`
                          "
                          alt="Foto"
                        >
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <div
                v-if="objetodatos.propietario._id === this.$auth.user._id"
                class="text-center pa-3"
              >
                <v-btn color="red" dark @click="borrar">
                  BORRAR
                </v-btn>
                <v-btn color="teal" dark @click="editar">
                  EDITAR
                </v-btn>
              </div>
            </v-container>
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
export default {
  // esta página es la que se muestra al dar click en un artículo
  layout: 'principal',
  middleware: 'auth',
  async asyncData ({ $axios, params }) {
    const objetodatos = await $axios.$get('/articulos/' + params.articulo)
    return { objetodatos }
  },
  methods: {
    editar () {
      this.$router.push({ name: 'crear', params: this.objetodatos.articulo })
    },
    borrar () {
      this.$swal({
        title: '¿Estás seguro?',
        text: '¡No podrás recuperarlo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
      }).then(async (result) => {
        if (result.value) {
          const resp = await this.$axios.delete(
            '/articulos/' + this.$route.params.articulo
          )
          if (resp.status === 200) {
            this.$swal(
              '¡Borrado!',
              'Tu Artículo ha sido eliminado.',
              'success'
            )
            this.$router.push('/')
          }
        }
      })
    },
    redirect () {
      this.$router.push('/usuarios/' + this.objetodatos.propietario._id)
    },
    redirectToChat () {
      this.$router.push({
        name: 'chat',
        params: {
          user: {
            foto: this.objetodatos.propietario.foto,
            id: this.objetodatos.propietario._id,
            nombre: this.objetodatos.propietario.nombre
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.footer-center {
  width: 100%;
}
.alergenos {
  height: 3em;
  border-radius: 30px;
}
.usuario {
  border-radius: 30px;
  cursor: pointer;
}
</style>
