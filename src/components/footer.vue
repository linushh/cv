<template>
<footer>
  <div class="box">

    <div class="space-between">
      <p class="title-size">{{ $t('footer.author') }}</p>
      <p class="text-size">{{ author }}</p>
    </div>

    <div class="space-between">
      <p class="title-size">{{ $t('footer.contact') }}</p>
      <p class="text-size">{{ email }}</p>
      <p class="text-size">{{ phoneNumber }}</p>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  props: {
    author: String,
    email: String,
    phoneNumber: String
  }
}
</script>

<style scoped>
footer p {
  color: var(--color-text);
}

.box {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 0.5rem;
  margin-left: calc(var(--mini-drawer-width) + 0.5rem);
}

.text-size {
  font-size: 0.7rem;
}

.title-size {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .box {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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