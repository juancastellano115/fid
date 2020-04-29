<template>
  <div>
    <h1>pantalla de la foto</h1>
    <div class="file">
      <form enctype="multipart/form-data" @submit.prevent="onSubmit">
        <div class="fields">
          <label>Upload</label>
          <input type="file" @change="filesChange($event.target.name, $event.target.files)">
        </div>
        <div class="fields">
          <button type="submit">
            Enviar
          </button>
        </div>
        <div class="message">
          <p>{{ message }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      file: ''
    }
  },
  middleware: 'auth',
  methods: {
    filesChange (fieldName, fileList) {
      // eslint-disable-next-line no-console
      console.log(fileList)
      if (!fileList.length) { return }
      this.files[0] = fileList[0]
    },
    async onSubmit () {
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await this.$axios.post('/upload', formData)
        this.message = 'uploaded'
      } catch (error) {
        this.message = 'error'
      }
    }
  }
}

</script>

<style>

</style>
