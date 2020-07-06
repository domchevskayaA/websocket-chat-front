import io from 'socket.io-client';
import axios from '@/utils/axios';

export const socketEvens = {
  data () {
    return {
      socket: io('localhost:3000')
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    async sendMessage(text, chat_id) {
      if (text) {
        const { data } = await axios.post(`/chat/${chat_id}/messages`, {text});
        const message = data.messages[data.messages.length-1];
        this.socket.emit('SEND_MESSAGE', {chat: data._id, message, sender: message.sender});
      }
    }
  }
};
