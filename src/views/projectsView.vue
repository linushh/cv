<template>
  <div class="background-color margin">
    <div class='margin-bottom'>
      <gallery
        :frontend="getFrontend()"
        :frontend-name="$t('projects.todoFrontendName')"
        :backend="getBackend()"
        :backend-name="$t('projects.todoBackendName')"
        :title="$t('projects.todoTitle')"
        :images="images">
      </gallery>
    </div>

    <div class="margin-top margin-bottom">
      <gallery
        :images="sunbotImages"
        :title="$t('projects.sunbotTitle')"
        :backend="getSunbotGithub()"
        :backend-name="$t('projects.sunbotBackendName')">
      </gallery>
    </div>
  </div>
</template>

<script>
import gallery from '@/components/gallery.vue'

import images from '@/service/photoService/todoGallery.js'
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
      sunbotImages
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