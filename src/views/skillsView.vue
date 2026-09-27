<template>
  <div class="background-color">
    <div class="centering">
      <card
        :image="dotNet"
        title=".NET"
        :name="$t('skills.dotNet')"
        class="preformatted margin-between">
      </card>

      <card
        :image="mariaDb"
        title="MariaDB"
        :name="$t('skills.mariaDb')"
        class="preformatted margin-between">
      </card>
    </div>

    <div class="centering">
      <card
        :image="java"
        title="Java"
        :name="$t('skills.java')"
        class="preformatted margin-between">
      </card>

      <card
        :image="springBoot"
        title="Spring Boot"
        :name="$t('skills.springBoot')"
        class="preformatted margin-between">
      </card>
    </div>

    <div class="centering">
      <card
        :image="vue"
        title="Vue.js"
        :name="$t('skills.vue')"
        class="preformatted margin-between">
      </card>

      <card
        :image="javascript"
        title="JavaScript"
        :name="$t('skills.javascript')"
        class="preformatted margin-between">
      </card>
    </div>

    <div class="centering">
      <card
        :image="mysql"
        title="MySQL"
        :name="$t('skills.mysql')"
        class="preformatted margin-between">
      </card>

      <card
        :image="git"
        title="Git"
        :name="$t('skills.git')"
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
import mysql from '@/assets/iconsMySkills/mysql.png'
import git from '@/assets/iconsMySkills/git.png'
import dotNet from '@/assets/iconsMySkills/dotNet.png'
import mariaDb from '@/assets/iconsMySkills/mariaDb.png'

import card from '@/components/card.vue'

export default {
  components: {
    card
  },

  data() {
    return {
      java: java,
      springBoot: springBoot,
      mysql: mysql,
      javascript: javascript,
      vue: vueJs,
      git: git,
      dotNet: dotNet,
      mariaDb: mariaDb
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

.centering .img {
  width: 350px;
  height: 220px;
  object-fit: contain;
}

.centering p {
  color: #f0f0f0;
}

body.light-mode .centering p {
  color: var(--color-text);
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
  .background-color {
    padding-top: 3.5rem;
  }

  .centering .img {
    width: 100%;
    height: 140px;
    object-fit: contain;
  }

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