<template>
  <cardGrid :columns="1" class="bottom-margin">
    <card
      v-for="entry in experience"
      :key="entry.id"
      :image="entry.image"
      :title="$t(entry.titleKey)"
      :text="$t(entry.textKey)" />
  </cardGrid>
</template>

<script>
import card from '@/components/card.vue'
import cardGrid from '@/components/cardGrid.vue'
import experience from '@/service/experience.js'

export default {
  components: {
    card,
    cardGrid
  },

  data() {
    return {
      experience: experience.getExperience()
    }
  }
}
</script>

<style scoped>
.bottom-margin {
  margin-bottom: 10rem;
}
</style>
