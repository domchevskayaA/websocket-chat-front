<template>
  <List :data="users" @click="goToChatRoom"/>
</template>

<script>
  import { socketInstance } from '../utils/socketIO';
  import List from './common/List';

  export default {
    name: 'ChatsList',
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
      // this.subscribeOnMessage()
    },
    methods: {
      goToChatRoom(receiver_id) {
        if (this.receiverId !== receiver_id) {
          this.$router.push({path: `/chat/${receiver_id}`});
        }
      },
    },
    components: { List },
  }
</script>
