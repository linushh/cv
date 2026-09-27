<template>
  <a class="download-button" :href="href" download>
    <i class="fa-solid fa-download" aria-hidden="true"></i>
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: String
  }
}
</script>

<style scoped>
.download-button {
  align-items: center;
  background-color: var(--color-card);
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: var(--color-text);
  display: inline-flex;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  transition: 0.3s;
}

.download-button:hover {
  box-shadow: 0 8px 16px 0 #3a4042;
}
</style>
