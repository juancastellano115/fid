<template>
  <v-content>
    <v-container class="fill-height fondo" fluid>
      <v-row align="center" justify="center">
        <v-col sm="8" md="6">
          <v-container class="elevation-12 white redon">
            <v-row>
              <v-col md="6" class="d-none d-md-flex">
                <img src="~/assets/undraw_reg.svg" class="reg">
              </v-col>
              <v-col cols="12" md="6">
                <v-container>
                  <h1>Registro</h1>
                  <v-form
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="register"
                  >
                    <v-text-field v-model="nombre" label="Nombre" name="nombre" type="text" :rules="nameRules" />
                    <v-text-field v-model="email" label="Email" name="login" type="text" :rules="emailRules" />
                    <v-text-field
                      id="password"
                      v-model="password"
                      label="Password"
                      name="password"
                      type="password"
                      :rules="passwordRules"
                    />
                    <v-text-field
                      id="passwordCheck"
                      :rules="passwordCheckRules"
                      label="Repeat Password"
                      name="password"
                      type="password"
                    />
                    <v-checkbox label="Acepto los términos y condiciones" :rules="checkRules" />
                    <v-container class="text-center">
                      <v-btn type="sumbit" outlined large color="orange">
                        ENVIAR
                      </v-btn>
                      <p class="text--secondary pb-0 pt-4">
                        ¿Tienes cuenta? Inicia sesión <nuxt-link to="/login">
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
      nombre: '',
      email: '',
      password: '',
      nameRules: [
        v => !!v || 'El nombre es obliagtorio'
      ],
      emailRules: [
        v => !!v || 'El E-mail es obligatorio',
        v => /.+@.+/.test(v) || 'El E-mail debe ser válido'
      ],
      passwordRules: [
        v => !!v || 'La contraseña es obligatoria',
        v => v.length >= 6 || 'La contraseña debe tener más de 6 letras'
      ],
      passwordCheckRules: [
        v => !!v || 'La comprobación es obligatoria',
        v => v === this.password || 'La contraseña debe coincidir'
      ],
      checkRules: [v => !!v || 'Debes aceptar para registrarte'],
      valid: false
    }
  },
  methods: {
    async register () {
      try {
        if (this.valid) {
          await this.$axios.post('/usuarios', { nombre: this.nombre, email: this.email, password: this.password })

          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })

          this.$router.push('/foto')
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.response.data.msg)
      }
    }
  }
}
</script>
<style scoped>
.fondo{
background: linear-gradient(45deg, #ee0979 0%, #ff6a00 100%);
}
.reg{
    width: 100%;
    height: 100%;
}
.redon{
    border-bottom-right-radius: 80px;
}
</style>
