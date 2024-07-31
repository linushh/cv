<template>
  <div class="background-color">

    <div class="centering margin">
    <card 
      :image="image" 
      class="preformatted" 
      :name="getCardText()"
      :title="'Contact information:'" >
    </card>
  </div>
</div>
</template>

<script>
import selfie from '@/assets/selfie.jpg'
import socials from '@/service/socials'

import card from '../components/card.vue'

const socialData = socials.getSocials()

export default {
  components: {
    card
  },

  data() {
    return {
      image: selfie,
      socials: socialData
    }
  },

  methods: {
    getCardText() {
      return `Email: ` + this.socials.email + ` 
Phone: ` + this.socials.phoneNumber
    }
  }
}
</script>

<style>
.background-color {
  background-color: var(--color-background);
}

.preformatted {
  white-space: pre-wrap;
}
.centering {
  display:flex;
  justify-content: center;
}

.margin {
  margin: 15px;
}
</style>