<template>
  <div class="background-color">
    <div class="centering">
      <card
        :image="java"
        :title="'Java'"
        :name="iconTexts('java')"
        class="preformatted margin-between">
      </card>
      
      <card
        :image="springBoot"
        :title="'Spring Boot'"
        :name="iconTexts('springBoot')"
        class="preformatted margin-between">
      </card>
    </div>
      
    <div class="centering">
      <card 
        :image="vue" 
        :title="'Vue.js'"
        :name="iconTexts('vue')"
        class="preformatted margin-between">
      </card>
      
      <card
        :image="javascript"
        :title="'JavaScript'"
        :name="iconTexts('javascript')"    
        class="preformatted margin-between">
      </card>
    </div>
  
    <div class="centering">
      <card
        :image="mysql"
        :title="'MySQL'"
        :name="iconTexts('mysql')"
        class="preformatted margin-between">
      </card>
      
      <card
        :image="git"
        :title="'Git'"
        :name="iconTexts('git')"
        class="preformatted margin-between">
      </card>
  </div>
</div>
</template>

<script>
import springBoot from '@/assets/iconsMySkills/spring-boot.png'
import java from '@/assets/iconsMySkills/java.png'

import vueJs from '@/assets/iconsMySkills/vue-js.png'
import javascript from '@/assets/iconsMySkills/javascript.png'
import css from '@/assets/iconsMySkills/css.png'

import mysql from '@/assets/iconsMySkills/mysql.png'

import git from '@/assets/iconsMySkills/git.png'

import selfie from '@/assets/selfie.jpg'
import socials from '@/service/socials'


import card from '../components/card.vue'

const socialData = socials.getSocials()

export default {
  components: {
    card
  },

  data() {
    return {
      image: selfie,
      socials: socialData,

      java: java,
      springBoot: springBoot,
      mysql: mysql,

      javascript: javascript,
      vue: vueJs,
      css: css,

      git: git,
    }
  },

  methods: {
    iconTexts(name) {
      const text = {
        java: `Under min utbildning var vårt huvudspråk Java. Vi använde oss mesta dels utav nyare version som Java 17.
På mitt tidigare arbete så utvecklades backenden huvudsakligen med Java`,
        springBoot: `Under min utbildning använde vi Spring Boot för att utveckla bland annat rest API. 
sedan under mitt senaste arbete så använde vi Spring Boot för backenden.`,

        vue: `I mitt senaste arbete använd jag mig utan vue.js.
Uppdragen kunde vara allt möjligt mellan små bugfixar,
till att lägga till flera komponenter och moduler.`,
        javascript: `Undder min utbildning så arbetade vi främst med JavaScript, CSS och HTML när vi utvecklade frontend.
På mitt senaste arbete så använde vi endast JavaScript och Vue.js.`,
        html: `something four times`,
        css: `CSS och HTML är någont som vi har arbetat med under min utbildning och 
hänger ihop med JavaScript och därför har jag också arbetat med det under mitt senaste arbete.`,
        
        mysql: `Under min utbildning använde vi främst relationsdatabaser och MYSQL.
Under mitt senaste arbete så var MYSQL det som användes.`,
        postman: `something seven times`,
        tablePlus: `something eight times`,
        
        git: `Båder under min utbildning samt mitt förra arbete så har vi självklart använda oss utav versionshanteringsverktyg.
Tillsammans med Git så har jag främst använt Bitbucket och Github.`,
        bitbucket: `something ten times`,
        wrike: `something eleven times`
      }

      return text[name]
    }
  }
}
</script>

<style>
.background-color {
  background-color: var(--color-background);
}

.preformatted {
  white-space: pre-wrap;
}
.centering {
  display: flex;
  justify-content: center;

  margin-left: 10rem;
  margin-right: 10rem;
  margin-top: 5rem;
  margin-bottom: 5rem;

  max-width: 768px;
  max-height: fit-content;
  margin-left: 50%;
  margin-right: 50%;
}

.margin-between {
  margin: 1rem;
}
</style>