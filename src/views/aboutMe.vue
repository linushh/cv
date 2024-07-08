<template>
  <!-- <navigation class="centering margin" /> -->
   <drawer />
  
  <div class="centering margin">
    <card :name="getCardText()" />
  </div>
</template>

<script>
import drawer from '../components/drawer.vue'
import card from '../components/card.vue'
import navigation from '../components/navigationBar.vue'

export default {
  components: {
    card,
    navigation,
    drawer
  },

  data() {
    return {

    }
  },

  methods: {
    getCardText() {
      return `
        kuk
        `
    }
  }
}
</script>

<style>
.centering {
  display:flex;
  justify-content: center;
}

.margin {
  margin: 15px;
}
</style>