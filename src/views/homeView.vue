<template>
  <div class="background-color">
    <div class="container margin">
      <card :image="image" :name="$t('home.about')" :title="socials.name" round class="pre-formatted" />
      <download-button :href="resumePath">{{ $t('home.downloadCv') }}</download-button>
    </div>
  </div>
</template>

<script>
import selfie from '@/assets/selfie.jpg'
import socials from '@/service/socials.js'
import resume from '@/service/resume.js'
import card from '@/components/card.vue'
import downloadButton from '@/components/downloadButton.vue'

export default {
  components: {
    card,
    downloadButton
  },

  data() {
    return {
      image: selfie,
      socials: socials.getSocials()
    }
  },

  computed: {
    resumePath() {
      return resume.getResume(this.$i18n.locale)
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

.margin :deep(.download-button) {
  margin-top: 3rem;
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