<template>
  <div>
    <div class="row">
      <div
        v-for="item in filtredItems"
        :key="item.id"
        class="col-md-6 mb-4">
        <catalog-item :item="item"/>
      </div>
    </div>
    <item-paginator
      v-model.number="currentPage"
      :total="itemsCount"
      :per-page="itemsPerPage" />
  </div>
</template>

<script>
import axios from 'axios'

import CatalogItem from '@/components/CatalogItem.vue'
import ItemPaginator from '@/components/ItemPaginator.vue'

export default {
  name: 'Catalog',
  components: {
    'catalog-item': CatalogItem,
    'item-paginator': ItemPaginator
  },
  data: () => ({
    list: [],
    currentPage: 2,
    itemsPerPage: 8,
    restUrl: 'http://localhost:3000/catalog'
  }),
  computed: {
    itemsCount() {
      return this.list.length
    },

    filtredItems() {
      return this.list.filter((item, index) => {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const finalIndex = startIndex + this.itemsPerPage
        return startIndex <= index && index < finalIndex
      })
    }
  },
  mounted() {
    this.getCatalogList()
    // this.$store.dispatch('card/REMOVE', '0')
  },
  methods: {
    getCatalogList() {
      axios.get(this.restUrl).then(({ data }) => {
        this.list = data
      })
    }
  }
}
</script>
