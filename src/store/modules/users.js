import axios from '@/utils/axios';
import * as types from '../mutation-types';

export const state = {
  list: [],
  isSearchActive: false,
};

export const getters = {
  list: state => state.list,
  isSearchActive: state => state.isSearchActive,
};

export const mutations = {

  [types.GET_CHATS](state, data) {
    state.list = data;
  },
  [types.SET_SEARCH_STATE](state, data) {
    state.isSearchActive = data;
  },
};

export const actions = {

  async getUsers ({commit, state}, payload) {
    const {data} = await axios.get('users');

    await commit(types.GET_USERS, data);
    return data;
  },
  setSearchState ({ commit }, payload) {
    commit(types.SET_SEARCH_STATE, payload);
    return payload;
  }
};
