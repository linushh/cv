<template>
  <button
    v-show="visible"
    class="scroll-to-top"
    :title="$t('common.backToTop')"
    :aria-label="$t('common.backToTop')"
    @click="scrollToTop">
      <i class="fa-solid fa-angles-up"></i>
  </button>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      this.visible = window.scrollY > 300
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 2;
  background-color: var(--color-surface-alt);
  border: none;
  border-radius: 5px;
  color: var(--color-on-surface);
  font-size: 1.1rem;
  padding: 0.6rem 0.8rem;
  cursor: pointer;
}

.scroll-to-top:hover {
  background-color: var(--color-surface-hover);
}
</style>
