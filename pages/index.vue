<template>
  <v-content>
    <v-container class="fill-height fondo" fluid>
      <v-row align="center" justify="center">
        <v-col sm="8" md="6">
          <v-container class="elevation-12 white redon">
            <v-row>
              <v-col md="6">
                <img src="~/assets/undraw_log.svg" class="log">
              </v-col>
              <v-col md="6">
                <v-container>
                  <h1>Login</h1>
                  <v-form @submit.prevent="login">
                    <v-text-field v-model="email" label="Email" name="login" type="text" />
                    <v-text-field
                      v-model="password"
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <v-container class="text-center">
                      <v-btn type="sumbit" outlined large color="primary">
                        LOG IN
                      </v-btn>
                      <p class="text--secondary pb-0 pt-4">
                        O regístrate <nuxt-link to="/register">
                          aquí
                        </nuxt-link>
                      </p>
                    </v-container>
                  </v-form>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['guardarUsuario']),

    login () {
      this.$axios.post('/auth', { email: this.email, password: this.password })
        .then((res) => {
          const token = res.data.token
          this.guardarUsuario(token)
          this.$router.push({ name: 'dashboard' })
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response.data.msg)
        })
    }
  }
}
</script>
<style scoped>
.fondo{
background: linear-gradient(45deg, rgba(46,191,145,1) 0%, rgba(131,96,195,1) 100%);
}
.log{
    width: 100%;
    height: 100%;
}
.redon{
    border-bottom-right-radius: 80px;
}
</style>
