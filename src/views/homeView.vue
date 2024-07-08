<template>
  <navigationBar class="navigation margin" />

  <div class="container margin">
    <card :name="getCardText" />
  </div>
</template>

<script>
import navigationBar from '../components/navigationBar.vue'
import aboutMe from './aboutMe.vue'
import card from '../components/card.vue'

export default {
  data() {
    return {
    }
  },

  components: {
    navigationBar,
    aboutMe,
    card
  },

  methods: {
    getCardText() {
      return `
        Mina tidigare arbetserfarenheter samt livserfarenheter har lärt 
        mig att vara en god tillgång för gruppens bästa och en person som höjer 
        stämningen som gärna gotta ner sig i problem som jag får lösa. 
        Jag strävar emot att ständigt utvecklas och bli en bättre version av mig själv varje dag!`
    }
  }
}
</script>

<style>
.container {
  align-items: center;
}

.navigation {
  display: flex;
  justify-content: center;
}

.margin {
  margin: 15px;
}
</style>