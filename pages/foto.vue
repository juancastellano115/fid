<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row class="text-center justify-center">
        <v-col cols="5">
          <div v-if="!mostrar" key="1">
            <h1>¡Muy bien {{ loggedInUser.nombre }}!</h1>
            <img src="~/assets/cara.svg" class="cara">
            <h2>Ahora vamos a añadir una foto a tu perfil</h2>
            <div class="file">
              <form enctype="multipart/form-data" @submit.prevent="onSubmit">
                <div class="fields">
                  <template>
                    <v-file-input
                      v-model="file"
                      accept="image/png, image/jpeg"
                      placeholder="Escoge una foto de perfil"
                      prepend-icon="mdi-camera"
                      label="Avatar"
                    />
                  </template>
                </div>
                <div>
                  <v-btn color="primary" class="mt-5" type="sumbit">
                    Enviar
                  </v-btn>
                </div>
              </form>
            </div>
          </div>
          <div v-else key="2">
            <robots :data="formData" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import Robots from '../components/robots'
export default {
  components: {
    Robots
  },
  data () {
    return {
      mostrar: false,
      file: null,
      formData: {
        data: null
      }
    }
  },
  middleware: 'auth',

  computed: {
    ...mapGetters([
      'loggedInUser'
    ])
  },
  methods: {

    onSubmit () {
      this.formData.data = new FormData()
      this.formData.data.append('file', this.file)
      this.mostrar = true
    }
  }
}
</script>

<style scoped>
.cara{
  width: 30%;
}
</style>
