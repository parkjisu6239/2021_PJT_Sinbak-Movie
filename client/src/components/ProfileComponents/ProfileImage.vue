<template>
  <div>
    <span v-if="profileImage">
      <img :src="profileURL" alt="" class="profile">
    </span>
  </div>
</template>

<script>
export default {
  name: "ProfileImage",
  props: {
    profileImage: {
      type: String,
    }
  },
  computed: {
    profileURL() {
      return `${process.env.VUE_APP_API_MEDIA_URL}${this.profileImage}`
    }
  },
}
</script>

<style>
.profile {
  border-radius: 50%;
  width: 150px;
}
</style>