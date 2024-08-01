<template>
  <div class="spacing-around bottom-margin">
    <div class="container">
      <card
        :image="imgSkolon" 
        :title="'Skolon AB - Fullstack Developer (Internship). Östra piren Karlshamn, Sweden'"
        :name="getText('skolon')"
        class="pre-formatted">
      </card>
  </div>
  
  <div class="container spacing-around">
    <card
      :image="imgSaab" 
      :title="'Saab AB - IT Security Specialist (Internship). Kockums Karlskrona, Sweden'"
      :name="getText('saab')"
      class="pre-formatted">
    </card>
  </div>

  <div class="container spacing-around">
    <card
      :image="imgBredakra" 
      :title="'Bredåkra - Seasonal Employment, Green Spaces. Bredåkra Kallinge, Sweden'"
      :name="getText('bredakra')"
      class="pre-formatted">
    </card>
  </div>
</div>
</template>

<script>
const socialData = socials.getSocials()

import socials from '@/service/socials'
import imgSkolon from '@/assets/imgPastWork/imgSkolon/skolon.jpg'
import imgSaab from '@/assets/imgPastWork/imgSaab/saabVisbyCorvett.jpg'
import imgBredakra from '@/assets/imgPastWork/imgBredakra/bredakraHalloween.jpg'

import card from '@/components/card.vue'

export default {
  components: {
    card
  },

  data() {
    return{
      imgSkolon: imgSkolon,
      imgBredakra: imgBredakra,
      imgSaab: imgSaab,
      socials: socialData
    }
  },

  methods: {

    getText(name) {
      const text = {
        skolon: `During one of my internships, I worked as a fullstack web developer at Skolon AB.

Technologies that I further developed during my time at Skolon included:
* Java 17 and Spring Boot
* JavaScript and Vue.js (Options API)
* HTML and CSS
* MySQL
* Postman
* Table Plus
* Git
* Bitbucket
* Wrike

A typical day could involve a standup meeting, going through what needed to be done for the day for each specific person, receiving tickets via Wrike, and then carrying out the tasks for the day or days. This could range from finding bugs to implementing entirely new features.

When the task was completed and commits were sent to Bitbucket, there was always a code review where I learned a lot through constructive criticism.`,

        saab: `During my education as a Java developer, I managed to get a foot in the door at Saab Kockums in Karlskrona, where I worked with IT security under an IT security architect.

I worked with tools like Jira and other internal tools that Saab AB could offer.

We had daily standups, and I got to learn about various information security principles and tactics.

Due to the security classification, I cannot go into much detail.`,

        bredakra: `I worked in park management and took care of both park work (green spaces) and burial services, such as covering both earth graves with coffins and urn placements.
The use of various machines was common, such as Walker mowers and Avant.`
      }

      return text[name]
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
  margin: 2rem;
}

.bottom-margin {
  margin-bottom: 10rem;
}
</style>
