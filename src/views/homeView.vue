<template>
  <navigationBar class="navigation" />
  <div class="container">
    <img :src="selfie" class="img" />
  </div>
</template>

<script>
import selfie from '../assets/selfie.jpg'
import navigationBar from '../components/navigationBar.vue'

export default {
  data() {
    return {
      selfie: selfie
    }
  },

  components: {
    navigationBar
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  background-color: #3a4042;
}

.img {
  max-width: 12%;
  max-height: 12%;
}

.navigation {
  display: flex;
  justify-content: right;
}
</style>