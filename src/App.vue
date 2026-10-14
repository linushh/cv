<template>
  <navbar :socials="socials" :items="navItems" />
  <subNavbar :items="navItems" />

  <div class="body-size">
    <RouterView />
  </div>

  <scrollToTop />
</template>

<script>
import { RouterView } from 'vue-router'

import navbar from '@/components/navbar.vue'
import subNavbar from '@/components/subNavbar.vue'
import scrollToTop from '@/components/scrollToTop.vue'
import socials from '@/service/socials'
import nav from '@/service/nav'
import { useThemeStore } from '@/stores/theme'

export default {
  components: {
    navbar,
    subNavbar,
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
.body-size {
  min-height: 100vh;
  padding-top: calc(var(--navbar-height) + var(--sub-navbar-height));
}

@media (max-width: 768px) {
  .body-size {
    padding-top: var(--navbar-height);
  }
}
</style>
