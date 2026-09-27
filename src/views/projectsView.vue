<template>
  <div v-if="!activeProject" class="projects-grid">
    <projectTile
      v-for="project in projects"
      :key="project.id"
      :title="$t(project.titleKey)"
      :image-count="$t('projects.images', [project.images.length])"
      :cover="project.cover"
      @open="activeProject = project" />
  </div>

  <gallery
    v-else
    :title="$t(activeProject.titleKey)"
    :images="activeProject.images"
    :frontend="activeProject.frontend"
    :frontend-name="activeProject.frontend ? $t(activeProject.frontendNameKey) : ''"
    :backend="activeProject.backend"
    :backend-name="activeProject.backend ? $t(activeProject.backendNameKey) : ''"
    @close="activeProject = null" />
</template>

<script>
import projectTile from '@/components/projectTile.vue'
import gallery from '@/components/gallery.vue'
import projects from '@/service/photoService/projects.js'

export default {
  components: {
    projectTile,
    gallery
  },

  data() {
    return {
      projects: projects.getProjects(),
      activeProject: null
    }
  }
}
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 5rem 2rem 2rem;
  margin-left: calc(var(--mini-drawer-width) + 2rem);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    margin-left: var(--mini-drawer-width);
  }
}
</style>
