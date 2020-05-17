<template>
  <div class="text-center">
    <v-row class="pl-5 grey lighten-5">
      <v-col cols="12" lg="5">
        <v-text-field
          v-model="busqueda"
          class="mt-3"
          color="primary"
          append-icon="mdi-magnify"
          solo
          clearable
          placeholder="¿Qué te apetece comer hoy?"
          @change="changeBusqueda"
        />
      </v-col>
      <v-col cols="12" lg="2">
        <v-autocomplete
          v-model="ciudad"
          loading="false"
          :items="provincias"
          cache-items
          class="mx-4 mt-3"
          flat
          hide-no-data
          hide-details
          label="¿En dónde?"
          solo-inverted
          @change="changeCiudad"
        />
      </v-col>
    </v-row>
    <section class="d-none d-md-block">
      <svg
        id="Capa_1"
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1400 42.65"
      >
        <defs>
          <style>
            .cls-1 {
            fill: #fafafa;
            }
          </style>
        </defs>
        <title>Sin título-3</title>
        <path
          class="cls-1"
          d="M-.5,22.5a1114.63,1114.63,0,0,0,274,19c96.48-5.27,134.92-20.06,233-26,100.42-6.08,110,6.41,292,18,242,15.42,399.38,4.45,444,1,66.6-5.14,121.1-12,157-17V.5H-.5Z"
          transform="translate(0.5 -0.5)"
        />
      </svg>
    </section>
    <v-row>
      <v-col sm="12" md="6" offset-sm="3">
        <Products :cards="cards" :cargando="cargando" />
        <client-only>
          <infinite-loading
            v-if="cards!== null"
            spinner="spiral"
            @infinite="infiniteScroll"
          >
            <div slot="no-more" />
            <div slot="no-results" />
          </infinite-loading>
        </client-only>
      </v-col>
    </v-row>
    <section />
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <v-btn
            bottom
            fixed
            dark
            rounded
            x-large
            color="teal accent-3"
            to="/crear"
            nuxt
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Products from '../components/products'
export default {
  layout: 'principal',
  middleware: 'auth',
  components: {
    Products
  },
  data () {
    return {
      provincias: ['Madrid', 'Guadalajara', 'Todas'],
      ciudad: '',
      busqueda: '',
      cargando: true,
      cards: null,
      contadorScroll: 0,
      url: 'articulos/search'
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  created () {
    this.cargando = true
    if (this.loggedInUser.ciudad) {
      this.ciudad = this.loggedInUser.ciudad
      this.url += '?city=' + this.ciudad
    } else {
      this.url += '?city='
    }
    setTimeout(async () => {
      this.cards = await this.$axios.$get(this.url)
      this.cargando = false
    }, 1000)
  },
  methods: {
    updateURLParameter (url, param, paramVal) {
      let newAdditionalURL = ''
      let tempArray = url.split('?')
      const baseURL = tempArray[0]
      const additionalURL = tempArray[1]
      let temp = ''
      if (additionalURL) {
        tempArray = additionalURL.split('&')
        for (let i = 0; i < tempArray.length; i++) {
          if (tempArray[i].split('=')[0] !== param) {
            newAdditionalURL += temp + tempArray[i]
            temp = '&'
          }
        }
      }
      const rowsTxt = temp + '' + param + '=' + paramVal
      this.url = baseURL + '?' + newAdditionalURL + rowsTxt
    },
    async changeCiudad () {
      this.updateURLParameter(this.url, 'city', this.ciudad === 'Todas' ? '' : this.ciudad)
      this.cards = await this.$axios.$get(this.url)
    },
    async changeBusqueda () {
      this.updateURLParameter(this.url, 'search', this.busqueda == null ? '' : this.busqueda)
      this.cards = await this.$axios.$get(this.url)
    },
    infiniteScroll ($state) {
      setTimeout(() => {
        this.contadorScroll++
        this.$axios.get(`${this.url}&skip=${this.contadorScroll * 10}`)
          .then((response) => {
            if (response.data.length > 0) {
              response.data.forEach(item => this.cards.push(item))
              $state.loaded()
            } else {
              $state.complete()
            }
          // eslint-disable-next-line no-console
          }).catch((err) => { console.log(err) })
      }, 500)
    }
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}
/* unvisited link */
a:link {
  color: rgb(255, 255, 255);
}

/* visited link */
a:visited {
  color: rgb(255, 255, 255);
}

/* mouse over link */
a:hover {
  color: rgb(255, 255, 255);
}

/* selected link */
a:active {
  color: rgb(255, 255, 255);
}
</style>
