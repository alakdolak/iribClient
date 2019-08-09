<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-10">
        <ul class="nav nav-tabs justify-content-center">
          <li class="nav-item">
            <div class="nav-link" :class="{active: selectedTab === 0}" @click="changeTab(0)">All</div>
          </li>
          <li class="nav-item">
            <div class="nav-link" :class="{active: selectedTab === 1}" @click="changeTab(1)">New</div>
          </li>
          <li class="nav-item">
            <div class="nav-link" :class="{active: selectedTab === 2}" @click="changeTab(2)">Approved</div>
          </li>
          <li class="nav-item">
            <div class="nav-link" :class="{active: selectedTab === 3}" @click="changeTab(3)">Moderated</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-sm-10">
        <div class="alert alert-danger text-center" v-if="error">
          {{error}}
        </div>
        <div class="table-responsive">
          <h4 class="mb-3">{{table_name}} Comments</h4>
          <table class="table table-hover text-center">
            <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>News</th>
              <th>Comment</th>
              <th>Current Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(comment, index) in comments" :key="comment.id">
              <td>{{index + 1}}</td>
              <td>{{comment.ugc.name}}</td>
              <nuxt-link :to="{name: 'details-id' , params: {id: comment.news.id} }">
                <td class="news_link">
                  {{comment.news.title}}
                </td>
              </nuxt-link>
              <td>{{truncate(comment.comment , 40)}}</td>
              <td>{{translate_status(comment.status)}}</td>
              <td>
                <button class="btn btn-sm btn-info" @click="selectRow(comment)">Details</button>
                <button class="btn btn-sm btn-success" @click="approve_comment(comment.id)">Approve</button>
                <button class="btn btn-sm btn-danger" @click="moderate_comment(comment.id)">Moderate</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <comments-modal
      v-on:approve_comment="approve_comment"
      v-on:moderate_comment="moderate_comment"
      :selectedComment="selectedComment"></comments-modal>
  </div>
</template>


<script>
  import commentsModal from '~/components/admin-panel/commentsModal'
  import lodash from 'lodash'

  export default {
    name: 'adminComments',
    layout: 'adminPanel',
    components: { commentsModal },
    data() {
      return {
        all_comments: [],
        comments: [],
        selectedTab: 0,
        error: '',
        table_name: 'All',
        selectedComment: null
      }
    },
    created() {
      this.$store.commit('setAdminTitle', 'Comments')
      this.$axios.$get('/api/comments')
        .then(data => {
          this.all_comments = data.comments
          this.filter_comments()
          this.selectedComment = data.comments[0]
        }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      filter_comments() {
        switch (this.selectedTab) {
          case 0:
            this.comments = this.all_comments
            break
          case 1:
            this.comments = lodash.filter(this.all_comments, function(o) {
              return !o.status
            })
            break
          case 2:
            this.comments = lodash.filter(this.all_comments, function(o) {
              return o.status === 1
            })
            break
          case 3:
            this.comments = lodash.filter(this.all_comments, function(o) {
              return o.status === 2
            })
            break
        }
      },
      selectRow(comment) {
        this.selectedComment = comment
        this.$root.$emit('bv::show::modal', 'commentsModal')

      },
      approve_comment(comment_id) {
        this.$axios.post('/api/comments/status', {
          comment_id: comment_id,
          status: 1
        }).then(data => {
          let index = lodash.findIndex(this.all_comments, { id: data.data.comment.id })
          this.all_comments[index].status = 1
          this.filter_comments()
        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to approve the comment'
        })
      },
      moderate_comment(comment_id) {
        this.$axios.post('/api/comments/status', {
          comment_id: comment_id,
          status: 2
        }).then(data => {
          let index = lodash.findIndex(this.all_comments, { id: data.data.comment.id })
          this.all_comments[index].status = 2
          this.filter_comments()
        }).catch(err => {
          console.log(err)
          this.error = 'something went wrong trying to moderate the comment'
        })
      },
      changeTab(tab) {
        this.selectedTab = tab
        switch (tab) {
          case 0:
            this.table_name = 'All'
            break
          case 1:
            this.table_name = 'New'
            break
          case 2:
            this.table_name = 'Approved'
            break
          case 3:
            this.table_name = 'Moderated'
            break
        }
        this.filter_comments()
      },
      translate_status(status) {
        switch (status) {
          case 0 :
            return 'New'
            break
          case 1:
            return 'Approved'
            break
          case 2:
            return 'Moderated'
            break
        }
      },
      truncate: function(text, length) {
        if (text.length > length)
          return text.substring(0, length) + '...'
        else
          return text
      }
    }
  }
</script>


<style scoped>
  .nav-link {
    cursor: pointer;
  }

  .news_link {
    text-decoration: underline;
    color: blue;
  }

  tr:hover {
    cursor: pointer;
  }
</style>
