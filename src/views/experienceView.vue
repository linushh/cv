<template>
  <div class="spacing-around bottom-margin">
    <div class="container spacing-around">
      <card
        :image="imgHyrma"
        :title="$t('experience.infobricTitle')"
        :text="$t('experience.infobric')"
       >
      </card>
    </div>

    <div class="container spacing-around">
      <card
        :image="imgSkolon"
        :title="$t('experience.skolonTitle')"
        :text="$t('experience.skolon')"
       >
      </card>
    </div>

  <div class="container spacing-around">
    <card
      :image="imgSaab"
      :title="$t('experience.saabTitle')"
      :text="$t('experience.saab')"
     >
    </card>
  </div>

  <div class="container spacing-around">
    <card
      :image="imgBredakra"
      :title="$t('experience.bredakraTitle')"
      :text="$t('experience.bredakra')"
     >
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

.spacing-around {
  margin: 2rem;
}

.bottom-margin {
  margin-bottom: 10rem;
}
</style>
