<template>
  <div class="sidebar-root">
    <button
      class="burger"
      :title="$t('nav.menu')"
      :aria-label="$t('nav.menu')"
      :aria-expanded="isExpanded"
      @click="toggle">
        <i class="fa-solid" :class="isExpanded ? 'fa-xmark' : 'fa-bars'"></i>
    </button>

    <div v-if="isExpanded" class="overlay" @click="collapse"></div>

    <nav class="sidebar" :class="{ expanded: isExpanded }">
      <ul>
        <li
          v-for="item in items"
          :key="item.path"
          :class="{ active: isActive(item.path) }">
          <button
            class="icon"
            :title="$t(item.labelKey)"
            :aria-label="$t(item.labelKey)"
            :aria-expanded="isExpanded"
            @click="toggle">
              <i :class="item.icon"></i>
          </button>

          <RouterLink class="label" :to="item.path">
            {{ $t(item.labelKey) }}
          </RouterLink>
        </li>

        <li class="divider"></li>

        <li v-for="social in socialLinks" :key="social.title">
          <button
            class="icon"
            :title="social.title"
            :aria-label="social.title"
            :aria-expanded="isExpanded"
            @click="toggle">
              <i :class="social.icon"></i>
          </button>

          <a class="label" :href="social.href" target="_blank">
            {{ social.title }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
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
      isExpanded: false
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
      this.collapse()
    }
  },

  methods: {
    isActive(path) {
      return this.$route.path === path
    },

    toggle() {
      this.isExpanded = !this.isExpanded
    },

    collapse() {
      this.isExpanded = false
    },

    onKeydown(event) {
      if (event.key === 'Escape') {
        this.collapse()
      }
    }
  }
}
</script>

<style scoped>
.sidebar-root {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
}

.burger {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 3;
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

.overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: var(--sidebar-width);
  overflow: hidden;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-rail);
  transition: width 0.25s ease;
}

.sidebar.expanded {
  width: var(--sidebar-expanded-width);
}

.sidebar ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar li {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 42px;
  float: none;
  margin: 0;
  border: none;
  border-radius: 0;
}

.sidebar li:hover,
.sidebar li.active {
  background-color: var(--color-surface-hover);
}

.sidebar li.divider {
  height: 1px;
  margin: 0.5rem 0;
  background-color: var(--color-surface-hover);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 var(--sidebar-width);
  height: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--color-icon-muted);
  font-size: 1rem;
  cursor: pointer;
}

.sidebar li:hover .icon {
  color: var(--color-on-surface);
}

.label {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 0 0.75rem 0 0.25rem;
  border-radius: 0;
  color: var(--color-on-surface);
  background-color: transparent;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-6px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.label:hover {
  color: var(--color-on-surface);
  background-color: transparent;
}

.sidebar.expanded .label {
  opacity: 1;
  visibility: visible;
  transform: none;
}

@media (max-width: 768px) {
  .burger {
    display: block;
  }

  .sidebar {
    left: calc(-1 * var(--sidebar-expanded-width));
    width: var(--sidebar-expanded-width);
    transition: left 0.3s ease;
  }

  .sidebar.expanded {
    left: 0;
  }

  .sidebar ul {
    padding-top: 3.25rem;
  }
}
</style>
