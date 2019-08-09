<template>
  <div v-if="selectedComment">
    <b-modal id="commentsModal" ref="commentsModal" title="Comment Details" hide-footer>
      {{selectedComment.comment}}
      <div class="row mt-4">
        <div class="col-sm-4">
          <nuxt-link :to="{name: 'details-id' , params: {id: selectedComment.news.id} }" target="_blank">
            <button class="btn btn-block btn-outline-info">Go to News</button>
          </nuxt-link>
        </div>
        <div class="col-sm-4">
          <button class="btn btn-block" :class="[selectedComment.status === 1 ? 'btn-primary' : 'btn-outline-primary']"
                  @click="approve_comment">
            Approve
          </button>
        </div>
        <div class="col-sm-4">
          <button class="btn btn-block" :class="[selectedComment.status === 2 ? 'btn-danger' : 'btn-outline-danger']"
                  @click="moderate_comment">
            Moderate
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'commentsModal',
    props: ['selectedComment'],
    methods: {
      moderate_comment() {
        this.$emit('moderate_comment', this.selectedComment.id)
      },
      approve_comment() {
        this.$emit('approve_comment', this.selectedComment.id)
      }
    }
  }
</script>
