<template>
  <h1 class="title-center">{{ title }}</h1>
  <div class="image-container">
    <img v-for="(picture, index) in images" :key="index" 
      :src="picture.src" alt="Image" 
      @click="showPreview(picture.src)">
    </div>
    
    <div class="modal" v-if="previewImage">
      <span class="close" @click="closePreview"> &times; </span>
      <img :src="previewImage" alt="Preview">
    </div>
    
    <footer class="title-center">
      <a href="https://github.com/linushh/todo-standalone" target="_blank"> Frontend </a>
      <a href="https://github.com/linushh/todo-standalone-admin"target="_blank"> Backend </a>
    </footer>
</template>

<script>
export default {
  props: {
    images: Array,
    title: String
  },

  data() {
    return {
      previewImage: ''
    }
  },

  methods: {
    showPreview(picture) {
      this.previewImage = picture
    },

    closePreview() {
      this.previewImage = ''
    }
  }
}
</script>

<style>
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

.image-container img:hover {
  border: 3px solid #8ecccc;
  -webkit-animation-timing-function: linear;
  -webkit-transition: ease-in-out 0.1s;
}

.modal {
  display: block;
  position: fixed;
  /* z-index: 1000; */
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
  color: #fff;
  position: absolute;
  top: 15px;
  right: 35px;
  font-size: 30px;
  cursor: pointer;
}

.close:hover, .close:focus {
  color: #ccc;
  text-decoration: none;
  cursor: pointer;
}
</style>