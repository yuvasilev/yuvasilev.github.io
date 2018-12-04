<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <nuxt-link
        class="navbar-brand"
        to="/">Vue</nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"/>
      </button>
      <div
        id="navbarCollapse"
        class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <nuxt-link
            tag="li"
            class="nav-item"
            to="/"
            active-class="active"
            exact>
            <a class="nav-link">Главная</a>
          </nuxt-link>
          <nuxt-link
            tag="li"
            class="nav-item"
            to="/catalog"
            active-class="active">
            <a class="nav-link">Список товаров</a>
          </nuxt-link>
          <nuxt-link
            tag="li"
            class="nav-item"
            to="/card"
            active-class="active">
            <a class="nav-link">Корзина ({{ priceTotal | currencyRub }})</a>
          </nuxt-link>
        </ul>
      </div>
    </nav>

    <main
      role="main"
      class="container">
      <nuxt/>
    </main>

  </div>

</template>


<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutDefault',
  filters: {
    currencyRub: function(value) {
      if (!value) return ''
      value = value.toString()
      value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
      return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽'
    }
  },
  computed: {
    ...mapGetters('card', ['priceTotal'])
  }
}
</script>


<style>
#app {
  margin-top: 80px;
}
</style>
