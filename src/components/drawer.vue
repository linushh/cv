<template>
  <div id="app" class="position-absolute">
    <div class="content" :class="{ open: isDrawerOpen }">
      <i v-if="isDrawerOpen" @click="toggleDrawer" class="fa-solid fa-circle-xmark fa-xl pointer icon" />
    </div>

    <button
      v-if="!isDrawerOpen"
      @click="toggleDrawer"
      class="drawer-color box-shadow pointer move-burger-menu">
        <div class="burger-menu"></div>
        <div class="burger-menu"></div>
        <div class="burger-menu"></div>
    </button>


    <div class="drawer" :class="{ open: isDrawerOpen }">
      <ul>
        <li @click="pushEvent('')">
          <a>
            Home
          </a>
        </li>
        
        <li @click="pushEvent('skills')">
          <a>
            My Skills
          </a>
        </li>
        
        <li @click="pushEvent('projects')">
          <a>
            Projects
          </a>
        </li>

        <li @click="pushEvent('experience')">
          <a>
            Experience
          </a>
        </li>
        
        <li>
          <a 
            :href=links[0]
            target="_blank">
              Github
          </a>
        </li>
        
        <li>
          <a 
            :href=links[1]
            target="_blank">
              LinkedIn
          </a>
        </li>
        
        <li>
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
      isDrawerOpen: false
    }
  },

  methods: {
    toggleDrawer() {
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

.box-shadow:hover {
  box-shadow: 0 8px 16px 0 #3a4042;
}

.burger-menu {
  width: 35px;
  height: 5px;
  background-color: rgb(28, 28, 28);
  margin: 6px 0;
  border-radius: 5px;
}

.icon {
  margin-left: 0.5rem; 
  margin-top: 1.5rem;
}

.icon:hover {
  color: #ccc;
}

.drawer-color {
  flex-direction: column;
  background-color: #444444;
  margin: 10px;
  border-radius: 5px;
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
}

.drawer.open {
  left: 0; /* Drawer slides in */
}

.content {
  transition: margin-left 0.3s ease;
}

.content.open {
  margin-left: 250px; /* Content moves to the right when drawer opens */
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

@media (max-width: 768px) {
  .content.open {
    margin-left: 210px; /* Content moves to the right when drawer opens */
  }

  .icon {
    margin-left: 30px;
    margin-top: 0;
  }

  .move-burger-menu {
    position: fixed;
    top: 0;
    left: 0;
    margin: 1px;
  }

  .burger-menu {
    width: 20px; /* Reduce the width of the bars */
    height: 3px; /* Reduce the height of the bars */
    margin: 3px 0;
  }
}
</style>