<template>
  <Drawer />

  <div class="container">
    <card
    :image="image" 
    :title="'Skolon AB - Fullstack utvecklare (praktik)'" 
    :name="getCardText()"
    class="pre-formatted">
  </card>
</div>

  <div class="container spacing-around">
    <card
    :image="image" 
    :title="'Saab AB - IT säkerhetsspecialist (praktik)'" 
    :name="getCardText()"
    class="pre-formatted">
  </card>
</div>

  <div class="container spacing-around">
    <card
    :image="bredakra" 
    :title="'Bredåkra - Säsongsanställning, grönytor'" 
    :name="bredakraText()"
    class="pre-formatted">
  </card>
</div>
</template>

<script>
import selfie from '@/assets/selfie.jpg'
import bredakra from '@/assets/imgPastWork/imgBredakra/bredakraHalloween.jpg'

import Drawer from '@/components/drawer.vue'
import card from '@/components/card.vue'

export default {
  components: {
    card,
    Drawer
  },

  data() {
    return{
      image: selfie,
      bredakra: bredakra
    }
  },

  methods: {
    getCardText() {
      return `Hej!
Jag heter Linus Håkansson och jag är en passionerad webbutvecklare med en kärlek för att skapa och utforska.
När jag inte arbetar med att bygga webbsidor, finner du mig ofta på gymmet eller i någon idrottslokal.

Min resa inom IT började när jag var 14-15 år gammal och byggde min första dator hemma tillsammans med min bror. Sedan dess har jag varit fast och älskar att dyka ner i nya teknologier och lösa problem.

Jag har arbetat med flera projekt som har hjälpt mig att växa både professionellt och personligt.

Utöver datorer, teknik och idrott är jag en också en stor naturälskare. Jag tycker om att tillbringa tid utomhus. Dessa upplevelser hjälper mig att hålla mig inspirerad och kreativ.

Denna hemsida har jag skapat för att dela med mig av mina projekt, mina tankar och för att du ska få en bättre bild av vem jag är som person.
Jag hoppas att du finner något i`
    },

    bredakraText() {
      return `Jag arbetade inom parkförvaltningen och tog hand om
både parkarbete (grönytor) och begravningsverksamhet
som t.ex. att hölja gravar. Både jordgravar och
urnsättningar. Användning av olika maskiner förekom ofta
som t.ex. Walker gräsklippar och Avant.`
    }
  }
}

</script>

<style> 
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pre-formatted {
  white-space: pre-wrap;
}

.spacing-around {
  margin: 3rem;
}
</style>
