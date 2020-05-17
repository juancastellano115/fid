<template>
  <v-container>
    <h1>Bienvenido</h1>
    <v-row>
      <client-only>
        <v-col cols="12" md="4">
          <GraficoBarras :labels="labelsRegistros" :data="countRegistros" />
        </v-col>
        <v-col cols="12" md="4">
          <GraficoArea :labels="labelsMensajes" :data="countMensajes" />
        </v-col>
        <v-col cols="12" md="4">
          <GraficoLinea :labels="labelsArticulos" :data="countArticulos" />
        </v-col>
      </client-only>
      <v-row>
        <v-col cols="12" md="4">
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                Número de artículos totales
              </p>
              <h1 class="deep-purple--text">
                {{ estadisticas.numArticulos }} artículos
              </h1>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                Usuario con más estrellas
              </p>
              <v-row>
                <v-col class="text-center">
                  <h1 class="deep-orange--text">
                    {{ estadisticas.usuarioConMasEstrellas.nombre }}
                  </h1>
                </v-col>
                <v-col>
                  <h1 class="text-center text--primary">
                    <v-icon>mdi-star</v-icon> {{ estadisticas.usuarioConMasEstrellas.likes }}
                  </h1>
                </v-col>
                <v-col class="text-center">
                  <v-avatar>
                    <img
                      :src="`http://localhost:4000/resources/users/${estadisticas.usuarioConMasEstrellas.foto}?width=50&height=50`"
                    >
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                Número de usuarios totales
              </p>
              <h1 class="deep-purple--text">
                {{ estadisticas.numUsuarios }} Usuarios
              </h1>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
    <h3 class="display-1">
      Mejores Usuarios:
    </h3>
    <Tabla :datos="estadisticas.mejoresUsuarios" />
    <v-card class="my-5 pa-3">
      <h1 class="display-1">
        Moderación
      </h1>
      <h3>Borrar Usuario por Email</h3>
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field v-model="usuario" outlined placeholder="Selecciona un usuario" @change="seleccionarUser" />
        </v-col>
        <v-col>
          <v-btn dark x-large color="red">
            BORRAR
          </v-btn>
        </v-col>
      </v-row>
      <h3>Borrar Articulo según el usuario anterior</h3>
      <v-row>
        <v-col cols="12" md="4">
          <v-list v-if="articulosdeusuario.length !== 0">
            <v-list-item
              v-for="(item, index) in articulosdeusuario"
              :key="item._id"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.nombre" />
                <v-list-item-subtitle v-text="item.desc" />
              </v-list-item-content>

              <v-list-item-action>
                <nuxt-link :to="'/articulos/' + item._id" target="_blank">
                  <v-btn icon>
                    <v-icon color="grey lighten-1">
                      mdi-information
                    </v-icon>
                  </v-btn>
                </nuxt-link>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon @click="borrarArticulo(index)">
                  <v-icon color="red lighten-1">
                    mdi-alpha-x-circle
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <p v-else>
            Debes seleccionar un usuario con artículos primero
          </p>
        </v-col>
      </v-row>
      <h3>Hacer usuario admin</h3>
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field v-model="usuarioParaAdmin" outlined placeholder="Selecciona un usuario" @change="seleccionarUser" />
        </v-col>
        <v-col>
          <v-btn dark x-large color="primary">
            ADMIN
          </v-btn>
        </v-col>
      </v-row>
      <h1>Generar PDF</h1>
      <v-btn color="indigo accent-3" dark @click="generarPDF">
        GENERAR
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import GraficoBarras from '../components/graficoBarras'
import GraficoArea from '../components/graficoArea'
import GraficoLinea from '../components/graficoLinea'
import Tabla from '../components/tabla'
export default {
  layout: 'adminLayout',
  components: {
    GraficoBarras,
    GraficoArea,
    GraficoLinea,
    Tabla
  },
  async asyncData ({ $axios }) {
    const estadisticas = await $axios.$get('/estadisticas/')
    return { estadisticas }
  },
  data () {
    return {
      countRegistros: [],
      labelsRegistros: [],
      countMensajes: [],
      labelsMensajes: [],
      countArticulos: [],
      labelsArticulos: [],
      usuario: '',
      articulosdeusuario: [],
      usuarioParaAdmin: ''
    }
  },
  created () {
    this.estadisticas.registros.forEach((r) => {
      this.countRegistros.push(r.count)
      this.labelsRegistros.push(r.date)
    })
    this.estadisticas.ActividadMensajes.forEach((r) => {
      this.countMensajes.push(r.count)
      this.labelsMensajes.push(r.date)
    })
    this.estadisticas.articulosHoy.forEach((r) => {
      this.countArticulos.push(r.count)
      let fecha = new Date(r.date)
      fecha = fecha.toLocaleTimeString()
      this.labelsArticulos.push(fecha)
    })
  },
  methods: {
    async seleccionarUser () {
      this.articulosdeusuario = await this.$axios.$post('/articulos/admin/articulosByEmail', { email: this.usuario })
    },
    async borrarArticulo (index) {
      const resp = await this.$axios.delete('/articulos/' + this.articulosdeusuario[index]._id)
      if (resp.status === 200) {
        this.$swal({
          title: 'Artículo borrado',
          type: 'success'
        })
        this.articulosdeusuario = this.articulosdeusuario.slice(index, index - 1)
      } else {
        this.$swal({
          title: 'Hubo un error',
          type: 'error'
        })
      }
    },
    generarPDF () {
      if (process.browser) {
        const JsPDF = require('jspdf')
        require('jspdf-autotable')

        const doc = new JsPDF()
        const bodyTabla = []
        this.estadisticas.mejoresUsuarios.forEach((user) => {
          bodyTabla.push(Object.values(user))
        })
        doc.autoTable({
          head: [['Nombre', 'Email', 'Género', 'Likes', 'Rol', 'Registro']],
          body: bodyTabla
        })
        doc.text('Estadísticas Fid!', 10, 10)
        doc.save('estadisticas.pdf')
      }
    }
  }
}
</script>

<style></style>
