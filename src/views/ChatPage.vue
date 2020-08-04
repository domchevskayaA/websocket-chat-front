<template>
  <b-container fluid class="p-0 d-flex flex-column h-100">
    <Header/>
    <b-container fluid class="p-0 flex-grow-1">
      <b-row no-gutters class="align-items-stretch h-100">
        <b-col sm="3" class="flex-grow-1">
          <List :data="listData" @click="handleListItemClick"/>
        </b-col>
        <b-col sm="9" class="flex-grow-1 d-flex flex-column align-items-center p-3">
          <Chat v-if="receiverId" />
          <p v-else class="text-white">Please, select chat to start messaging</p>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
  import Chat from '../components/Chat';
  import Header from '../components/common/Header';
  import List from '../components/common/List';

export default {
  name: 'ChatPage',
  data() {
    return {
      listData: [],
    }
  },
  computed: {
    receiverId() {
      return this.$route.params.receiver_id;
    },
    isSearchActive() {
      return this.$store.getters['users/isSearchActive'];
    },
    user() {
      return this.$store.getters['auth/user'];
    }
  },
  created() {
    this.user ? this.feelListData() : null;
  },
  methods: {
    async feelListData(isSearchActive) {
      if (this.isSearchActive) {
        this.listData = await this.$store.dispatch('users/getUsers');
      } else {
        const data = await this.$store.dispatch('chats/getUserChats');
        this.listData = data.map(chat => {
          const user = chat.users[0];
          user.count = chat.count;
          return user;
        });
      }
    },
    handleListItemClick(userId) {
      if (this.receiverId !== userId) {
        this.$router.push({path: `/chat/${userId}`});
      }
    },
  },
  watch: {
    isSearchActive(newValue) {
      this.feelListData();
    },
    user(newValue) {
      newValue ? this.feelListData() : null;
    }   
  },
  components: {Chat, List, Header}
}
</script>
