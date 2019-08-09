<template>
  <div class="container">
    <div v-if="news">
      <div class="row">
        <div class="col-sm-6 float-left">
          <h2 class="news_title">
            {{news.title}}
          </h2>
          <div class="text-mute">
            <span>{{news.point}} points</span>
          </div>
        </div>
        <div class="col-sm-6 float-left">
          <div class="float-right">
            <b-btn class="btn btn-primary btn-lg" v-b-modal.send_modal>Send to Module</b-btn>
            <b-btn class="btn btn-danger btn-lg" v-b-modal.reject_modal>Reject Modal</b-btn>
          </div>
          <b-modal ref="send_modal" id="send_modal" hide-footer title="Send to Module">
            <div class="form-group">
              <div>
                <label class="typo__label">Modules</label>
                <multiselect v-model="values"
                             tag-placeholder="Add this as new tag"
                             placeholder="Search or add a tag"
                             label="name"
                             track-by="id"
                             :options="modules"
                             :multiple="true"
                             :taggable="true"
                             class="input-lg"
                ></multiselect>
              </div>
            </div>
            <div class="form-group mt-4">
              <button class="btn btn-block btn-outline-secondary" @click="addModuleNews">Send to Modules</button>
            </div>
          </b-modal>
          <b-modal ref="reject_modal" id="reject_modal" hide-footer title="Reject News">
            <div class="form-group">
              <label for="">Description :</label>
              <textarea class="form-control" v-model="reject_description" cols="10" rows="5" placeholder="enter your description here"></textarea>
            </div>
            <div class="form-group mt-4">
              <button class="btn btn-block btn-outline-danger" @click="addModuleNews">Reject</button>
            </div>
          </b-modal>
        </div>
      </div>
      <div class="clearfix"></div>
      <div v-html="news.content" class="description mt-4">
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
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'adminNewsDetail',
    components: {
      loader,
      Multiselect

    },
    props: ['news'],
    data() {
      return {
        values: [],
        error: '',
        reject_description: ''
      }
    },
    computed: {
      modules() {
        return this.$store.state.modules
      }
    },
    methods: {
      addModuleNews() {
        for (let i = 0; i < this.values.length; i++) {
          this.$axios.post('/api/moduleNews/add', {
            module_id: this.values[i].id,
            news_id: this.news.id
          }).then(result => {
            this.$emit('changeStatus', { id: this.news.id, status: 3 })
          }).catch(err => {
            this.error = 'something went wrong trying to add news to the module'
          })
        }
        this.$refs.send_modal.hide()
        this.values = []
      },
      addTag(newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.values.push(tag)
      }
    }
  }
</script>

<style scoped>
  .btn-select {
    width: 100% !important;
    height: 40px;
  }
</style>
