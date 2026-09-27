<template>
  <div v-if="images && images.length">
    <header class="gallery-header">
      <button class="back-button pointer" @click="$emit('close')">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h1 class="gallery-title">{{ title }}</h1>
    </header>

    <div class="image-grid">
      <img
        v-for="(image, index) in images"
        :key="index"
        v-lazy="{ src: image.src, loading: load }"
        @click="openPreview(index)">
    </div>

    <footer class="gallery-links">
      <a v-if="frontend" :href="frontend" target="_blank">{{ frontendName }}</a>
      <a v-if="backend" :href="backend" target="_blank">{{ backendName }}</a>
    </footer>

    <div class="modal" v-if="currentIndex !== null" @click.self="closePreview">
      <img :src="images[currentIndex].src" alt="Preview" class="preview">

      <div class="filmstrip">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :class="{ active: index === currentIndex }"
          @click="openPreview(index)">
      </div>
    </div>
  </div>
</template>

<script>
import load from '@/assets/progress.jpg'

export default {
  props: {
    title: String,
    images: Array,
    frontend: String,
    backend: String,
    frontendName: String,
    backendName: String
  },

  emits: ['close'],

  data() {
    return {
      currentIndex: null,
      load
    }
  },

  mounted() {
    document.addEventListener('keydown', this.onKeyDown)
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  },

  methods: {
    onKeyDown(event) {
      if (this.currentIndex === null) {
        return
      }

      if (event.key === 'Escape') {
        this.closePreview()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        this.nextImage()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        this.previousImage()
      }
    },

    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++
      }
    },

    previousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },

    openPreview(index) {
      this.currentIndex = index
    },

    closePreview() {
      this.currentIndex = null
    }
  }
}
</script>

<style scoped>
.gallery-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 2rem 1rem calc(var(--mini-drawer-width) + 2rem);
}

.back-button {
  background-color: var(--color-surface-alt);
  border: none;
  border-radius: 5px;
  color: var(--color-on-surface);
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
}

.back-button:hover {
  background-color: var(--color-surface-hover);
}

.gallery-title {
  color: var(--color-heading);
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin: 0 2rem 2rem calc(var(--mini-drawer-width) + 2rem);
}

.image-grid img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}

.image-grid img:hover {
  outline: 3px solid #8ecccc;
}

.gallery-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 0 2rem 2rem calc(var(--mini-drawer-width) + 2rem);
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}

.preview {
  margin: auto;
  max-width: 80%;
  max-height: 70vh;
  border-radius: 5px;
}

.filmstrip {
  display: flex;
  gap: 0.5rem;
  max-width: 90%;
  margin: 0 auto 1rem;
  padding: 0.25rem;
  overflow-x: auto;
}

.filmstrip img {
  height: 70px;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.6;
  flex-shrink: 0;
}

.filmstrip img:hover {
  opacity: 1;
}

.filmstrip img.active {
  outline: 3px solid hsla(160, 100%, 37%, 1);
  opacity: 1;
}

@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .preview {
    max-width: 92%;
  }
}
</style>
