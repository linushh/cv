<template>
  <Drawer :links="[socials.github, socials.linkedIn, socials.facebook]" />
    
  <RouterView />
    
  <Footer
    :author="socials.name" 
    :links="[socials.github, socials.linkedIn, socials.facebook]">
  </Footer>
</template>

<script>
const socialData = socials.getSocials()
import { RouterLink, RouterView } from 'vue-router'

import Footer from '@/components/footer.vue'
import Drawer from '@/components/drawer.vue'
import socials from '@/service/socials'

export default {
  components: {
    Footer,
    Drawer
  },

  data() {
    return {
      socials: socialData
    }
  }
}
</script>