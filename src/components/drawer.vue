<template>
  <div id="app" class="position-absolute">
    <nav class="mini-drawer" @mouseenter="openDrawer">
      <ul>
        <li class="pointer" :title="$t('nav.home')" @click="pushEvent('')">
          <i class="fa-solid fa-house"></i>
        </li>

        <li class="pointer" :title="$t('nav.skills')" @click="pushEvent('skills')">
          <i class="fa-solid fa-gears"></i>
        </li>

        <li class="pointer" :title="$t('nav.projects')" @click="pushEvent('projects')">
          <i class="fa-solid fa-folder-open"></i>
        </li>

        <li class="pointer" :title="$t('nav.experience')" @click="pushEvent('experience')">
          <i class="fa-solid fa-briefcase"></i>
        </li>

        <li>
          <a :href="links[0]" target="_blank" title="Github">
            <i class="fa-brands fa-github"></i>
          </a>
        </li>

        <li>
          <a :href="links[1]" target="_blank" title="LinkedIn">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </li>

        <li>
          <a :href="links[2]" target="_blank" title="Facebook">
            <i class="fa-brands fa-facebook"></i>
          </a>
        </li>
      </ul>
    </nav>

    <div
      v-if="isDrawerOpen"
      class="overlay"
      @click="toggleDrawer">
    </div>

    <div
      class="drawer"
      :class="{ open: isDrawerOpen }"
      @mouseleave="scheduleClose">
      <ul>
        <li @click="pushEvent('')">
          <a>
            {{ $t('nav.home') }}
          </a>
        </li>

        <li @click="pushEvent('skills')">
          <a>
            {{ $t('nav.skills') }}
          </a>
        </li>

        <li @click="pushEvent('projects')">
          <a>
            {{ $t('nav.projects') }}
          </a>
        </li>

        <li @click="pushEvent('experience')">
          <a>
            {{ $t('nav.experience') }}
          </a>
        </li>

        <li class="drawer-divider"></li>

        <li class="socials-link">
          <a
            :href=links[0]
            target="_blank">
              Github
          </a>
        </li>

        <li class="socials-link">
          <a
            :href=links[1]
            target="_blank">
              LinkedIn
          </a>
        </li>

        <li class="socials-link">
          <a
            :href=links[2]
            target="_blank">
              Facebook
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    links: Array
  },

  data() {
    return {
      isDrawerOpen: false,
      closeTimer: null
    }
  },

  methods: {
    openDrawer() {
      clearTimeout(this.closeTimer)
      this.isDrawerOpen = true
    },

    scheduleClose() {
      clearTimeout(this.closeTimer)
      this.closeTimer = setTimeout(() => {
        this.isDrawerOpen = false
      }, 300)
    },

    toggleDrawer() {
      clearTimeout(this.closeTimer)
      this.isDrawerOpen = !this.isDrawerOpen
    },

    pushEvent(name) {
      this.$router.push('/' + name)
    }
  },

  watch: {
    $route() {
      this.isDrawerOpen = false
    }
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
}

.position-absolute {
  position: fixed;
  top: 0;
}

.mini-drawer {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--mini-drawer-width);
  background-color: #333;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.mini-drawer li {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  margin: 0;
  border: none;
  border-radius: 0;
  float: none;
}

.mini-drawer li:hover {
  background-color: #555;
}

.mini-drawer a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  padding: 0;
  background-color: transparent;
}

.mini-drawer i {
  color: white;
  font-size: 1rem;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
}

.drawer {
  width: 250px;
  position: fixed;
  left: -250px; /* Drawer is hidden off-screen by default */
  top: 0;
  bottom: 0;
  background-color: #333;
  overflow-x: hidden;
  transition: left 0.3s ease;
  color: white;
  padding: 1rem;
  z-index: 2;
}

.drawer.open {
  left: 0; /* Drawer slides in */
}

ul {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
}

li a {
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 8px;
}

li a:hover {
  background-color: #555;
  cursor: pointer;
}

.drawer-divider {
  margin: 0.75rem 0;
  border-top: 1px solid #555;
}

.socials-link a:hover {
  background-color: transparent;
}
</style>