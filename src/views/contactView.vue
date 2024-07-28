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

  <Footer
    :author="'Linus Håkansson'" 
    :links="[ 'https://github.com/LinusHakansson', 'https://www.linkedin.com/in/linus-h%C3%A5kansson-4584ab251', 'https://www.facebook.com/linus.hakansson.98478']">
  </Footer>
</template>

<script>
import selfie from '@/assets/selfie.jpg'

import drawer from '../components/drawer.vue'
import card from '../components/card.vue'
import Footer from '../components/footer.vue'


export default {
  data() {
    return {
      image: selfie
    }
  },

  components: {
    card,
    drawer,
    Footer
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