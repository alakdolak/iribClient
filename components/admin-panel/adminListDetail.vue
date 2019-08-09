<template>
  <div class="container">
    <div v-if="news">
      <div class="meta_container">
        <!--statuts-->
        <div class="row"></div>
        <div class="status status_active" v-if="news.status">
          Status: Active
        </div>
        <div class="status status_inactive" v-else>
          Status: Inactive
        </div>
        <!--end of status-->
        <div class="active_since status_active" v-if="news.status">
          Active Since :
          <timestamp :time="news.active_since"></timestamp>
        </div>
        <div class="active_since status_active" v-if="news.status">
          points :
          {{news.news.point}}
        </div>
      </div>
      <hr>
      <h2 class="news_title">
        {{news.news.title}}
      </h2>
      <div class="text-mute mt-1">
        <span>{{news.news.point}} points</span>
      </div>
      <div class="clearfix"></div>
      <div class="description mt-4" v-html="news.news.content">
      </div>
    </div>
    <div v-else>
      <div class="text-center mt-4">
        <loader></loader>
        CHOOSE NEWS TO SHOW HERE
      </div>
    </div>
  </div>
</template>

<script>
  import loader from '~/components/shared/dotLoader'
  import timestamp from '~/components/shared/timestamp'

  export default {
    name: 'adminListDetail',
    components: {
      loader,
      timestamp
    },
    props: ['news']
  }
</script>


<style scoped>
  .meta_container {
    width: 100%;
    clear: both;
    margin-bottom: 10px;
  }

  .status {

  }

  .status_active {
    color: green;
    font-size: 1.3em;
  }

  .status_inactive {
    font-size: 1.3em;
    color: red;
  }
</style>
