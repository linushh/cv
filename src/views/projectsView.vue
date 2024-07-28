<template>
  <div class="background-color">
    <drawer />
    
    <gallery :title="'Todo Application: Java, Vue, MySql'" :images="images" />
  </div>

  <Footer
    :author="'Linus Håkansson'" 
    :links="[ 'https://github.com/LinusHakansson', 'https://www.linkedin.com/in/linus-h%C3%A5kansson-4584ab251', 'https://www.facebook.com/linus.hakansson.98478']">
  </Footer>
</template>

<script>
import drawer from '../components/drawer.vue'
import gallery from '../components/gallery.vue'
import Footer from '../components/footer.vue'

import images from '@/service/photoService/todoGallery.js'

export default {

  data() {
    return {
      images
    }
  },

  components: {
    drawer,
    gallery,
    Footer
  }
}
</script>

<style>
.background-color {
  background-color: var(--color-background);
}
</style>