<template>
  <button
    class="theme-toggle"
    :title="$t('header.switchTheme')"
    :aria-label="$t('header.switchTheme')"
    @click="themeStore.toggle()">
      <i class="fa-solid" :class="themeStore.theme === 'dark' ? 'fa-sun' : 'fa-moon'" />
  </button>
</template>

<script>
import { useThemeStore } from '@/stores/theme'

export default {
  data() {
    return {
      themeStore: useThemeStore()
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  background-color: var(--color-surface-alt);
  border: none;
  border-radius: 5px;
  color: var(--color-on-surface);
  font-size: 1rem;
  padding: 0.3rem 0.55rem;
  cursor: pointer;
}

.theme-toggle:hover {
  background-color: var(--color-surface-hover);
}
</style>
