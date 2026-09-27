<template>
  <div class="body-size">
    <Drawer :links="[socials.github, socials.linkedIn, socials.facebook]" />
    <languageSwitcher />

    <RouterView />
  </div>

  <Footer
    :author="socials.name"
    :email="socials.email"
    :phone-number="socials.phoneNumber">
  </Footer>
</template>

<script>
const socialData = socials.getSocials()
import { RouterLink, RouterView } from 'vue-router'

import Footer from '@/components/footer.vue'
import Drawer from '@/components/drawer.vue'
import languageSwitcher from '@/components/languageSwitcher.vue'
import socials from '@/service/socials'

export default {
  components: {
    Footer,
    Drawer,
    languageSwitcher
  },

  data() {
    return {
      socials: socialData
    }
  }
}
</script>

<style>
.body-size {
  min-height: calc(100vh - 93px);
}
</style>