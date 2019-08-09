<template>
  <div title="News List">
    <div class="row">
      <div class="col-sm-4 news_list_container">
        <div v-if="error">
          <div class="alert alert-danger text-center mt-4">{{error }}</div>
        </div>
        <AdminNewsList
          v-else-if="newsList"
          :newsList="newsList"
          :selectedNews="selectedNews"
          v-on:changeSelectedNews="changeSelectedNews"
          v-on:changeOrder="changeOrder">
        </AdminNewsList>
        <div v-else>
          <loader></loader>
        </div>
      </div>
      <div class="col-sm-8">
        <admin-news-detail :news="selectedNews" v-on:changeStatus="changeStatus"></admin-news-detail>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminNewsList from '../../components/admin-panel/adminNewsList'
  import AdminNewsDetail from '../../components/admin-panel/adminNewsDetail'
  import loader from '../../components/shared/loader'
  import lodash from 'lodash'

  export default {
    layout: 'adminPanel',
    name: 'adminPanelNews',
    data() {
      return {
        selectedNews: null,
        error: '',
        newsList: []
      }
    },
    created: function() {
      this.$store.commit('setAdminTitle', 'News List')
      this.$axios.$get('/api/news')
        .then(res => {
          this.newsList = res.news
          this.error = ''
        })
        .catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to get news from database'
        })
    },
    methods: {
      changeSelectedNews: function(news) {
        // console.log(news)
        this.selectedNews = news
      },
      changeStatus(data) {
        let id = data.id;
        let status = data.status;
        let index = lodash.findIndex(this.newsList , {id: id});
        this.newsList[index].status = status
        this.filterNews()
      },
      changeOrder(order) {
        switch (order) {
          case '1':
            this.newsList = lodash.orderBy(this.newsList, 'createdAt', 'desc')
            break
          case '2':
            this.newsList = lodash.orderBy(this.newsList, 'title', 'desc')
            break
          case '3':
            this.newsList = lodash.orderBy(this.newsList, 'point', 'desc')
            break
          default:
            console.log('here')
            break
        }
      },
      filterNews() {
        this.newsList = lodash.filter(this.newsList , {status: 2})
      }
    },
    components: {
      AdminNewsList,
      AdminNewsDetail,
      loader
    }
  }
</script>

<style scoped>
  .news_list_container {
    height: 97vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
