<template>
<div class="background-color">
  <Drawer />

  <div class="container margin">
    <card class="pre-formatted" :name="getCardText()" :title="'Linus Håkansson'" />
  </div>
</div>
</template>

<script>
import navigationBar from '../components/navigationBar.vue'
import aboutMe from './contactView.vue'
import card from '../components/card.vue'
import Drawer from '../components/drawer.vue';

export default {
  data() {
    return {
    }
  },

  components: {
    navigationBar,
    aboutMe,
    card,
    Drawer
  },

  methods: {
    getCardText() {
      const text = `Hej!
Jag heter Linus Håkansson och jag är en passionerad webbutvecklare med en kärlek för att skapa och utforska.
När jag inte arbetar med att bygga webbsidor, finner du mig ofta på gymmet eller i någon idrottslokal.

Min resa inom IT började när jag var 14-15 år gammal och byggde min första dator hemma tillsammans med min bror. Sedan dess har jag varit fast och älskar att dyka ner i nya teknologier och lösa problem.

Jag har arbetat med flera projekt som har hjälpt mig att växa både professionellt och personligt.

Utöver datorer, teknik och idrott är jag en också en stor naturälskare. Jag tycker om att tillbringa tid utomhus. Dessa upplevelser hjälper mig att hålla mig inspirerad och kreativ.

Denna hemsida har jag skapat för att dela med mig av mina projekt, mina tankar och för att du ska få en bättre bild av vem jag är som person.
Jag hoppas att du finner något intressant här och tveka inte att kontakta mig om du vill veta mer eller bara säga hej!`
      return text
    }
  }
}
</script>

<style>
.background-color {
  background-color: var(--color-background);
}

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

.pre-formatted {
  white-space: pre-wrap;
}
</style>