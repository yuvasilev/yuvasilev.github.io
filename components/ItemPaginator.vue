<template>
  <div class="pagination">
    <p 
      class="page-item" 
      @click="prevPage"><span class="page-link"> &lt; </span></p>

    <span
      v-for="item in pageCount"
      :key="item"
      :class="{ active: page === item }"
      class="page-item"
    >
      <span 
        class="page-link" 
        @click="selectPage(item)">{{ item }}</span>
    </span>

    <p @click="nextPage"><span class="page-link"> &gt; </span></p>
  </div>
</template>

<script>
export default {
  name: 'UsersPaginator',
  model: {
    prop: 'page'
  },
  props: {
    page: {
      type: Number,
      required: true
    },

    perPage: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    prevPage() {
      const pageNum = this.page - 1
      if (pageNum > 0) {
        this.selectPage(pageNum)
      }
    },
    nextPage() {
      const pageNum = this.page + 1
      if (pageNum <= this.pageCount) {
        this.selectPage(pageNum)
      }
    },

    selectPage(page) {
      this.$emit('input', page)
    }
  }
}
</script>
