<template>
  <Drawer />

  <div class="container">
    <card
    :image="image" 
    :title="'Skolon AB - Fullstack utvecklare (praktik)'" 
    :name="skolonText()"
    class="pre-formatted">
  </card>
</div>

  <div class="container spacing-around">
    <card
    :image="saab" 
    :title="'Saab AB - IT säkerhetsspecialist (praktik)'" 
    :name="saabText()"
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
import saab from '@/assets/imgPastWork/imgSaab/saabVisbyCorvett.jpg'

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
      bredakra: bredakra,
      saab: saab
    }
  },

  methods: {
    skolonText() {
      return `Under en av mina praktikperioder arbetade jag som fullstack webbutvecklare hos Skolon AB.
      
Tekinker som jag utvecklade lite mer under min tid hos Skolon var:
    *   Java 17 och Spring Boot
    *   JavaScript och Vue.js (Options API)
    *   HTML och CSS
    *   MySql
    *   Postman
    *   Table Plus
    *   Git
    *   Bitbucket
    *   Wrike
      
En vanlig dag kunde vara standup möte, gå igenom vad som behövdes göras för dagen för varje specifik person. Ta emot tickets via Wrike och sedan utföra sina arbetsuppgifter inför dagen eller dagarna. Det kunde vara allt från att leta buggar till att implementera helt nya funktioner.

När uppgiftens var klar och hade skickat in sina commits till Bitbucket så blev det alltid en code review där jag fick lära mig mycket genom konstruktiv kritik.`
    },

    saabText() {
      return `Under min utbildning som Javautvecklare lyckades jag få in en fot på Saab Kockums i Karlskrona. Där arbetade jag med IT-Säkerhet under en IT-Säkerhetsarkitekt.
      
Jag arbetade med verktyg som Jira och andra interna verktyg som Saab AB kunde erbjuda.

Vi hade dagliga standups och fick jag fick lära mig om diverse olika informationssäkerhets principer och taktiker.

På grund av säkerhetsklassningen kan jag inte gå in på så mycket detaljer.`
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
