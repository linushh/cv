<template>
  <div class="background-color">
    <div class="container margin">
      <card :image="image" :name="getCardText()" :title="socials.name" class="pre-formatted" />
    </div>
  </div>
</template>

<script>
const social = socials.getSocials()

import selfie from '@/assets/selfie.jpg'
import socials from '@/service/socials.js'

import aboutMe from './skillsView.vue'
import card from '../components/card.vue'

export default {
  components: {
    aboutMe,
    card
  },

  data() {
    return {
      image: selfie,
      socials: social
    }
  },

  methods: {
    getCardText() {
      const text = `Hi!
My name is Linus Håkansson and I am a passionate web developer with a love for creating and exploring.
When I am not working on building websites, you will often find me at the gym or in some sports venue.

My journey in IT began when I was 14-15 years old and built my first computer at home together with my brother. Since then, I have been hooked and love diving into new technologies and solving problems.

I have worked on several projects that have helped me grow both professionally and personally.

Besides computers, technology, and sports, I am also a big nature lover. I enjoy spending time outdoors. These experiences help me stay inspired and creative.

I created this website to share my projects, my thoughts, and to give you a better picture of who I am as a person.
I hope you find something interesting here and do not hesitate to contact me if you want to know more or just say hi!`
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
  margin: 1rem;
}

.pre-formatted {
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .margin {
    margin: 3rem;
  }
}
</style>