<template>
  <header class="top-controls">
    <languageSwitcher />
    <themeToggle />
  </header>

  <div class="body-size">
    <Drawer :links="[socials.github, socials.linkedIn, socials.facebook]" />

    <RouterView />
  </div>

  <scrollToTop />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

import Drawer from '@/components/drawer.vue'
import languageSwitcher from '@/components/languageSwitcher.vue'
import themeToggle from '@/components/themeToggle.vue'
import scrollToTop from '@/components/scrollToTop.vue'
import socials from '@/service/socials'
import { useThemeStore } from '@/stores/theme'

export default {
  components: {
    Drawer,
    languageSwitcher,
    themeToggle,
    scrollToTop
  },

  created() {
    useThemeStore().init()
  },

  data() {
    return {
      socials: socials.getSocials()
    }
  }
}
</script>

<style>
.top-controls {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.body-size {
  min-height: calc(100vh - 93px);
}
</style>