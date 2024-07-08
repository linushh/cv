<template>
  <div id="app">
    <button
      @click="toggleDrawer"
      style="background-color: #717171">
      Toggle Drawer
    </button>

    <div class="drawer" :class="{ open: isDrawerOpen }">
      <ul>
        <li><a @click="$router.push('/')">Home</a></li>
        <li><a @click="$router.push('/about')">About me</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>

    <div class="content" :class="{ open: isDrawerOpen }">
      <p>This is the page content. Click the button to toggle the drawer.</p>
    </div>
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