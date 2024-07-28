<template>
<footer>
  <div class="box">

    <div>
      <p class="title-size">Author</p>
      <p class="text-size">Linus Håkansson</p>
    </div>
    
    <div class="link-box">
      <p class="title-size">Links</p>

      <div class="links">
        <a href="https://github.com/linushh"target="_blank" class="text-size">Github</a>

        <a href="https://www.linkedin.com/in/linus-h%C3%A5kansson-4584ab251?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGPilcz5JRvGutro67CmQ0A%3D%3D" target="_blank" class="text-size">LinkedIn</a>

        <a href="https://www.facebook.com/linus.hakansson.98478" target="_blank" class="text-size">Facebook</a>
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
</style>