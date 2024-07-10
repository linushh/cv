<template>
  <div class="card">
    <img v-lazy="{ src: selfie, loading: load}"  class="img margin">

    <div class="container">
      <h4>
        <b>
          {{ title }}
        </b>
      </h4>
      <p>{{ name }}</p>
    </div>
    </img>
  </div>
</template>

<script>
import selfie from '@/assets/selfie.jpg'
import load from '@/assets/progress.jpg'

export default {
  props: {
    name: String,
    title: String
  },

  data() {
    return {
      selfie,
      load
    }
  }
}
</script>

<style>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  background-color: #282828;
  max-width: 720px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 #3a4042;
}

.container {
  padding: 2px 16px;
  display: flex;
  flex-direction: column;
  width: auto;
}

.img {
  border-radius: 5px 5px 5px 5px;
  max-height: 350px;
  max-width: auto;
}
</style>