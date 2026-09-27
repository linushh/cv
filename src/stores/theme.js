import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'dark'
  }),

  actions: {
    init() {
      const saved = localStorage.getItem('theme')

      if (saved === 'light' || saved === 'dark') {
        this.theme = saved
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        this.theme = 'light'
      }

      this.apply()
    },

    toggle() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', this.theme)
      this.apply()
    },

    apply() {
      document.body.classList.toggle('light-mode', this.theme === 'light')
    }
  }
})
