<template>
  <navigation class="centering margin" />
  
  <div class="centering margin">
    <card :name="getCardText()" />
  </div>
</template>

<script>
import card from '../components/card.vue'
import navigation from '../components/navigationBar.vue'

export default {
  components: {
    card,
    navigation
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