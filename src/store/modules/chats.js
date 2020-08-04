import axios from '@/utils/axios';
import * as types from '../mutation-types';

export const state = {
  list: [],
};

export const getters = {
  list: state => state.list,
};

export const mutations = {

  [types.GET_CHATS](state, data) {
    state.list = data;
  },
};

export const actions = {

  async getUserChats ({ commit, rootState }, payload) {

    if (rootState.auth.user) {
      const {data} = await axios.get(`/chats`);
  
      await commit(types.GET_CHATS, data);
      return data;
    } else {
      return [];
    }
  }
};
