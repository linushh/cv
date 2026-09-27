<template>
  <div class="spacing-around bottom-margin">
    <div class="container spacing-around">
      <card
        :image="imgHyrma"
        :title="$t('experience.infobricTitle')"
        :name="$t('experience.infobric')"
        class="pre-formatted">
      </card>
    </div>

    <div class="container spacing-around">
      <card
        :image="imgSkolon"
        :title="$t('experience.skolonTitle')"
        :name="$t('experience.skolon')"
        class="pre-formatted">
      </card>
    </div>

  <div class="container spacing-around">
    <card
      :image="imgSaab"
      :title="$t('experience.saabTitle')"
      :name="$t('experience.saab')"
      class="pre-formatted">
    </card>
  </div>

  <div class="container spacing-around">
    <card
      :image="imgBredakra"
      :title="$t('experience.bredakraTitle')"
      :name="$t('experience.bredakra')"
      class="pre-formatted">
    </card>
  </div>
</div>
</template>

<script>
import imgSkolon from '@/assets/imgPastWork/imgSkolon/skolon.jpg'
import imgSaab from '@/assets/imgPastWork/imgSaab/saabVisbyCorvett.jpg'
import imgBredakra from '@/assets/imgPastWork/imgBredakra/bredakraHalloween.jpg'
import imgHyrma from '@/assets/imgPastWork/imgHyrma/hyrma.png'

import card from '@/components/card.vue'

export default {
  components: {
    card
  },

  data() {
    return {
      imgSkolon: imgSkolon,
      imgBredakra: imgBredakra,
      imgSaab: imgSaab,
      imgHyrma: imgHyrma
    }
  }
}
</script>

<style> 
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pre-formatted {
  white-space: pre-wrap;
}

.spacing-around {
  margin: 2rem;
}

.bottom-margin {
  margin-bottom: 10rem;
}
</style>
