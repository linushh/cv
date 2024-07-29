<template>
  <div class="background-color">
    <drawer />
    
    <gallery :title="'Todo Application: Java, Vue, MySql'" :images="images" />
  </div>

  <Footer
    :author="socials.name" 
    :links="[ socials.github, socials.linkedIn, socials.facebook]">
  </Footer>
</template>

<script>
const socialData = socials.getSocials()

import drawer from '../components/drawer.vue'
import gallery from '../components/gallery.vue'
import Footer from '../components/footer.vue'

import images from '@/service/photoService/todoGallery.js'
import socials from '@/service/socials'

export default {
  components: {
    drawer,
    gallery,
    Footer
  },

  data() {
    return {
      images,
      socials: socialData
    }
  }
}
</script>

<style>
.background-color {
  background-color: var(--color-background);
}
</style>