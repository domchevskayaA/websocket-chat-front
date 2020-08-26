<template>
  <b-container
    fluid
    class="p-0 d-flex flex-column h-100"
  >
    <b-container
      fluid
      class="p-0 flex-grow-1"
    >
      <b-row
        no-gutters
        class="align-items-stretch h-100"
      >
        <b-col
          sm="3"
          class="flex-grow-1 bg-dark border-right border-secondary"
        >
          <div class="w-100 d-flex justify-content-end align-items-center px-3 header-height">
            <!-- <CustomInput
                  type="search"
                  placeholder="Search..."
                  @input="searchUsers"
                  @changeState="toggleSearchState"
              /> -->
            <b-button
              variant="outline-info"
              size="sm"
              @click="toggleSearchState"
            >
              {{ isSearchActive ? 'Back to chats' : 'Add chat' }}
            </b-button>
          </div>
          <List
            :data="listData"
            :active-id="chatId"
            @click="handleListItemClick"
          />
        </b-col>
        <b-col
          sm="9"
          class="flex-grow-1 d-flex flex-column"
        >
          <Header />
          <div
            :key="chatId"
            class="w-100 d-flex flex-column align-items-center p-3 flex-grow-1"
          >
            <Chat
              v-if="chat && chatId"
              :chat-id="chatId"
              :user="user"
              :chat="chat"
            />
            <p
              v-else
              class="text-white"
            >
              Please, select chat to start messaging
            </p>
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
  import { getCompanion } from '../utils/helpers';
  import { socketInstance } from '../utils/socketIO';

export default {
  name: 'ChatPage',
  components: {Chat, List, Header},
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
  watch: {
    showUsersList() {
     this.feelListData();
    },
    user(newValue) {
      if (newValue) this.feelListData();
    }   
  },
  async created() {    
    if (this.user) this.feelListData();
    if (this.chatId) this.getChatMessages();

    socketInstance.on('MESSAGE', async data => {
      const { chatId } = data;
      if (chatId === this.chatId) {
        await this.$store.dispatch('chats/fetchChatById', this.chatId);
      } else {
        this.feelListData();
      }
    });
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
          const { _id, unreadCount } = chat;
          const { name, avatar, _id: companion_id } = getCompanion(chat.users, this.user._id);
          return { 
            name,
            avatar,
            _id,
            unreadCount: unreadCount[companion_id] || 0,
          };
        });
    },
    async displayUsers() {
        this.listData = await this.$store.dispatch('users/getUsers');
    },
    async handleListItemClick(item) {
      if (this.showUsersList) {
        let existedChatId = null;
        this.chats.map(chat => {
          if (getCompanion(chat.users, this.user._id)._id === item._id) existedChatId = chat._id;
        })
        existedChatId ? this.goToChat(existedChatId) : this.addChat(item._id);
        this.toggleSearchState(false);
      } else {
        this.goToChat(item._id);
        if (item.unreadCount) {
          this.displayChats();
        }        
      }
    },
    async addChat(companionId) {
        await this.$store.dispatch('chats/addUserChat', { companion_id: companionId });
    },
    async goToChat(chatId) {
        await this.$store.dispatch(`chats/fetchChatById`, chatId);
        if (this.chatId !== chatId) this.$router.push({path: `/chat/${chatId}`});
    },
    async getChatMessages() {
      await this.$store.dispatch(`chats/fetchChatById`, this.chatId);
    },
    toggleSearchState() {
        this.$store.dispatch('users/setSearchState', !this.isSearchActive);
    },
    searchUsers(value) {
        console.log(value)
    }
  }
}
</script>

<style>
  .header-height {
    height: 64px;
  }
</style>
