<template>
  <ul class="nav-links" :class="{ vertical }">
    <li
      v-for="item in items"
      :key="item.path"
      :class="{ active: isActive(item.path) }">
      <RouterLink :to="item.path">
        {{ $t(item.labelKey) }}
      </RouterLink>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },

    vertical: Boolean
  },

  methods: {
    isActive(path) {
      return this.$route.path === path
    }
  }
}
</script>

<style scoped>
.nav-links {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links.vertical {
  flex-direction: column;
}

li {
  display: block;
  float: none;
  margin: 0;
  border: none;
}

a {
  display: block;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  color: var(--color-text);
  background-color: transparent;
}

a:hover,
li.active a {
  color: var(--color-on-surface);
  background-color: var(--color-surface-hover);
}
</style>
