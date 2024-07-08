<template>
  <navigationBar class="navigation margin" />

  <div class="container margin">
    <card :name="getCardText()" />
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
      const text = `
        Hej! Jag heter Linus Håkansson och jag är en passionerad webbutvecklare med en kärlek för att skapa och utforska. När jag inte arbetar med att bygga webbsidor, finner du mig ofta med en gitarr i handen eller i köket där jag experimenterar med nya recept.
        Min resa inom webbutveckling började när jag var 15 år gammal och byggde min första hemsida. Sedan dess har jag varit fast och älskar att dyka ner i nya teknologier och lösa komplexa problem. Jag har arbetat med flera projekt som har hjälpt mig att växa både professionellt och personligt.
        Utöver webbutveckling är jag också en stor naturälskare. Jag tycker om att vandra, fotografera och tillbringa tid utomhus. Dessa upplevelser hjälper mig att hålla mig inspirerad och kreativ.
        Denna hemsida har jag skapat för att dela med mig av mina projekt, mina tankar och för att du ska få en bättre bild av vem jag är som person. Jag hoppas att du finner något intressant här och tveka inte att kontakta mig om du vill veta mer eller bara säga hej!`
      return text 
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