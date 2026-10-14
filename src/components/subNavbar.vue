<template>
  <nav class="sub-navbar">
    <navLinks :items="items" />
  </nav>
</template>

<script>
import navLinks from '@/components/navLinks.vue'

export default {
  components: {
    navLinks
  },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.sub-navbar {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  right: 0;
  height: var(--sub-navbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-alt);
  border-bottom: 1px solid var(--color-border);
  z-index: 2;
}

@media (max-width: 768px) {
  .sub-navbar {
    display: none;
  }
}
</style>
