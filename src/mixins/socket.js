import { socketInstance } from '../utils/socketIO';
import axios from '@/utils/axios';

export const socketEvens = {
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
        socketInstance('SEND_MESSAGE', {chat: data._id, message, sender: message.sender});
      }
    }
  }
};
