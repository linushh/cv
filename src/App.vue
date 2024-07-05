<template>
  <homeView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import homeView from './views/homeView.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    homeView
  }
}
</script>