<template>
  <b-container fluid class="p-0 d-flex flex-column h-100">
    <Header/>
    <b-container fluid class="p-0 flex-grow-1">
      <b-row no-gutters class="align-items-stretch h-100">
        <b-col sm="3" class="flex-grow-1">
          <List :data="listData" @click="handleListItemClick" :activeId="chatId"/>
        </b-col>
        <b-col sm="9" class="flex-grow-1 d-flex flex-column align-items-center p-3">
          <Chat v-if="chat" :chatId="chatId" :user="user" :chat="chat"/>
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
    chatId() {
      return this.$route.params.chat_id;
    },
    showUsersList() {
      return this.$store.getters['users/isSearchActive'];
    },
    user() {
      return this.$store.getters['auth/user'];
    },
    chat () {
      return this.$store.getters['chats/active'];
    },    
  },
  created() {
    this.user ? this.feelListData() : null;
    this.chatId ? this.getChatMessages() : null;
  },
  methods: {
    async feelListData() {
      if (this.showUsersList) {
        this.listData = await this.$store.dispatch('users/getUsers');
      } else {
        const data = await this.$store.dispatch('chats/fetchUserChats');
        this.listData = data.map(chat => {
          const item = chat.users[0];
          item.count = chat.count;
          item._id = chat._id;
          return item;
        });
      }
    },
    async handleListItemClick(id) {
      this.showUsersList ? this.addChat(id) : this.goToChat(id);
    },
    async addChat(receiverId) {
        await this.$store.dispatch('chats/addUserChat', { receiver_id: receiverId });
        await this.$store.dispatch('users/setSearchState', false);
    },
    async goToChat(chatId) {
        await this.$store.dispatch(`chats/fetchChatById`, chatId);
        this.chatId !== chatId ? this.$router.push({path: `/chat/${chatId}`}) : null;
    },
    async getChatMessages() {
      await this.$store.dispatch(`chats/fetchChatById`, this.chatId);
    }
  },
  watch: {
    showUsersList(newValue) {
      this.feelListData();
    },
    user(newValue) {
      newValue ? this.feelListData() : null;
    }   
  },
  components: {Chat, List, Header}
}
</script>
