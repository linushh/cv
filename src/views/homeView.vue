<template>
  <div class="background-color">
    <div class="container margin">
      <card :image="image" :name="$t('home.about')" :title="socials.name" round class="pre-formatted" />
    </div>
  </div>
</template>

<script>
import selfie from '@/assets/selfie.jpg'
import socials from '@/service/socials.js'
import card from '@/components/card.vue'

export default {
  components: {
    card
  },

  data() {
    return {
      image: selfie,
      socials: socials.getSocials()
    }
  }
}
</script>

<style scoped>
.background-color {
  background-color: var(--color-background);
}

.container {
  align-items: center;
}

.margin {
  margin: 1rem;
}

.pre-formatted {
  white-space: pre-wrap;
}

.pre-formatted :deep(p) {
  color: #f0f0f0;
}

body.light-mode .pre-formatted :deep(p) {
  color: var(--color-text);
}

@media (max-width: 768px) {
  .margin {
    margin: 3rem;
  }
}
</style>