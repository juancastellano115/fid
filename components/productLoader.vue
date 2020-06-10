<template>
  <div>
    <v-card>
      <v-container fluid class="grey lighten-5">
        <v-row>
          <v-col
            v-for="n in 6"
            :key="n"
            class="d-flex child-flex"
            cols="12"
            md="4"
          >
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
// skeleton loader para los artículos
}
</script>

<style>

</style>
