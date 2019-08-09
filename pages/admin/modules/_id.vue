<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-12 tab_container">
        <ul class="nav nav-tabs justify-content-center">
          <li class="nav-item">
            <div class="nav-link" :class="{active: tab}" @click="changeTab(true)">
              <i class="fa fa-database" aria-hidden="true"></i>
              MODULE NEWS
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link" :class="{active: !tab}" @click="changeTab(false)">
              <i class="fa fa-cog" aria-hidden="true"></i>
              MODULE SETTING
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="row" v-if="tab">
      <div class="col-sm-4 list_container">
        <div v-if="error">
          <div class="alert alert-danger text-center mt-4">{{error }}</div>
        </div>
        <admin-list
          v-else="newsList"
          :newsList="newsList"
          :selectedNews="selectedNews"
          :module="module"
          v-on:changeSelectedNews="changeSelectedNews"
          v-on:changeStatus="changeStatus"
        >

        </admin-list>
        <div v-else>
          <loader></loader>
        </div>
      </div>
      <div class="col-sm-8">
        <admin-list-detail :news="selectedNews"></admin-list-detail>
      </div>
    </div>

    <div class="setting_container" v-else>
      <admin-module-setting
        :module="module"
        v-on:updateModule="updateModule"
      ></admin-module-setting>
    </div>
  </div>
</template>

<script>
  import adminList from '~/components/admin-panel/adminList'
  import adminModuleSetting from '~/components/admin-panel/adminModuleSetting'
  import adminListDetail from '~/components/admin-panel/adminListDetail'
  import loader from '~/components/shared/loader'
  import lodash from 'lodash'


  export default {
    layout: 'adminPanel',
    components: {
      adminList,
      loader,
      adminListDetail,
      adminModuleSetting
    },
    data() {
      return {
        newsList: '',
        error: '',
        selectedNews: null,
        tab: true,
        module: null
      }
    },
    created: function() {
	console.log(this.$route.params.id);
      this.$axios.$get('/api/module?id=' + this.$route.params.id)
        .then(data => {
          this.module = data.module;
          this.$store.commit('setAdminTitle', data.module['name'])
        }).catch(err => {
        this.error = 'something went wrong trying to get module from the database'
      });
      this.$axios.$get('/api/moduleNews?module_id=' + this.$route.params.id)
        .then(res => {
          this.newsList = lodash.orderBy(res.moduleNews, ['status', 'active_since', 'createdAt'], ['desc', 'desc', 'desc'])
        })
        .catch(err => {
          console.log(err);
          this.error = 'something went wrong trying to get news from the database'
        })
    },
    methods: {
      changeSelectedNews: function(news) {
        this.selectedNews = news
      },
      changeTab(status) {
        this.tab = status
      },
      changeStatus(data) {
        let index = lodash.findIndex(this.newsList, { id: data.id });
        if (data.type) {
          this.newsList[index]['status'] = 1;
          this.newsList[index]['active_since'] = data.active_since

        } else {
          this.newsList[index]['status'] = 0;
          this.newsList[index]['active_since'] = ''
        }
        this.newsList = lodash.orderBy(this.newsList, ['status', 'active_since', 'createdAt'], ['desc', 'desc', 'desc'])
      },
      updateModule(newModule) {
        this.module.automatic = newModule.automatic;
        this.module.replaceMode = newModule.replaceMode;
        this.module.newsNumber = newModule.newsNumber;
        this.module.maxActives = newModule.maxActives;
        this.$store.commit('updateModule', {
          id: this.module.id,
          automatic: newModule.automatic,
          replaceMode: newModule.replaceMode,
          newsNumber: newModule.newsNumber,
          maxActives: newModule.maxActives
        })
      }
    }
  }
</script>

<style scoped>
  .list_container {
    height: 97vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .nav-item {
    cursor: pointer;
  }

  .tab_container {
    width: 100%;
    clear: both;
    margin-bottom: 20px;
    margin-top: -40px;
  }
</style>
