<template>
  <div :class="{'d-flex' : true===true, 'justify-end': mensaje.sender === this.$auth.user._id,'justify-start' : mensaje.sender !== this.$auth.user._id ,'mb-4' : true===true}">
    <div :class="{'msg_send': mensaje.sender === this.$auth.user._id, 'msg': mensaje.sender !== this.$auth.user._id }">
      {{ mensaje.message }}
      <span :class="{'msg_time_send': mensaje.sender === this.$auth.user._id,'msg_time': mensaje.sender !== this.$auth.user._id }">{{ new Date(mensaje.createdAt).toLocaleTimeString() }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mensaje: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
.msg_send {
color: rgb(32, 32, 32);
margin-top: auto;
margin-bottom: auto;
margin-right: 10px;
border-radius: 25px;
background-color: #C2FAEC;
padding: 10px;
position: relative;
}
.msg_time{
position: absolute;
left: 0;
bottom: -15px;
color: rgba(0, 0, 0, 0.5);
font-size: 10px;
}
.msg_time_send{
position: absolute;
right:0;
bottom: -15px;
color: rgba(0, 0, 0, 0.5);
font-size: 10px;
}
.msg{
color: rgb(32, 32, 32);
margin-top: auto;
margin-bottom: auto;
margin-left: 10px;
border-radius: 25px;
background-color: #D0E3FE;
padding: 10px;
position: relative;
}
</style>
