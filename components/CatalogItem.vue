<template>
  <div class="card flex-md-row align-baseline">
    <img
      :src="item.picture"
      alt="150x150"
      class="card-img-left" >

    <div class="card-body d-flex flex-column justify-content-between">
      <p>{{ item.name }}</p>

      <p class="mb-0">Цена: {{ item.price | currencyRub }}</p>
      <div class="row">
        <div class="col-md-6">
          <button
            class="btn w-100"
            type="button"
            @click="addToCard">В корзину</button>
        </div>
        <div class="col-md-6">
          <button
            class="btn w-100"
            type="button">В желаемое</button>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'CatalogItem',
  filters: {
    currencyRub: function(value) {
      if (!value) return ''
      value = value.toString()
      value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
      return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽'
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    cardItems: []
  }),
  mounted() {
    this.cardItems = this.$store.state.card.list
  },
  methods: {
    addToCard() {
      this.$store.dispatch('card/ADD', this.item)
    }
  }
}
</script>
