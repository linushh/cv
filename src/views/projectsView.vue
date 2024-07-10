<template>
  <div class="background-color">
    <drawer />
    
    <gallery :title="'Todo Application: Java, Vue, MySql'" :images="images" />
  </div>
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
.background-color {
  background-color: var(--color-background);
}
</style>