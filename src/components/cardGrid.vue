<template>
  <div class="card-grid" :style="{ '--columns': columns }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 1), 1fr);
  gap: 2rem;
  margin: 5rem auto;
  max-width: 960px;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    margin: 1rem auto;
  }
}
</style>
