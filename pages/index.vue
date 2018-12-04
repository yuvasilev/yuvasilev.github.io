<template>
  <section class="main-container">
    <nuxt-link to="/catalog">
      Открыть список товаров
    </nuxt-link>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.main-container {
  min-height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
