<template>
  <div class="background-color">
    <div class="centering">
      <card
        :image="dotNet"
        title=".NET"
        :text="$t('skills.dotNet')"
        image-variant="logo" class="margin-between">
      </card>

      <card
        :image="mariaDb"
        title="MariaDB"
        :text="$t('skills.mariaDb')"
        image-variant="logo" class="margin-between">
      </card>
    </div>

    <div class="centering">
      <card
        :image="java"
        title="Java"
        :text="$t('skills.java')"
        image-variant="logo" class="margin-between">
      </card>

      <card
        :image="springBoot"
        title="Spring Boot"
        :text="$t('skills.springBoot')"
        image-variant="logo" class="margin-between">
      </card>
    </div>

    <div class="centering">
      <card
        :image="vue"
        title="Vue.js"
        :text="$t('skills.vue')"
        image-variant="logo" class="margin-between">
      </card>

      <card
        :image="javascript"
        title="JavaScript"
        :text="$t('skills.javascript')"
        image-variant="logo" class="margin-between">
      </card>
    </div>

    <div class="centering">
      <card
        :image="mysql"
        title="MySQL"
        :text="$t('skills.mysql')"
        image-variant="logo" class="margin-between">
      </card>

      <card
        :image="git"
        title="Git"
        :text="$t('skills.git')"
        image-variant="logo" class="margin-between">
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

.centering .img {
  width: 350px;
  height: 220px;
  object-fit: contain;
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