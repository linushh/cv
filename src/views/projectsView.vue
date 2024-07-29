<template>
  <div class="background-color">
    <drawer :links="[socials.github, socials.linkedIn, socials.facebook]" />
    
    <gallery 
      :frontend="getFrontend()"
      :backend="getBackend()"
      :title="'Todo Application: Java, Vue, MySql'"
      :images="images">
    </gallery>
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
import projects from '@/service/photoService/github'

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
  },

  methods: {
    getFrontend() {
      return projects.getProjects() !== null ? projects.getProjects().todoFrontend: ''
    },

    getBackend() {
      return projects.getProjects() !== null ? projects.getProjects().todoBackend: ''
    }
  }
}
</script>

<style>
.background-color {
  background-color: var(--color-background);
}
</style>