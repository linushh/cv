<template>
  <div class="card">
    <lazyImage
      v-if="image"
      :src="image"
      :width="width"
      :height="height"
      :style="height ? { '--img-h': height + 'px' } : null"
      class="img margin"
      :class="imageVariant"
      :alt="title"
      @click="showPreview" />

    <div class="container">
      <h4>
        <b>
          {{ title }}
        </b>
      </h4>
      <p class="margin-ten">{{ text }}</p>
    </div>

    <div v-if="isPreviewOpen" class="modal" @click="closePreview">
      <img :src="image" :alt="title" :class="imageVariant">
    </div>
  </div>
</template>

<script>
import lazyImage from '@/components/lazyImage.vue'

export default {
  components: { lazyImage },

  props: {
    text: { type: String, default: '' },
    title: { type: String, default: '' },
    image: { type: String, default: '' },
    imageVariant: {
      type: String,
      default: 'photo',
      validator: (value) => ['photo', 'round', 'logo'].includes(value)
    },
    width: { type: [Number, String], default: null },
    height: { type: [Number, String], default: null }
  },

  data() {
    return {
      isPreviewOpen: false
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
      if (event.key === 'Escape' && this.isPreviewOpen) {
        this.closePreview()
      }
    },

    showPreview() {
      this.isPreviewOpen = true
    },

    closePreview() {
      this.isPreviewOpen = false
    }
  }
}
</script>

<style scoped>
.margin-ten {
  margin: 10px;
  white-space: pre-wrap;
  color: var(--color-card-text);
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  background-color: var(--color-card);
  max-width: 960px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 #3a4042;
}

.container {
  padding: 2px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
}

.img {
  border-radius: 5px 5px 5px 5px;
  height: min(var(--img-h, 350px), 350px);
  width: auto;
  max-width: 100%;
  object-fit: contain;
  cursor: pointer;
}

.img.round {
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
}

.img.logo {
  width: 350px;
  height: 220px;
  object-fit: contain;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.modal img {
  max-width: 40%;
  max-height: 40%;
  border-radius: 5px;
}

.modal img.round {
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .img {
    margin: 2px;
    width: 250px;
    height: auto;
  }

  .img.logo {
    width: 100%;
    height: 140px;
  }
}
</style>
