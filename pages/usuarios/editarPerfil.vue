<template>
  <v-container>
    <div class="d-flex justify-center mt-2 mb-10">
      <v-card class="pa-3" width="30em">
        <v-card-text>
          <div class="text-center">
            <v-avatar size="120">
              <img
                id="foto"
                :src="`http://localhost:4000/resources/users/${this.$auth.user.foto}?width=150&height=150`"
                alt="Foto"
              >
            </v-avatar>
            <v-file-input v-model="foto" placeholder="Nueva foto" @change="cambiofoto" />
          </div>
          <v-divider class="my-5" />
          <h2>Nombre</h2>
          <v-text-field v-model="nombre" solo class="my-3" />
          <h2>Email</h2>
          <v-text-field v-model="email" solo class="my-3" />
          <v-divider class="my-5" />
          <h2>Nueva contraseña </h2>
          <v-text-field v-model="password" type="password" solo class="my-3" />
          <v-divider class="my-5" />
          <h2>Ciudad</h2>
          <v-autocomplete
            key="1"
            v-model="ciudad"
            :value="ciudad"
            loading="false"
            :items="['Madrid', 'Guadalajara']"
            cache-items
            class="my-3"
            flat
            hide-no-data
            hide-details
            label="Ciudad"
            solo-inverted
          />
          <h2>Género</h2>
          <v-autocomplete
            key="2"
            v-model="genero"
            :value="genero"
            loading="false"
            :items="['Hombre', 'Mujer']"
            cache-items
            class="my-3"
            flat
            hide-no-data
            hide-details
            label="Género"
            solo-inverted
          />
          <v-divider class="my-5" />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn outlined color="primary" class="mb-5" @click="enviar">
            <v-icon left>
              mdi-pencil
            </v-icon> ACTUALIZAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-footer
      class="font-weight-medium primary"
      absolute
    >
      <div class="text-center white--text footer-center">
        {{ new Date().getFullYear() }} — <strong>Fid!</strong>
      </div>
    </v-footer>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // página para editar el perfil del usuario
  layout: 'principal',
  data () {
    return {
      foto: null,
      nombre: null,
      email: null,
      password: null,
      ciudad: null,
      genero: null
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted () {
    this.nombre = this.loggedInUser.nombre
    this.email = this.loggedInUser.email
    this.ciudad = this.loggedInUser.ciudad
    this.genero = this.loggedInUser.genero
  },
  methods: {
    cambiofoto () {
      if (process.browser && this.foto != null) {
        const imagen = document.getElementById('foto')
        imagen.src = URL.createObjectURL(this.foto)
      }
    },
    async enviar () {
      // enviamos los datos al servidor para actualizar los parámetros que hayan cambiado del perfil
      const formData = new FormData()
      formData.append('nombre', this.nombre)
      formData.append('genero', this.genero)
      formData.append('ciudad', this.ciudad)
      formData.append('email', this.email)
      if (this.password) {
        formData.append('password', this.password)
      }
      if (this.foto) {
        formData.append('file', this.foto, this.foto.name)
      }
      try {
        const resp = await this.$axios.post('usuarios/update/' + this.$auth.user._id, formData)

        if (resp.status === 200) {
          this.$swal({
            title: 'Perfil actualizado!',
            type: 'success'
          }).then(async (result) => {
            if (result.value) {
              await this.$auth.fetchUser()
              this.$router.push('/')
            }
          })
        }
      } catch (error) {
        // si por ejemplo el usuario introduce un correo no válido
        this.$swal({
          title: 'Error al actualizar el perfil',
          text: 'Revisa todos los campos y vuelve a intentarlo.',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style>
.footer-center{
    width: 100%;
}
</style>
