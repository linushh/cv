<template>
  <drawer />

  <gallery :images="images" />
</template>

<script>
import drawer from '../components/drawer.vue'
import gallery from '../components/gallery.vue'

import images from '@/service/photoService/todoGallery.js'

export default {

  data() {
    return {
      images
    }
  },

  components: {
    drawer,
    gallery
  }
}
</script>

<style>
</style>