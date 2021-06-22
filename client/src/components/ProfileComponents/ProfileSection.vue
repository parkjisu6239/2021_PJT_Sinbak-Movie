<template>
  <div class="row">
    <div class="p-0 m-0 row justify-content-between">
      <div class="d-flex m-0 p-0 justify-content-between" style="width: 270px">
        <h2 class="text-start p-0 me-3" >{{ ProfileUsername }}</h2>
        <div v-if="ProfileUsername !== username" class="p-0 text-start mt-2">
          <button v-show="!followInfo.followed" @click="setFollowEmit" class="btn btn-sm btn-success" style="color: #7eca9c">팔로우</button>
          <button v-show="followInfo.followed" @click="setFollowEmit" class="btn btn-sm btn-outline-success" style="color: #7eca9c">팔로잉</button>
        </div>
        <div v-if="ProfileUsername === username" class="p-0 mt-2 text-end" >
          <div style="transform: translate(0px, -14px);">
            <b-dropdown id="dropdown-1" text="설정" variant="secondary" class="m-md-2">
              <b-dropdown-item @click="moveToUserInfoChange">회원정보 수정</b-dropdown-item>
              <b-dropdown-item @click="showUserDeleteModal">회원 탈퇴</b-dropdown-item>
            </b-dropdown>
          </div>
          <!-- <div style="transform: scale(2, 2);" @click="showUserSettingModal" @mouseover="cursorChange" @mouseleave="cursorChange" :class="{ mouseOverPointing: mouseOver}">⚙</div>  -->
        </div>
      </div>
    </div>
    <div style="height: 10px"></div>
    <ul class="row p-0 m-0 text-start">
      <li class="col-4 profile-info"><span>평가한 영화</span><span class="fw-bold"> {{ RatedMovieCnt }}</span></li>
      <li class="col-3 profile-info"><span>팔로워</span><span class="fw-bold"> {{ followInfo.follower_cnt }}</span></li> 
      <li class="col-3 profile-info"><span>팔로잉</span><span class="fw-bold"> {{ followInfo.following_cnt }}</span></li>
    </ul>
    <ModalsContainer @close="hideUserDeleteModal"/>
  </div>

</template>

<script>
import {BDropdown, BDropdownItem } from 'bootstrap-vue'
import ModalsContainer from 'vue-js-modal/src/components/ModalsContainer'
import UserDelete from '@/components/ProfileComponents/UserDelete'
import router from '@/router'
import { mapState } from 'vuex'
export default {
  name: 'ProfileSection',
  data() {
    return {
      mouseOver: false,
    }
  },
  computed: {
    ...mapState('accounts', [
      'username'
    ])
  },
  components: {
    ModalsContainer,
    BDropdown,
    BDropdownItem,
  },
  props: {
    ProfileUsername: {
      type: String,
    },
    followInfo: {
      type: Object,
    },
    RatedMovieCnt: {
      type: Number,
    }
  },
  methods: {
    cursorChange() {
      this.mouseOver = !this.mouseOver
    },
    setFollowEmit() {
      this.$emit('set-follow')
    },
    showUserDeleteModal() {
      this.$modal.show(UserDelete, {}, {
       name: 'UserDeleteModal',
       height: 'auto', 
      })
    },
    hideUserDeleteModal() {
      this.$modal.hide('UserDeleteModal')
    },
    moveToUserInfoChange() {
      router.push({name: 'UserInfoChange', params: { username: this.username }})
    },
  }
}
</script>
<style scoped>

.mouseOverPointing {
  cursor: pointer;
}

.profile-info{
  list-style: none;
  padding: 0px;
  margin: 0px;
}
</style>