<template>
  <div class="text-center">
    <v-row class="pl-5 grey lighten-5">
      <v-col lg="5" sm="12">
        <v-text-field
          class="mt-3"
          color="primary"
          append-icon="mdi-magnify"
          solo
          clearable
          placeholder="¿Qué te apetece comer hoy?"
        />
      </v-col>
      <v-col lg="2" sm="12">
        <v-autocomplete
          loading="false"
          :items="provincias"
          cache-items
          class="mx-4 mt-3"
          flat
          hide-no-data
          hide-details
          label="¿En dónde?"
          solo-inverted=""
        />
      </v-col>
    </v-row>
    <section>
      <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 42.65"><defs><style>.cls-1{fill:#FAFAFA;}</style></defs><title>Sin título-3</title><path class="cls-1" d="M-.5,22.5a1114.63,1114.63,0,0,0,274,19c96.48-5.27,134.92-20.06,233-26,100.42-6.08,110,6.41,292,18,242,15.42,399.38,4.45,444,1,66.6-5.14,121.1-12,157-17V.5H-.5Z" transform="translate(0.5 -0.5)" /></svg>
    </section>
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
export default {
  layout: 'principal',
  middleware: 'auth',
  data () {
    return {
      provincias: ['Madrid', 'Guadalajara']
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
