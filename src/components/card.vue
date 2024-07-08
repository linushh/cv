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
        <!-- Mina tidigare arbetserfarenheter samt
        livserfarenheter har lärt mig att vara en god
        tillgång för gruppens bästa och en person
        som höjer stämningen som gärna gotta ner
        sig i problem som jag får lösa. Jag strävar
        emot att ständigt utvecklas och bli en bättre
        version av mig själv varje dag! -->

        {{ name }}
      </p>
    </div>
    </img>
  </div>
</template>

<script>
import selfie from '@/assets/selfie.jpg'

export default {
  props: {
    name: String
  },

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