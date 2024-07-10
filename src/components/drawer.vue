<template>
  <div id="app" class="position-absolute">

    <div class="content" :class="{ open: isDrawerOpen }">
      <button
        v-if="isDrawerOpen" 
        @click="toggleDrawer" 
        class="drawer-color box-shadow pointer">
          X
      </button>
    </div>

    <button
      v-if="!isDrawerOpen"
      @click="toggleDrawer"
      class="drawer-color box-shadow pointer move-burger-menu" >
        <div class="burger-menu"></div>
        <div class="burger-menu"></div>
        <div class="burger-menu"></div>
    </button>

    <div class="drawer" :class="{ open: isDrawerOpen }">
      <ul>
        
        <li @click="$router.push('/')">
          <a>
            Home
          </a>
        </li>
        
        <li @click="$router.push('/contact')">
          <a>
            Contact
          </a>
        </li>
        
        <li @click="$router.push('/projects')">
          <a>
            Projects
          </a>
        </li>
        
        <li>
          <a 
            href="https://github.com/linushh" 
            target="_blank">
              Github
          </a>
        </li>
        
        <li>
          <a 
            href="https://www.facebook.com/linus.hakansson.98478" 
            target="_blank">
              Facebook
          </a>
        </li>
        
        <li>
          <a 
            href="https://www.linkedin.com/in/linus-h%C3%A5kansson-4584ab251?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGPilcz5JRvGutro67CmQ0A%3D%3D" 
            target="_blank">
              LinkedIn
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDrawerOpen: false
    }
  },

  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    }
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
}
.position-absolute {
  position: absolute;
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