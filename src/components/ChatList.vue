<template>
<div class="w-25 bg-dark">
  <b-list-group variant="dark" v-if="users && users.length">
    <b-list-group-item
      @click="goToChatRoom(user._id)"
      class="d-flex flex-row align-items-start bg-dark text-light border-secondary border-right-0 border-left-0 rounded-0 p-2 py-3"
      v-for="(user, index) in users"
      :key="index">
        <AvatarContainer
            :imageUrl="user.avatar"
            class="mr-3"
        />
      <p clas="mb-0">{{user.name}}</p>
      <b-badge v-if="user.count" class="badge d-felx align-items-center" variant="info" pill>
        {{user.count}}
      </b-badge>
    </b-list-group-item>
  </b-list-group>
  <p v-else class="text-center mt-3 text-white">Your chats will apear here</p>
</div>
</template>

<script>
  import { socketInstance } from '../utils/socketIO';
  import AvatarContainer from './common/AvatarContainer';
  import eventBus from '../utils/event-bus';

  export default {
    name: 'ChatList',
    computed: {
      receiverId() {
        return parseInt(this.$route.params.receiver_id);
      },
      users() {
        return this.$store.getters['chats/chats'];
      }
    },
    async created () {
      try {
        await this.$store.dispatch('chats/getChats');
      } catch (err) {
        console.log(err)
      }
      this.subscribeOnMessage()
    },
    methods: {
      subscribeOnMessage() {
        eventBus.$on('newMessage', data => {

        });
      },
      goToChatRoom(receiver_id) {
        if (this.receiverId !== receiver_id) {
          this.$router.push({path: `/chat/${receiver_id}`});
        }
      },
    },
    components: { AvatarContainer },
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
