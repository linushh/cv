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

<style>
.background-color {
  background-color: var(--color-background);
}

.container {
  align-items: center;
}

.navigation {
  display: flex;
  justify-content: center;
}

.margin {
  margin: 1rem;
}

.pre-formatted {
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .margin {
    margin: 3rem;
  }
}
</style>