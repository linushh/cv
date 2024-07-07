<template>
  <navigationBar class="navigation" />

  <card class="container" />
</template>

<script>
import navigationBar from '../components/navigationBar.vue'
import aboutMe from '../components/aboutMe.vue'
import card from '../components/card.vue'

export default {
  data() {
    return {
    }
  },

  components: {
    navigationBar,
    aboutMe,
    card
  }
}
</script>

<style>
.container {
  align-items: center;
  margin: 5px;
}

.navigation {
  display: flex;
  justify-content: right;
}
</style>