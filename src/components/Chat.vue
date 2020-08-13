<template>
  <div class="w-100 d-flex flex-column h-100">

    <b-container fluid="sm" :key="chatId" class="chat-container flex-grow-1" >
      <b-col class="d-flex flex-column" v-if="chat">
        <div
          v-for="(item) in chat.messages"
          class="mb-2 py-2 text-white p-3 rounded w-75"
          :class="[isMe(item.sender._id) ? 'align-self-end text-right' : '',
          !item.read ? 'bg-dark': '']"
          :id="`message-${item._id}`"
          :key="item._id">
          <h6 :class="`mb-0 ${isMe(item.sender._id) ? 'text-primary' : 'text-info'}`">
            {{item.sender.name}}
          </h6>
          <p class="mb-0">{{item.text}}</p>
          <small class="text-secondary">
            {{formatTime(item.date)}}
          </small>
        </div>
      </b-col>
    </b-container>

    <MessageForm
      v-if="user && chatId"
      :user="user"
      @submit="sendMessage"
    />
  </div>
</template>

<script>
  import MessageForm from './MessageForm'
  import { scrollElementToBottom, formatDate } from '../utils/helpers';
  import { socketInstance } from '../utils/socketIO'; 
  import eventBus from '../utils/event-bus';

  export default {
    name: 'Chat',
    props: {
      chatId: {
        type: String,
      },
      user: {
        type: Object,
      },
      chat: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        messages: [],
        users: [],
      }
    },
    components: { MessageForm },
    async mounted() {
      socketInstance.on('MESSAGE', data => {
        if (data.chat === this.chatId) {
          this.$set(this.messages, this.messages.length, data.message);
        }
      });
    },
    methods: {
      isMe(userId) {
        if (this.user) {
          return userId === this.user._id
        }
      },
      async sendMessage(text) {
        try {
          text ? await this.$store.dispatch('chats/addChatMessage', { text }) : null;
          this.message = '';
        } catch (error) {
          console.log(error, 'error from sendMessage form')
        }
      }
    },
    watch: {
      chat (newValue) {
        scrollElementToBottom(`message-${newValue.messages.length-1}`);
      }
    }
  }

</script>

<style>
  .chat-container {
    max-height: calc(100vh - 160px);
  }
</style>>
