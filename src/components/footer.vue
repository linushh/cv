<template>
<footer>
  <div class="box">
    <div>
      <p class="title-size">Author</p>
      <p class="text-size">Linus Håkansson</p>
    </div>
    
    <br>
    
    <div>
      <p class="title-size">Links</p>
      <p
        class="text-size classname">
        <a>Github</a>
        <a>LinkedIn</a>
        <a>Facebook</a>
      </p>
    </div>

    <br>

    <div>
      <p class="title-size">Made with</p>
      <p>Vue, CSS and HTML</p>
    </div>
  </div>
</footer>
</template>

<script>

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

.classname a {
  background-color: #444;
  cursor: pointer;
}
</style>