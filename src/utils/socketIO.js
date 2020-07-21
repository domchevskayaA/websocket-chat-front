import io from 'socket.io-client';
import AxiosInstance from '../utils/axios';

const socketInstance = io(`${process.env.VUE_APP_SERVER_HOST}`);

 const sendMessage = async (text, chat_id) => {
    if (text) {
      const { data } = await AxiosInstance.post(`/chat/${chat_id}/messages`, {text});
      const message = data.messages[data.messages.length-1];
      socketInstance.emit('SEND_MESSAGE', {chat: data._id, message, sender: message.sender});
    }
}; 

export {
    socketInstance,
    sendMessage,
}