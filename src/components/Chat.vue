<template>
  <div :key="receiverId" class="d-flex justify-content-center flex-grow-1">
    <div class="chat-wrapper flex-grow-1 position-relative">

      <div id="chat-container" class="chat-container p-3 w-100 mb-4 d-flex flex-column">
        <div
          v-for="(item) in messages"
          class="w-75 mb-2 py-2 text-white p-3 rounded"
          :class="[isMe(item.sender._id) ? 'align-self-end text-right' : '',
          !item.read ? 'bg-dark': '']"
          :id="`message-${item._id}`"
          :key="item._id">
          <h6 class="mb-0" :style="{color: getUserColor(item.sender._id)}">{{item.sender.name}}</h6>
          <p class="mb-0">{{item.text}}</p>
          <small class="text-secondary">{{formatTime(item.date)}}</small>

        </div>
      </div>

      <MessageForm v-if="chat_id" :chat_id="chat_id" :user="user"/>

    </div>
  </div>
</template>

<script>
  import MessageForm from './MessageForm'
  import { getColorByIndex, scrollElementToBottom, formatDate } from '../utils/helpers';
  import { socketInstance } from '../utils/socketIO'; 

  export default {
    name: 'Chat',
    data() {
      return {
        messages: [],
        users: [],
        chat_id: null
      }
    },
    computed: {
      receiverId() {
        return this.$route.params.receiver_id;
      },
      user () {
        return this.$store.getters['user/user']
      },
    },
    components: { MessageForm },
    async mounted() {
      socketInstance.on('MESSAGE', data => {
        console.log(data.chat === this.chat_id);
        if (data.chat === this.chat_id) {
          this.$set(this.messages, this.messages.length, data.message);

          this.pushUserColor();
        }
      });
      this.getChatMessages();
    },
    methods: {
      async getChatMessages() {
        try {
          const {_id, messages} = await this.getData(`/chat/receiver/${this.receiverId}`);

          this.chat_id = _id;
          this.messages = messages;

          this.pushUserColor();
        } catch (err) {
          this.$router.push({path: `/`});
          throw new Error(err);
        }
      },
      isMe(userId) {
        if (this.user) {
          return userId === this.user._id
        }
      },
      getUserColor(user_id) {
        const index = this.users.indexOf(user_id);
        return getColorByIndex(index);
      },
      pushUserColor() {
        this.messages.map((item) => {
          if (!this.users.includes(item.sender._id)) {
            this.users.push(item.sender._id)
          }
        })
      }
    },
    watch: {
      receiverId () {
        this.getChatMessages()
      },
      messages (messages) {
          scrollElementToBottom(`message-${messages.length-1}`);
      }
    }
  }

</script>
