<template>
  <div class="news_detail_container">
    <div class="input-group input-group-sm mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Sort By</span>
      </div>
      <select class="form-control" v-model="order" @change="changeOrder">
        <option value="0" disabled selected>Choose here</option>
        <option v-for="option in options" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <div class="list-group list-group-flush">
      <div v-for="(news , index) in newsList"
           v-bind:key="news.id"
           @click="select(news)"
           v-bind:class="{ 'list-group-item-dark': selectedNews && (news.id == selectedNews.id) }"
           class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{news.title}}</h5>
          <small class="text-muted">3 days ago</small>
        </div>
        <div v-html="truncate(news.content, 130)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loader from '../../components/shared/loader'

  export default {
    name: 'adminNewsList',
    components: {
      loader
    },
    data() {
      return {
        order: 0,
        options: [
          { text: 'Date', value: '1' },
          { text: 'Title', value: '2' },
          { text: 'Points', value: '3' }
        ]
      }
    },
    methods: {
      select: function(news) {
        this.$emit('changeSelectedNews', news)
      },
      changeOrder: function() {
        this.$emit('changeOrder', this.order)
      },
      truncate: function(text, length) {
        if (text.length > length)
          return text.substring(0, length) + '...'
        else
          return text
      }
    },
    props: ['newsList', 'selectedNews'],
    filters: {
      truncate: function(text, length) {
        return text.substring(0, length) + '...'
      }
    }
  }
</script>

<style scoped>
  .list-group-item {
    cursor: pointer;
  }

</style>
