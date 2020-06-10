<template>
  <v-container class="text-center align-center">
    <div class="lottie" />
    <h1 class="ml3">
      ¡Vaya! Parece que te has perdido
    </h1>
    <v-btn x-large color="primary" class="mt-10">
      <NuxtLink to="/">
        VOLVER
      </NuxtLink>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'empty',
  head () {
    const title = '404'
    return {
      title,
      script: [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js',
          callback: () => {
            if (process.client) {
              const textWrapper = document.querySelector('.ml3')
              textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

              // eslint-disable-next-line no-undef
              anime.timeline()
                .add({
                  targets: '.ml3 .letter',
                  opacity: [0, 1],
                  easing: 'easeInOutQuad',
                  duration: 600,
                  delay: (el, i) => 100 * (i + 1)
                })
            }
          }
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.6.8/lottie.js',
          callback: () => {
            if (process.client) {
              // eslint-disable-next-line no-undef
              const lottieObj = lottie.loadAnimation({
                container: document.querySelector('.lottie'), // the dom element that will contain the animation
                renderer: 'svg',
                loop: true,
                speed: 0.1,
                autoplay: true,
                path: 'https://assets5.lottiefiles.com/packages/lf20_GrGBqA.json' // the path to the animation json
              })
              lottieObj.setSpeed('0.3')
            }
          }
        }
      ]
    }
  }
}
</script>
<style scoped>
.ml3 {
  font-weight: 900;
  font-size: 3.5em;
}
a{
  color: white;
  text-decoration: none;
}
</style>
