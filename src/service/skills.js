import dotNet from '@/assets/iconsMySkills/dotNet.png'
import mariaDb from '@/assets/iconsMySkills/mariaDb.png'
import java from '@/assets/iconsMySkills/java.png'
import springBoot from '@/assets/iconsMySkills/spring-boot.png'
import vue from '@/assets/iconsMySkills/vue-js.png'
import javascript from '@/assets/iconsMySkills/javascript.png'
import mysql from '@/assets/iconsMySkills/mysql.png'
import git from '@/assets/iconsMySkills/git.png'

const skills = [
  {
    id: 'dotNet',
    title: '.NET',
    textKey: 'skills.dotNet',
    image: dotNet
  },
  {
    id: 'mariaDb',
    title: 'MariaDB',
    textKey: 'skills.mariaDb',
    image: mariaDb
  },
  {
    id: 'java',
    title: 'Java',
    textKey: 'skills.java',
    image: java
  },
  {
    id: 'springBoot',
    title: 'Spring Boot',
    textKey: 'skills.springBoot',
    image: springBoot
  },
  {
    id: 'vue',
    title: 'Vue.js',
    textKey: 'skills.vue',
    image: vue
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    textKey: 'skills.javascript',
    image: javascript
  },
  {
    id: 'mysql',
    title: 'MySQL',
    textKey: 'skills.mysql',
    image: mysql
  },
  {
    id: 'git',
    title: 'Git',
    textKey: 'skills.git',
    image: git
  }
]

function getSkills() {
  return skills
}

export default {
  getSkills
}
