<template>
  <div class="background-color">
    <div class="home-layout margin">
      <card :image="image" :text="$t('home.about')" :title="socials.name" image-variant="round" />
      <download-button :href="resumePath">{{ $t('home.downloadCv') }}</download-button>
    </div>
  </div>
</template>

<script>
import profile from '@/assets/profile.jpg'
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
      image: profile,
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

.home-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 16px;
  width: auto;
}

.margin {
  margin: 1rem;
}

.margin :deep(.download-button) {
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .margin {
    margin: 3rem;
  }
}
</style>