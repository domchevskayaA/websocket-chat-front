<template>
  <div class="w-100 d-flex flex-column h-100">
    <b-container
      :key="chatId"
      fluid="sm"
      class="chat-container flex-grow-1"
    >
      <b-col
        v-if="chat"
        class="d-flex flex-column"
      >
        <div
          v-for="(item, index) in chat.messages"
          :id="`message-${index}`"
          :key="item._id"
          class="mb-2 py-2 text-white p-3 rounded w-75"
          :class="[isMe(item.sender._id) ? 'align-self-end text-right' : '',
                   !item.read ? 'bg-dark': '']"
        >
          <h6 :class="`mb-0 ${isMe(item.sender._id) ? 'text-primary' : 'text-info'}`">
            {{ item.sender.name }}
          </h6>
          <p class="mb-0">
            {{ item.text }}
          </p>
          <small class="text-secondary">
            {{ formatTime(item.date) }}
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
  import { scrollElementToBottom } from '../utils/helpers';

  export default {
    name: 'Chat',
    components: { MessageForm },
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
    watch: {
      chat (newValue) {
        scrollElementToBottom(`message-${newValue.messages.length-1}`);
      }
    },
    async mounted() {
      scrollElementToBottom(`message-${this.chat.messages.length-1}`);
    },
    methods: {
      isMe(userId) {
        if (this.user) {
          return userId === this.user._id
        }
      },
      async sendMessage(text) {
        try {
          text ? await this.$store.dispatch('chats/sendChatMessage', text) : null;
          this.message = '';
        } catch (error) {
          console.log(error, 'error from sendMessage form')
        }
      }
    }
  }

</script>

<style>
  .chat-container {
    max-height: calc(100vh - 160px);
  }
</style>>
