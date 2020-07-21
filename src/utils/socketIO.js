import io from 'socket.io-client';

const socketInstance = io(`${process.env.VUE_APP_SERVER_HOST}`);

export {
    socketInstance,
}