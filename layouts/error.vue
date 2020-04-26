<template>
  <v-app>
    <client-only>
      <ErrorPage />
    </client-only>
  </v-app>
</template>
<script>
import ErrorPage from '../components/errorPage'
export default {
  components: {
    ErrorPage
  }
}
</script>
