<template>
  <h1 class="title-center">{{ title }}</h1>
  <div class="image-container">
    <img
      v-lazy="{src: picture.src, loading: load, error: '../assets/loading.png'}" 
      v-for="(picture, index) in images" :key="index"
      @click="showPreview(picture.src, images, index)">
    </div>
    
    <div class="modal" v-if="previewImage">
      <img :src="previewImage" alt="Preview">

      <button @click="previousImage" class="float-left space-around left-arrow" />
      <button @click="nextImage" class="float-right space-around right-arrow" />
      
      <i @click="closePreview" class="fa-solid fa-circle-xmark fa-xl pointer close" />
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
  top: 450px;
  left: 70px;
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
  top: 450px;
  right: 70px;
}

.close {
  color: grey;
  position: absolute;
  top: 10px;
  right: 70px;
  transform: translateY(-50%);
  font-size: 30px;
  cursor: pointer;
  margin-top: 2rem;
  -webkit-animation-timing-function: linear;
  -webkit-transition: ease-in-out 0.1s;
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

.close:hover, .close:focus {
  color: #ccc;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .close {
    font-size: 25px;
    right: 10px;
  }

  .right-arrow {
    padding: 7px;
    top: 100px;
    right: 15px;
  }

  .left-arrow {
    padding: 7px;
    top: 100px;
    left: 15px;
  }
}

@media (max-width: 1024px) {
  .close {
    right: 35px;
  }
}

@media (max-width: 450px) {
  .close {
    font-size: 15px;
    right: 7px;
    top: 0;
  }

  .right-arrow {
    top: 80px;
    right: 10px;
  }

  .left-arrow {
    top: 80px;
    left: 10px;
  }
}

@media (max-width: 600px) {
    .close {
      right: 15px;
      top: 0px;
    }
  }
</style>