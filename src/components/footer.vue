<template>
<footer>
  <div class="box">

    <div class="space-between">
      <p class="title-size">Author</p>
      <p class="text-size">{{ author }}</p>
    </div>

    <div class="space-between">
      <p class="title-size">Contact</p>
      <p class="text-size">{{ email }}</p>
      <p class="text-size">{{ phoneNumber }}</p>
    </div>

      
    <div class="space-between">
      <p class="title-size">Links</p>
      <div class="link-box">
        <a :href=links[0] target="_blank" class="text-size">Github</a>
        <a :href=links[1] target="_blank" class="text-size">LinkedIn</a>
        <a :href=links[2] target="_blank" class="text-size">Facebook</a>
      </div>
    </div>

    <div class="space-between">
      <p class="title-size">Made with</p>
      <p class="text-size">Vue, CSS and HTML</p>
    </div>
  </div>
</footer>
</template>

<script>
  export default {
    props: {
      author: String,
      links: Array,
      email: String,
      phoneNumber: String
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
  background-color: transparent;
  cursor: pointer;
}

.links a:hover {
  text-decoration: underline;
}

.link-box {
  display: flex;
}

.link-box p, .link-box a {
  margin-left: 8px;
  margin-right: 8px;
  padding: 0;
}

@media (max-width: 768px) {
  .box {
    flex-direction: column;
  }

  .space-between {
    margin: 3px;
  }

  .text-size {
    font-size: 1rem;
  }

  .title-size {
    font-size: 1.5rem;
  }
}
</style>