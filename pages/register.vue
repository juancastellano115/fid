<template>
  <v-content>
    <v-container class="fill-height fondo" fluid>
      <v-row align="center" justify="center">
        <v-col sm="8" md="6">
          <v-container class="elevation-12 white redon">
            <v-row>
              <v-col md="6">
                <img src="~/assets/undraw_reg.svg" class="reg">
              </v-col>
              <v-col md="6">
                <v-container>
                  <h1>Registro</h1>
                  <v-form>
                    <v-text-field label="Nombre" name="nombre" type="text" />
                    <v-text-field label="Email" name="login" type="text" />
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <v-text-field
                      id="password"
                      label="Repeat Password"
                      name="password"
                      type="password"
                    />
                    <v-checkbox label="Acepto los términos y condiciones" />
                    <v-container class="text-center">
                      <v-btn outlined large color="orange">
                        ENVIAR
                      </v-btn>
                      <p class="text--secondary pb-0 pt-4">
                        ¿Tienes cuenta? Inicia sesión <nuxt-link to="/">
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
