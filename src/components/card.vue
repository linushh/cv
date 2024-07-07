<template>
  <div class="card">
    <img :src="selfie" class="img">

    <div class="container">
      <h4>
        <b>
          Linus Håkansson
        </b>
      </h4>

      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
        Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
        Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
        Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci,
      </p>
    </div>
    </img>
  </div>
</template>

<script>
import selfie from '@/assets/selfie.jpg'

export default {
  data() {
    return {
      selfie
    }
  }
}
</script>

<style>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  
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
}

.img {
  border-radius: 5px 5px 5px 5px;
  max-height: 350px;
  max-width: auto;
}
</style>