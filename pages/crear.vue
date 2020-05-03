<template>
  <v-container>
    <v-card
      class="mx-auto mt-8"
      max-width="680"
      shaped
    >
      <v-card-text>
        <p class="display-1 text--secondary">
          Información de tu artículo
        </p>
        <p>¿Qúe estás vendiendo?</p>
        <v-text-field v-model="nombre" outlined placeholder="En pocas palabras..." />
        <p>Precio</p>
        <v-text-field v-model="precio" outlined type="number" placeholder="(No te pases)" class="precio" />
        <p>Descripcción</p>
        <v-textarea
          v-model="desc"
          solo
          name="input-7-4"
          label="Describe los condimentos, el amor con el que has hecho este producto..."
        />
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto mt-8"
      max-width="680"
      shaped
    >
      <v-card-text>
        <p class="display-1 text--secondary">
          Fotos
        </p>
        <v-file-input
          v-model="files"
          multiple="true"
          label="¡Sube unas fotos para que todos lo vean!"
          filled
          prepend-icon="mdi-camera"
          accept="image/png, image/jpeg"
        />
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto mt-8 mb-5"
      max-width="680"
    >
      <v-card-text>
        <h3 class="text-secondary">
          Alérgenos
        </h3>
        <v-container>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-checkbox v-model="alergenos" label="Frutos secos" prepend-icon="mdi-peanut" value="frutos-secos" />
            </v-col>
            <v-col class="d-flex justify-center">
              <v-checkbox v-model="alergenos" label="Lácteos" prepend-icon="mdi-glass-pint-outline" value="lacteos" />
            </v-col>
            <v-col class="d-flex justify-center">
              <v-checkbox v-model="alergenos" label="Marisco" prepend-icon="mdi-fish" value="pescado" />
            </v-col>
          </v-row>
        </v-container>
        <h3 class="text-secondary">
          Tus productos se verán en:
        </h3>
        <v-autocomplete
          v-model="ciudad"
          loading="false"
          :items="provincias"
          cache-items
          class="mx-4 mt-3"
          flat
          hide-no-data
          hide-details
          label="Selecciona una provincia"
          solo-inverted
        />
      </v-card-text>
      <v-card-actions>
        <v-btn block outlined color="primary accent-4" @click="enviar">
          SUBIR ARTÍCULO
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'principal',
  data () {
    return {
      provincias: ['Guadalajara', 'Madrid'],
      files: null,
      nombre: '',
      desc: '',
      ciudad: '',
      precio: 0,
      alergenos: []
    }
  },
  methods: {
    async enviar () {
      const formData = new FormData()
      // files
      for (const file of this.files) {
        formData.append('fotos', file, file.name)
      }
      formData.append('nombre', this.nombre)
      formData.append('desc', this.desc)
      formData.append('precio', this.precio)
      formData.append('ciudad', this.ciudad)
      formData.append('alergenos', this.alergenos)
      const resp = await this.$axios.post('/articulos', formData)
      if (resp.status === 200) {
        this.$swal({
          title: '¡Enhorabuena!',
          text: 'Tu artículo ha sido publicado',
          type: 'success'
        }).then((result) => {
          if (result.value) {
            this.$router.push('/')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.precio{
      max-width: 9rem;
}
</style>
