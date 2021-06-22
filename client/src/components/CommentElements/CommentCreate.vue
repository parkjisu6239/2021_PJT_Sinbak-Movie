<template>
  <div>
    <div class="p-3" style="background-color: white; height: 100%;, width: 100%;" >
      <textarea
        rows="4"
        @keyup.enter="createComment({tmdbId: $route.params.id, content})" 
        v-model="content" 
        class="form-control" 
        placeholder="감상평을 남겨주세요" 
        aria-describedby="button-addon"
      ></textarea>
      <div class="text-end m-3 mx-0">
        <button
          @click="createComment({tmdbId: $route.params.id, content})"
          class="btn btn-outline-success" 
          type="button" 
          id="button-addon"
        >
          작성하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentCreate',
  data() {
    return {
      content: '',
    }
  },
  methods: {
    createComment(comment_payload) {
      if (this.content.trim()) {
        this.$store.dispatch('comments/create_comment', comment_payload)
        this.content = ''
        this.hideModal()
      } 
    },
    hideModal() {
      this.$emit('close')
    }
    
  }
}
</script>

<style>

</style>