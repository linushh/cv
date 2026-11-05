<template>
  <div class="background-color">
    <cardGrid :columns="2">
      <card
        v-for="skill in skills"
        :key="skill.id"
        :image="skill.image"
        :title="skill.title"
        :text="$t(skill.textKey)"
        image-variant="logo"
      />
    </cardGrid>
  </div>
</template>

<script>
import card from '@/components/card.vue'
import cardGrid from '@/components/cardGrid.vue'
import skills from '@/service/skills.js'

export default {
  components: {
    card,
    cardGrid,
  },

  data() {
    return {
      skills: skills.getSkills(),
    }
  },
}
</script>

<style scoped>
.background-color {
  background-color: var(--color-background);
}
</style>
