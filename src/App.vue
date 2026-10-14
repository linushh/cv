<template>
  <header class="top-controls">
    <languageSwitcher />
    <themeToggle />
  </header>

  <div class="body-size">
    <sidebar :socials="socials" :items="navItems" />

    <RouterView />
  </div>

  <scrollToTop />
</template>

<script>
import { RouterView } from 'vue-router'

import sidebar from '@/components/sidebar.vue'
import languageSwitcher from '@/components/languageSwitcher.vue'
import themeToggle from '@/components/themeToggle.vue'
import scrollToTop from '@/components/scrollToTop.vue'
import socials from '@/service/socials'
import nav from '@/service/nav'
import { useThemeStore } from '@/stores/theme'

export default {
  components: {
    sidebar,
    languageSwitcher,
    themeToggle,
    scrollToTop
  },

  created() {
    useThemeStore().init()
  },

  data() {
    return {
      socials: socials.getSocials(),
      navItems: nav.getNavItems()
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

@media (max-width: 768px) {
  .body-size {
    padding-top: 3.5rem;
  }
}
</style>
