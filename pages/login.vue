<template>
  <v-content>
    <v-container class="fill-height fondo" fluid>
      <v-row align="center" justify="center">
        <v-col sm="8" md="6">
          <v-container class="elevation-12 white redon">
            <v-row>
              <v-col md="6" class="d-none d-md-flex">
                <img src="~/assets/undraw_log.svg" class="log">
              </v-col>
              <v-col md="6">
                <v-container>
                  <h1>Login</h1>
                  <v-form v-model="valid" @submit.prevent="login">
                    <v-text-field v-model="email" label="Email" name="login" type="text" :rules="emailRules" />
                    <v-text-field
                      v-model="password"
                      label="Password"
                      name="password"
                      type="password"
                      :rules="passwordRules"
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
export default {
  middleware: 'guest',
  data () {
    return {
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'El E-mail es obligatorio',
        v => /.+@.+/.test(v) || 'El E-mail debe ser válido'
      ],
      passwordRules: [
        v => !!v || 'La contraseña es obligatoria'
      ],
      valid: true
    }
  },
  methods: {

    async login () {
      if (this.valid) {
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })

          this.$router.push('/')
        } catch (e) {
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            type: 'error',
            title: 'Contraseña o usuario incorrectos'
          })
        }
      }
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
