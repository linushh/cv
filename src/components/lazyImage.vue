<template>
  <img v-lazy="src" :width="width" :height="height">
</template>

<script>
export default {
  props: {
    src: String,
    width: [Number, String],
    height: [Number, String]
  }
}
</script>

<style scoped>
img {
  background-color: var(--color-surface-alt);
}

img[lazy='loading'] {
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-surface-hover) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}

img[lazy='loaded'] {
  animation: fade-in 0.25s ease;
}

img[lazy='error'] {
  background-image: none;
  animation: none;
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  img[lazy='loading'],
  img[lazy='loaded'] {
    animation: none;
  }
}
</style>
