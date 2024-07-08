<template>
  <div id="app">
    <button
      @click="toggleDrawer"
      @blur.stop.prevent="toggleDrawer" 
      class="drawer-color">
        <div class="burger-menu"></div>
        <div class="burger-menu"></div>
        <div class="burger-menu"></div>
    </button>

    <div class="drawer" :class="{ open: isDrawerOpen }">
      <ul>
        <li><a @click="$router.push('/')">Home</a></li>
        <li><a @click="$router.push('/about')">About me</a></li>
        <li><a href="https://github.com/linushh">Github</a></li>
        <li><a href="https://www.facebook.com/linus.hakansson.98478">Facebook</a></li>
        <li><a href="https://www.linkedin.com/in/linus-hakansson-8b2b0b1a6/">LinkedIn</a></li>
      </ul>
    </div>

    <!-- <div class="content" :class="{ open: isDrawerOpen }">
      <p>This is the page content. Click the button to toggle the drawer.</p>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDrawerOpen: false,
    };
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  },
};
</script>

<style>
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
  padding: 1rem;
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
}
</style>