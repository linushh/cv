<template>
  <h1 class="title-center">{{ title }}</h1>
  <div class="image-container">

    <img
      v-lazy="{src: picture.src, loading: load, error: '../assets/loading.png'}" 
      v-for="(picture, index) in images" :key="index"
      @click="showPreview(picture.src, images, index)"
      >
    </div>
    
    <div class="modal" v-if="previewImage">

      <span 
        class="close" 
        @click="closePreview"> 
        &times; 
      </span>
        
      <img :src="previewImage" alt="Preview">

      <button @click="previousImage" class="float-left space-around left-arrow" />
      <button @click="nextImage" class="float-right space-around right-arrow" />
    </div>

    <footer class="title-center">
      <a :href="getFrontend()" target="_blank"> Frontend </a>
      <a :href="getBackend()" target="_blank"> Backend </a>
    </footer>
</template>

<script>
import load from '@/assets/progress.jpg'

export default {
  props: {
    images: Array,
    title: String,
    frontend: String,
    backend: String
  },

  data() {
    return {
      previewImage: '',
      load,
      currentIndex: null,
      allImages: null
    }
  },

  computed: {
    nextImage() {
      if (this.currentIndex < this.allImages.length -1) {
        this.currentIndex ++  
        this.previewImage = this.allImages[this.currentIndex].src
      } 
      
      if (this.currentIndex > this.allImages.length -1) {
        this.currentIndex = this.allImages.length -1
      }
    },

    previousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex --
        this.previewImage = this.allImages[this.currentIndex].src
      } 
      
      if (this.currentIndex <= 0) {
        this.currentIndex = 0
      }
    }
  },

  methods: {
    showPreview(picture, images, index) {
      this.previewImage = picture

      this.currentIndex = index
      this.allImages = images
    },

    closePreview() {
      this.previewImage = ''
    },

    getFrontend() {
      return this.frontend !== null ? this.frontend : ''
    },

    getBackend() {
      return this.backend !== null ? this.backend : ''
    }
  }
}
</script>

<style>
.left-arrow {
  padding: 10px;
  border: solid grey;
  border-width: 0 3px 3px 0;
  display: inline-block;
  transform: rotate(-225deg);
  -webkit-transform: rotate(-225deg);
  background-color: transparent;
  cursor: pointer;
  position: absolute; 
  top: 33%; 
  left: 5%;
}

.right-arrow {
  padding: 10px;
  border: solid grey;
  border-width: 0 3px 3px 0;
  display: inline-block;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 33%; 
  right: 5%;
}

.right-arrow:hover, .left-arrow:hover {
  border-color: #ccc;
  -webkit-animation-timing-function: linear;
  -webkit-transition: ease-in-out 0.1s;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.space-around {
  margin: 5px;
}

.title-center{
  text-align: center;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.image-container img {
  height: 20%;
  width: 20%;
  margin: 1rem;
  cursor: pointer;
  border-radius: 5px;
}

@media(max-width: 768px) {
  .image-container img {
    height: 40%;
    width: 40%;
  }
}

.image-container img:hover {
  border: 3px solid #8ecccc;
  -webkit-animation-timing-function: linear;
  -webkit-transition: ease-in-out 0.1s;
}

.modal {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal img {
  margin: auto;
  display: block;
  max-width: 80%;
  max-height: 80%;
  border-radius: 5px;
}

.close {
  color: grey;
  position: absolute;
  top: 0;
  right: 5%;
  font-size: 40px;
  cursor: pointer;
  -webkit-animation-timing-function: linear;
  -webkit-transition: ease-in-out 0.1s;
}

.close:hover, .close:focus {
  color: #ccc;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .close {
    top: 0;
    right: 3%;
    font-size: 30px;
  }

  .right-arrow {
    top: 10%;
    right: 3%;
    padding: 7px;
  }

  .left-arrow {
    top: 10%;
    left: 3%;
    padding: 7px;
  }
}
</style>