<template>
  <div class="language-switcher">
    <button
      v-for="language in languages"
      :key="language.code"
      class="language-button"
      :class="{ active: language.code === currentLocale }"
      :title="language.label"
      :aria-label="language.label"
      @click="setLocale(language.code)">
        <img class="flag" :src="flags[language.code]" :alt="language.label">
    </button>
  </div>
</template>

<script>
import { languages, setLocale } from '@/i18n'

import britishFlag from 'flag-icons/flags/4x3/gb.svg'
import swedishFlag from 'flag-icons/flags/4x3/se.svg'
import frenchFlag from 'flag-icons/flags/4x3/fr.svg'
import germanFlag from 'flag-icons/flags/4x3/de.svg'

const flags = {
  en: britishFlag,
  sv: swedishFlag,
  fr: frenchFlag,
  de: germanFlag
}

export default {
  data() {
    return {
      languages,
      flags
    }
  },

  computed: {
    currentLocale() {
      return this.$i18n.locale
    }
  },

  methods: {
    setLocale
  }
}
</script>

<style scoped>
.language-switcher {
  display: flex;
}

.language-button {
  background-color: var(--color-surface-alt);
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.5rem;
  margin-left: 0.25rem;
  cursor: pointer;
}

.language-button:hover {
  background-color: var(--color-surface-hover);
}

.language-button.active {
  background-color: hsla(160, 100%, 37%, 1);
}

.flag {
  display: block;
  width: 1.4rem;
  aspect-ratio: 4 / 3;
  border-radius: 2px;
}
</style>
