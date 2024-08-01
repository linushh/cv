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
        java: `During my education, our main language was Java. We mostly used the newer versions, Java 17.
At my previous job, the backend was mainly developed with Java.`,
        springBoot: `During my education, we used Spring Boot to develop, build, and deploy REST APIs.
Then, at my most recent job, we used Spring Boot for the backend.`,

        vue: `In my most recent job, I used Vue.js.
The tasks could be anything from small bug fixes to adding multiple components and modules.`,
        javascript: `During my education, we primarily worked with JavaScript, CSS, and HTML when developing the frontend.
At my most recent job, we used JavaScript and Vue.js.`,

        html: `something four times`,
        css: `CSS och HTML är någont som vi har arbetat med under min utbildning och 
hänger ihop med JavaScript och därför har jag också arbetat med det under mitt senaste arbete.`,
        
        mysql: `During my education, we primarily used relational databases. We primaryly used MySQL.
At my most recent job, MySQL was what we used.`,
        postman: `something seven times`,
        tablePlus: `something eight times`,
        
        git: `Both during my education and at my previous job, we of course used version control tools.
Along with Git, I have mainly used Bitbucket, GitHub and Wrike.`,
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

  margin: 5rem auto;

  max-width: 768px;
  max-height: fit-content;
  margin-left: 50%;
  margin-right: 50%;
}

.margin-between {
  margin: 1rem;
}

@media (max-width: 768px) {
  .centering {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    width: 100%;
    padding: 0;
  }
}

@media (max-width: 400px) {
  .centering {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem auto;
    width: 100%;
    padding: 0;
  }
}
</style>