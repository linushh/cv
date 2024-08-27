<template>
  <div class="background-color margin">
    <div class='margin-bottom'>
      <gallery 
        :frontend="getFrontend()"
        :frontend-name="'Todo Application: frontend, vue, java'"
        :backend="getBackend()"
        :backend-name="'Todo Application: backend, spring boot, mysql'"
        :title="'Todo Application: Java, Vue, MySql'"
        :images="images">
      </gallery>
    </div>

    <div class="margin-top margin-bottom">
      <gallery
        :images="sunbotImages"
        :title="'SunbotJs. A discord music bot with a discord api. (In progress)'"
        :backend="getSunbotGithub()"
        :backend-name="'SunbotJs: in JavaScript!'">
      </gallery>
    </div>
  </div>
</template>

<script>
const socialData = socials.getSocials()

import gallery from '../components/gallery.vue'

import images from '@/service/photoService/todoGallery.js'
import socials from '@/service/socials'
import projects from '@/service/photoService/github'

import sunbotImages from '@/service/photoService/sunbotGallery.js'
import sunbotGithub from '@/service/photoService/sunbotjsGithub.js'

export default {
  components: {
    gallery
  },

  data() {
    return {
      images,
      socials: socialData,
      
      sunbotImages,
      sunbotGithub
    }
  },

  methods: {
    getFrontend() {
      return projects.getProjects() !== null ? projects.getProjects().todoFrontend: ''
    },

    getBackend() {
      return projects.getProjects() !== null ? projects.getProjects().todoBackend: ''
    },

    getSunbotGithub() {
      return sunbotGithub.getProject() !== null ? sunbotGithub.getProject().sunbotJs: ''
    }
  }
}
</script>

<style>
.background-color {
  background-color: var(--color-background);
}

.margin {
  margin: 2rem;
}

.margin-top {
  margin-top: 5rem;
}

.margin-bottom {
  margin-bottom: 5rem;
}
</style>