<template>
  <navigationBar class="navigation margin" />

  <div class="container margin">
    <card />
  </div>
</template>

<script>
import navigationBar from '../components/navigationBar.vue'
import aboutMe from './aboutMe.vue'
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
}

.navigation {
  display: flex;
  justify-content: center;
}

.margin {
  margin: 15px;
}
</style>