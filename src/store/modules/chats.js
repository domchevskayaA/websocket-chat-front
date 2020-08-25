import * as types from '../mutation-types';
import { socketInstance } from '../../utils/socketIO'; 
import { getData, postData } from '@/utils/requests';

export const state = {
  list: [],
  active: null,
};

export const getters = {
  list: state => state.list,
  active: state => state.active,
};

export const mutations = {  
  [types.SET_ACTIVE_CHAT](state, data) {
    state.active = data;
  },  
  [types.SET_CHATS_LIST](state, data) {
    state.list = data;
  },
};

export const actions = {

  async fetchUserChats ({ commit, rootState }) {
    if (rootState.auth.user) {
      const data = await getData(`/chats`);
  
      await commit(types.SET_CHATS_LIST, data);
      return data;
    } else {
      return [];
    }
  },

  async addUserChat ({ dispatch }, payload) {
    const data = await postData(`/chats`, payload);

    dispatch('fetchUserChats');
    return data;
  },

  async fetchChatById ({ commit }, chatId) {
      const data = await getData(`/chats/${chatId}`);
  
      await commit(types.SET_ACTIVE_CHAT, data);
      return data;
  },

  async sendChatMessage ({ state }, text) {
    const activeChatId = state.active._id;
    const data = await postData(`/chats/${activeChatId}/messages`, { text });

    socketInstance.emit('SEND_MESSAGE', {
      chatId: activeChatId
    }) 

    // await commit(types.SET_ACTIVE_CHAT, data);
    return data;
  },
};
