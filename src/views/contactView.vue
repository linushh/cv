<template>
  <div class="background-color">
   <drawer />
  
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

import drawer from '../components/drawer.vue'
import card from '../components/card.vue'
import navigation from '../components/navigationBar.vue'


export default {
  data() {
    return {
      image: selfie
    }
  },

  components: {
    card,
    navigation,
    drawer
  },

  methods: {
    getCardText() {
      return `Email: Linus_hakansson@outlook.com
Phone: +46733800407`
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