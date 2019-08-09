<template>
  <div class="news_detail_container">

    <div class="list-group" v-if="newsList && newsList.length">
      <div v-for="item in newsList"
           v-bind:key="item.id"
           @click="select(item)"
           class="list-group-item list-group-item-action flex-column align-items-start"
           v-bind:class="{ 'border-success': item.status  , 'list-group-item-dark': selectedNews && (item.id === selectedNews.id)}">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{item.news.title}}</h5>
        </div>
        <div v-html="truncate(item.news.content , 40)">
        </div>
        <div class="my-2 text-left">
          <div class="status status_active btn btn-outline-success" @click="deactivate(item.id)"
               v-if="item.status == 1">
            Status: Active
          </div>
          <div class="status status_inactive btn btn-outline-danger" @click="activate(item.id)" v-else>
            Status: Inactive
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger text-center">
        NO NEWS FOUND FOR THIS MODULE
        <br>
        YOU CAN ADD NEWS TO THIS MODULE IN NEWS SECTION
      </div>
    </div>
  </div>
</template>

<script>
  import loader from '~/components/shared/loader'

  export default {
    name: 'adminList',
    props: ['newsList', 'selectedNews', 'module'],
    components: {
      loader
    },
    data() {
      return {
        order: 0,
        index: 0,
        notificationSystem: {
          options: {
            warning: {
              position: 'bottomLeft',
              theme: 'dark',
              overlay: false,
              layout: 2,
              backgroundColor: 'red',
              closeOnEscape: true,
              timeout: 2500,
              progressBar: false,
              progressBarColor: 'white',
              closeOnClick: true
            }
          }
        }
      }
    },
    methods: {
      truncate: function(text, length) {
        if (text.length > length)
          return text.substring(0, length) + '...'
        else
          return text
      },
      select: function(news) {
        this.$emit('changeSelectedNews', news)
      },
      activate(id) {
        let currentActiveCount = 0
        for (let i = 0; i < this.newsList.length; i++) {
          if (this.newsList[i].status)
            currentActiveCount++
        }
        if (currentActiveCount >= this.module.maxActives) {
          this.$toast.warning('Error', 'you can not activate more than ' + this.module.maxActives + ' news', this.notificationSystem.options.warning)
        } else {
          this.$axios.$post('/api/moduleNews/activate', {
            id: id
          }).then(result => {
            this.$emit('changeStatus', { type: 1, id: id, active_since: result.active_since })
          }).catch(err => {

          })
        }
      },
      deactivate(id) {
        this.$axios.$post('/api/moduleNews/deactivate', {
          id: id
        }).then(result => {
          this.$emit('changeStatus', { type: 0, id: id })
        }).catch(err => {

        })
      }
    },
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

  .status_active {
    color: green;
  }

  .status_inactive {
    color: red;
  }

  .news_detail_container {
    margin-top: 10px;
  }
</style>
