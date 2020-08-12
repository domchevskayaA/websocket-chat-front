<template>
  <b-container fluid class="p-0 d-flex flex-column h-100">
    <b-container fluid class="p-0 flex-grow-1">
      <b-row no-gutters class="align-items-stretch h-100">
        <b-col sm="3" class="flex-grow-1 bg-dark border-right border-secondary">
            <div class="w-100 d-flex justify-content-end align-items-center px-3 header-height">
              <!-- <CustomInput
                  type="search"
                  placeholder="Search..."
                  @input="searchUsers"
                  @changeState="changeSearchState"
              /> -->
              <b-button
              variant="outline-info"
              @click="changeSearchState"
              size="sm"
              >
                  {{ isSearchActive ? 'Back to chats' : 'Add chat'}}
              </b-button>

            </div>
          <List :data="listData" @click="handleListItemClick" :activeId="chatId"/>
        </b-col>
        <b-col sm="9" class="flex-grow-1 d-flex flex-column">
          <Header/>
          <div :key="chatId" class="w-100 d-flex flex-column align-items-center p-3 flex-grow-1">
            <Chat v-if="chat && chatId" :chatId="chatId" :user="user" :chat="chat"/>
            <p v-else class="text-white">Please, select chat to start messaging</p>
          </div>
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
      chats: [],
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
    isSearchActive() {
        return this.$store.getters['users/isSearchActive'];
    },  
  },
  async created() {
    
    this.user ? this.feelListData() : null;
    this.chatId ? this.getChatMessages() : null;
  },
  methods: {
    async feelListData() {
      if (this.showUsersList) {
        this.displayUsers();
      } else {
        this.displayChats();
      }
    },
    async displayChats() {
        this.chats = await this.$store.dispatch('chats/fetchUserChats');
        this.listData = this.chats.map(chat => {
          const { companion: { name, avatar }, _id, count } = chat;
          return { name, avatar, _id, count };
        });
    },
    async displayUsers() {
        this.listData = await this.$store.dispatch('users/getUsers');
    },
    async handleListItemClick(id) {
      if (this.showUsersList) {
        let existedChatId = null;
        this.chats.map(chat => {
          chat.companion._id === id ? existedChatId = chat._id : null;
        })
        existedChatId ? this.goToChat(existedChatId) : this.addChat(id);
      } else {
        this.goToChat(id);
      }
      this.$store.dispatch('users/setSearchState', false);
    },
    async addChat(companionId) {
        await this.$store.dispatch('chats/addUserChat', { companion_id: companionId });
    },
    async goToChat(chatId) {
        await this.$store.dispatch(`chats/fetchChatById`, chatId);
        this.chatId !== chatId ? this.$router.push({path: `/chat/${chatId}`}) : null;
    },
    async getChatMessages() {
      await this.$store.dispatch(`chats/fetchChatById`, this.chatId);
    },
    changeSearchState(state) {
        this.$store.dispatch('users/setSearchState', !this.isSearchActive);
    },
    searchUsers(value) {
        console.log(value)
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

<style>
  .header-height {
    height: 64px;
  }
</style>
