<template>
  <header class="navbar">
    <RouterLink to="/" class="brand">{{ socials.name }}</RouterLink>

    <div class="bar-tools">
      <a
        v-for="social in socialLinks"
        :key="social.title"
        :href="social.href"
        target="_blank"
        :title="social.title"
        class="social-icon">
        <i :class="social.icon"></i>
      </a>

      <languageSwitcher />
      <themeToggle />
    </div>

    <button
      class="burger"
      :title="$t('nav.menu')"
      :aria-label="$t('nav.menu')"
      :aria-expanded="isMenuOpen"
      @click="toggleMenu">
        <i class="fa-solid" :class="isMenuOpen ? 'fa-xmark' : 'fa-bars'"></i>
    </button>

    <Transition name="menu">
      <div v-if="isMenuOpen" class="menu">
        <navLinks :items="items" vertical />

        <div class="menu-divider"></div>

        <a
          v-for="social in socialLinks"
          :key="social.title"
          :href="social.href"
          target="_blank"
          class="menu-social">
          {{ social.title }}
        </a>

        <div class="menu-divider"></div>

        <div class="menu-controls">
          <languageSwitcher />
          <themeToggle />
        </div>
      </div>
    </Transition>

    <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>
  </header>
</template>

<script>
import languageSwitcher from '@/components/languageSwitcher.vue'
import themeToggle from '@/components/themeToggle.vue'
import navLinks from '@/components/navLinks.vue'

export default {
  components: {
    languageSwitcher,
    themeToggle,
    navLinks
  },

  props: {
    socials: {
      type: Object,
      default: () => ({})
    },

    items: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isMenuOpen: false
    }
  },

  computed: {
    socialLinks() {
      return [
        { title: 'Github', href: this.socials.github, icon: 'fa-brands fa-github' },
        { title: 'LinkedIn', href: this.socials.linkedIn, icon: 'fa-brands fa-linkedin' },
        { title: 'Facebook', href: this.socials.facebook, icon: 'fa-brands fa-facebook' }
      ]
    }
  },

  mounted() {
    window.addEventListener('keydown', this.onKeydown)
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
  },

  watch: {
    $route() {
      this.closeMenu()
    }
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },

    closeMenu() {
      this.isMenuOpen = false
    },

    onKeydown(event) {
      if (event.key === 'Escape') {
        this.closeMenu()
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-rail);
  z-index: 2;
}

.brand {
  padding: 0.3rem 0.4rem;
  border-radius: 6px;
  color: var(--color-on-surface);
  font-weight: 600;
  background-color: transparent;
  white-space: nowrap;
}

.brand:hover {
  background-color: var(--color-surface-hover);
}

.bar-tools {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: 5px;
  background-color: var(--color-surface-alt);
  color: var(--color-on-surface);
}

.social-icon:hover {
  background-color: var(--color-surface-hover);
}

.burger {
  position: relative;
  z-index: 2;
  display: none;
  padding: 0.45rem 0.7rem;
  border: none;
  border-radius: 5px;
  background-color: var(--color-surface-alt);
  color: var(--color-on-surface);
  font-size: 1.1rem;
  cursor: pointer;
}

.burger:hover {
  background-color: var(--color-surface-hover);
}

.menu {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-rail);
  z-index: 2;
}

.menu-divider {
  margin: 0.5rem 0;
  border-top: 1px solid var(--color-surface-hover);
}

.menu-social {
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  color: var(--color-text);
  background-color: transparent;
}

.menu-social:hover {
  color: var(--color-on-surface);
  background-color: var(--color-surface-hover);
}

.menu-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (min-width: 769px) {
  .menu {
    display: none;
  }
}

@media (max-width: 768px) {
  .bar-tools {
    display: none;
  }

  .burger {
    display: block;
  }
}
</style>
