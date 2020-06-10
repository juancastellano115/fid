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
  // página de 404
  components: {
    ErrorPage
  }
}
</script>
