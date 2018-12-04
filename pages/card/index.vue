<template>
  <div>
    <div
      v-if="catalogLength"
      class="row">
      <div
        v-for="(item, i) in list"
        :key="item.id"
        class="col-12 mb-4 d-flex justify-content-between align-items-center">
        <span>{{ i }}. {{ item.name }}.</span>


        <div class="d-flex align-items-center">
          <div class="counter">
            <span @click="reduceCount(item.id)">-</span>
            <input
              v-model="item.count"
              min="1"
              max="10000"
              type="number"
              @keydown.38.prevent="addToCard(item)"
              @keydown.40.prevent="reduceCount(item.id)">
            <span @click="addToCard(item)">+</span>
          </div>

          <span class="price">
            {{ item.price * item.count | currencyRub }}
          </span>

          <span
            class="ml-2"
            style="cursor:pointer; font-size: 20px;"
            @click="removeFromCard(item.id)"
          >&times;</span>
        </div>

      </div>
      <div class="text-right pr-4 w-100">
        Итого {{ totalPrice | currencyRub }}
      </div>

      <div>
        <h5>Пожалуйста, введите свои данные</h5>

        <user-form v-model="user">
          <slot>
            <button
              type="button"
              class="btn btn-success"
              @click="sendOrder">
              Оформить заказ
            </button>
          </slot>
        </user-form>
      </div>
      <pre v-if="sendObj"> {{ sendObj }}  </pre>

    </div>
    <div v-else>
      В корзине нет товаров.
      <nuxt-link to="/catalog">Перейти в каталог</nuxt-link>
    </div>
  </div>

</template>

<script>
import CatatlogItem from '@/components/CatalogItem.vue'
import UserForm from '@/components/UserForm.vue'

export default {
  name: 'Index',
  filters: {
    currencyRub: function(value) {
      if (!value) return ''
      value = value.toString()
      value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
      return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽'
    }
  },
  components: {
    'catalog-item': CatatlogItem,
    'user-form': UserForm
  },
  data: () => ({
    list: [],
    user: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      address: '',
      comment: ''
    },
    sendObj: null
  }),
  computed: {
    catalogLength() {
      return this.list.length
    },
    totalPrice() {
      let count = 0
      if (this.catalogLength !== 0) {
        this.list.forEach(item => {
          count += item.price * item.count
        })
      }
      return count
    }
  },
  mounted() {
    this.list = this.$store.state.card.list
  },
  methods: {
    addToCard(item) {
      this.$store.dispatch('card/ADD', item)
    },
    reduceCount(itemId) {
      this.$store.dispatch('card/REDUCE_COUNT', itemId)
    },
    removeFromCard(itemId) {
      this.$store.dispatch('card/REMOVE', itemId)
      this.list = this.$store.state.card.list
    },
    sendOrder() {
      this.$validator.validateAll()
      if (this.errors.any()) {
        // eslint-disable-next-line
        alert('Не все поля заполнены корректно!')
        return
      } else {
        this.sendObj = Object.assign({}, this.user)
        this.sendObj.cardItems = Object.assign([], this.list)
        this.sendObj.totalPrice = this.totalPrice

        this.sendObj = JSON.stringify(this.sendObj)
      }
    }
  }
}
</script>

<style>
.counter input {
  width: 40px;
}
.counter input::-webkit-outer-spin-button,
.counter input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
.counter span {
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
}

.price {
  width: 100px;
  text-align: right;
}
</style>
