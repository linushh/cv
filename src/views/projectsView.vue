<template>
  <div class="background-color">
    <gallery 
      :frontend="getFrontend()"
      :backend="getBackend()"
      :title="'Todo Application: Java, Vue, MySql'"
      :images="images">
    </gallery>
  </div>
</template>

<script>
const socialData = socials.getSocials()

import gallery from '../components/gallery.vue'

import images from '@/service/photoService/todoGallery.js'
import socials from '@/service/socials'
import projects from '@/service/photoService/github'

export default {
  components: {
    gallery
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