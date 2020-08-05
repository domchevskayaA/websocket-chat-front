import axios from '@/utils/axios';
import * as types from '../mutation-types';

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
      const {data} = await axios.get(`/chats`);
  
      await commit(types.SET_CHATS_LIST, data);
      return data;
    } else {
      return [];
    }
  },

  async addUserChat ({ dispatch }, payload) {
    const {data} = await axios.post(`/chats`, payload);

    dispatch('fetchUserChats');
    return data;
  },

  async fetchChatById ({ commit }, chatId) {
      const {data} = await axios.get(`/chats/${chatId}`);
  
      await commit(types.SET_ACTIVE_CHAT, data);
      return data;
  },

  async addChatMessage ({ state, commit }, { text }) {
    const chatId = state.active._id;
    const {data} = await axios.post(`/chats/${chatId}/messages`, { text });

    await commit(types.SET_ACTIVE_CHAT, data);
    return data;
  }
};
