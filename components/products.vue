<template>
  <div v-if="cargando">
    <ProductLoader />
  </div>
  <div v-else>
    <v-card flat>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card._id"
            class="d-flex child-flex"
            cols="12"
            md="4"
          >
            <v-card outlined :to="'/articulos/'+card._id">
              <v-img
                v-if="card.fotos[0]"
                :src="`http://localhost:4000/resources/products/${card.fotos[0]}?width=300&height=300`"
                aspect-ratio="1"
                class="white--text align-end"
              />
              <v-card-title>{{ card.nombre }}<strong> &nbsp;{{ card.precio }}€ </strong></v-card-title>
              <v-card-text class="text--primary">
                <p class="text-left">
                  {{ card.desc }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="cards.length === 0" class="text-center">
        <p>
          Vaya vaya... parece que no hay artículos aún
        </p>
        <img src="~/assets/articulo_not_found.svg" height="200">
      </v-container>
    </v-card>
  </div>
</template>

<script>
import ProductLoader from './productLoader'
export default {
  components: {
    ProductLoader
  },
  props: {
    cards: {
      type: Array,
      default () {
        return []
      }
    },
    cargando: Boolean
  }
}
</script>

<style></style>
