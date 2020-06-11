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
          <v-card class="mx-auto" max-width="344">
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
          <v-card class="mx-auto" max-width="344">
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
                    <v-icon>mdi-star</v-icon>
                    {{ estadisticas.usuarioConMasEstrellas.likes }}
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
          <v-card class="mx-auto" max-width="344">
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
          <v-text-field
            v-model="usuario"
            outlined
            placeholder="Selecciona un usuario"
            @change="seleccionarUser"
          />
        </v-col>
        <v-col>
          <v-btn dark x-large color="red" @click="borrarUser">
            BORRAR
          </v-btn>
        </v-col>
      </v-row>
      <h3>Borrar Articulo según el usuario anterior</h3>
      <v-row>
        <v-col cols="12" md="4">
          <v-list v-if="articulosdeusuario.length !== 0">
            <v-list-item v-for="(item, index) in articulosdeusuario" :key="item._id">
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
          <v-text-field
            v-model="usuarioParaAdmin"
            outlined
            placeholder="Selecciona un usuario"
          />
        </v-col>
        <v-col>
          <v-btn dark x-large color="primary" @click="hacerAdmin">
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
  // página del administrador
  middleware: 'admin',
  layout: 'adminLayout',
  components: {
    GraficoBarras,
    GraficoArea,
    GraficoLinea,
    Tabla
  },
  // prefetch
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
  // para generar los gráficos
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
      this.labelsArticulos.push(r.date)
    })
  },
  methods: {
    // obtener artículos de un usuario
    async seleccionarUser () {
      try {
        this.articulosdeusuario = await this.$axios.$post(
          '/articulos/admin/articulosByEmail',
          { email: this.usuario }
        )
      } catch (error) {
        this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          type: 'error',
          title: 'Usuario no encontrado.'
        })
      }
    },
    async borrarArticulo (index) {
      const resp = await this.$axios.delete(
        '/articulos/' + this.articulosdeusuario[index]._id
      )
      if (resp.status === 200) {
        this.$swal({
          title: 'Artículo borrado',
          type: 'success'
        })
        this.articulosdeusuario.splice(index, 1)
      } else {
        this.$swal({
          title: 'Hubo un error',
          type: 'error'
        })
      }
    },
    // método para generar el pdf con JSpdf
    generarPDF () {
      if (process.browser) {
        const JsPDF = require('jspdf')
        require('jspdf-autotable')

        const doc = new JsPDF()
        const bodyTabla = []
        this.estadisticas.mejoresUsuarios.forEach((user) => {
          bodyTabla.push(Object.values(user))
        })
        const img = new Image()
        img.src = '/fid.jpg'
        doc.addImage(img, 'jpg', 14, 0, 30, 30)
        doc.text('Estadísticas Fid!', 14, 30)

        doc.text('Artículos totales: ' + this.estadisticas.numArticulos, 14, 50)
        doc.line(14, 60, 60, 60)
        doc.text('Usuarios totales: ' + this.estadisticas.numUsuarios, 14, 70)
        doc.line(14, 80, 60, 80)
        doc.text('Usuario con más estrellas: ' + this.estadisticas.usuarioConMasEstrellas.nombre + ' con ' + this.estadisticas.usuarioConMasEstrellas.likes + ' estrellas', 14, 90)
        doc.line(14, 100, 60, 100)
        doc.text('Estadísticas de género: ', 14, 110)
        let counter = 110
        for (const iterator of this.estadisticas.generos) {
          counter += 10
          doc.text(iterator._id == null ? 'Sin especificar : ' + iterator.count : iterator._id + ' : ' + iterator.count, 14, counter)
        }
        doc.line(14, 150, 60, 150)
        doc.text('Mejores usuarios: ', 14, 160)
        // creamos la tabla
        doc.autoTable({
          head: [['Likes', 'Rol', 'Nombre', 'Email', 'Género', 'Registro']],
          body: bodyTabla,
          startY: 170
        })
        doc.text('Fid! 2020 ©', 14, 270)
        doc.save('estadisticas.pdf')
      }
    },
    async borrarUser () {
      try {
        const resp = await this.$axios.post('/usuarios/admin/borrar', {
          email: this.usuario
        })
        if (resp.status === 200) {
          this.articulosdeusuario = []
          this.$swal({
            title: 'Usuario borrado',
            type: 'success'
          })
        }
      } catch (error) {
        this.$swal({
          title: 'Error al borrar ese usuario',
          text: error.response.data.msg,
          type: 'error'
        })
      }
    },
    async hacerAdmin () {
      try {
        await this.$axios.$post('usuarios/admin/make', {
          email: this.usuarioParaAdmin
        })
        this.$swal({
          title: 'Ahora este usuario es administrador',
          type: 'success'
        })
      } catch (error) {
        this.$swal({
          title: 'Error al hacer admin ese usuario',
          text: error.response.data.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style></style>
