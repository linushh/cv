<template>
<footer class="bottom-position">
  <div class="box">
    <div>
      <p class="title-size">Author</p>
      <p class="text-size">{{ author }}</p>
    </div>
    
    <div class="link-box">
      <p class="title-size">Links</p>

      <div class="links">
        <a :href=links[0] target="_blank" class="text-size">Github</a>
        <a :href=links[1] target="_blank" class="text-size">LinkedIn</a>
        <a :href=links[2] target="_blank" class="text-size">Facebook</a>
      </div>
    </div>

    <div>
      <p class="title-size">Made with</p>
      <p>Vue, CSS and HTML</p>
    </div>
  </div>
</footer>
</template>

<script>
  export default {
    props: {
      author: String,
      links: Array
    },

    data() {
      return {

      }
    }
  }
</script>

<style>
.box {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
}

.text-size {
  font-size: 0.7rem;
}

.title-size {
  font-size: 1.2rem;
}

.links a {
  background-color: #444;
  cursor: pointer;
}

.links a:hover {
  text-decoration: underline;
}

.link-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link-box p, .link-box a {
  margin-left: 8px;
  margin-right: 8px;
  padding: 0;
}

.links {
  display: flex;
}

.bottom-position {
  position: fixed;
  bottom: 0; 
  height: auto; 
  width: 100%;
  background-color: #444;
}
</style>