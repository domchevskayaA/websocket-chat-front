<template>
<div class="w-25 bg-dark">
  <b-list-group variant="dark" v-if="!!users.length">
    <b-list-group-item
      @click="goToChatRoom(user._id)"
      class="d-flex flex-row align-items-start bg-dark text-light border-secondary border-right-0 border-left-0 rounded-0 p-2 py-3"
      v-for="(user, index) in users"
      :key="index">
      <b-img
        width="40"
        height="40"
        class="mr-3"
        :style="{ backgroundImage: `url(${getStaticImageUrl(user.avatar_url)})`, backgroundSize: 'contain', backgroundColor: 'white' }"
        rounded="circle"
      />
      <p clas="mb-0">{{user.name}}</p>
      <b-badge class="badge d-felx align-items-center" variant="info" pill>
        {{count[user._id] || 0}}
      </b-badge>
    </b-list-group-item>
  </b-list-group>
  <p v-else class="text-center mt-3 text-white">Your chats will apear here</p>
</div>
</template>

<script>
  export default {
    name: 'ChatList',
    data() {
      return {
        users: [],
        count: {}
      }
    },
    async created () {
      try {
        const data = await this.getData('users');
        if (data) {
          this.users = (data);
        }        
      } catch (err) {
        console.log(err)
      }
      this.subscribeOnMessage()
    },
    methods: {
      subscribeOnMessage() {
        this.socket.on('MESSAGE', data => {
          const count = this.count[data.sender._id] ? this.count[data.sender._id] + 1 : 1;
          this.$set(this.count, data.sender._id, count);
        });
      },
      goToChatRoom(receiver_id) {
        this.$router.push({path: `/chat/${receiver_id}`});
      },
    }
  }
</script>

<style lang="scss" scoped>
  .badge {
    line-height: normal;
    position: absolute;
    top: 16px;
    right: 8px;
  }
</style>
