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
      return this.$route.params.receiver_id ? parseInt(this.$route.params.receiver_id) : null;
    },
    isSearchActive() {
      return this.$store.getters['users/isSearchActive'];
    },
  },
  async created() {
    await this.$store.dispatch('chats/getUserChats');
  },
  methods: {
    feelListData() {
      this.listData = this.isSearchActive ? this.$store.getters['chats/list'] : this.$store.getters['users/list'];
    },
    handleListItemClick(userId) {
      if (this.receiverId !== userId) {
        this.$router.push({path: `/chat/${userId}`});
      }
    },
  },
  watch: {
    isSearchActive(newValue) {
      console.log(newValue)
      this.feelListData();
    }      
  },
  components: {Chat, List, Header}
}
</script>
