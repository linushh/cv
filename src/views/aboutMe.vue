<template>
  <navigation class="centering margin" />
  
  <div class="centering margin">
    <card />
  </div>
</template>

<script>
import card from '../components/card.vue'
import navigation from '../components/navigationBar.vue'

export default {
  data() {
    return {

    }
  },

  components: {
    card,
    navigation
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