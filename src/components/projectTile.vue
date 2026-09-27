<template>
  <div class="project-tile" @click="$emit('open')">
    <img v-lazy="{ src: cover, loading: load }" class="cover">

    <div class="overlay">
      <h3 class="title">{{ title }}</h3>
      <p class="image-count">{{ imageCount }}</p>
    </div>
  </div>
</template>

<script>
import load from '@/assets/progress.jpg'

export default {
  props: {
    title: String,
    imageCount: String,
    cover: String
  },

  emits: ['open'],

  data() {
    return {
      load
    }
  }
}
</script>

<style scoped>
.project-tile {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  background-color: var(--color-card);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  aspect-ratio: 16 / 10;
}

.cover {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-tile:hover .cover {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent 55%);
}

.title {
  color: white;
  font-size: 1.2rem;
}

.image-count {
  color: #ccc;
  font-size: 0.9rem;
}
</style>
