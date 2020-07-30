import axios from '@/utils/axios';
import * as types from '../mutation-types';

// state
export const state = {
  chats: [],
};

// getters
export const getters = {
  chats: state => state.chats,
};

// mutations
export const mutations = {

  [types.GET_CHATS](state, chats) {
    state.chats = chats;
  },
};

// actions
export const actions = {

  async getChats ({commit, state}, payload) {
    const {data} = await axios.get('users');

    await commit(types.GET_CHATS, data);
    return data;
  }
};
