import * as types from '../mutation-types';
import { getData } from '@/utils/requests';

export const state = {
  list: [],
  isSearchActive: false,
};

export const getters = {
  list: state => state.list,
  isSearchActive: state => state.isSearchActive,
};

export const mutations = {

  [types.SET_USERS_LIST](state, data) {
    state.list = data;
  },
  [types.SET_SEARCH_STATE](state, data) {
    state.isSearchActive = data;
  },
};

export const actions = {

  async getUsers ({commit}) {
    const data = await getData('users');

    await commit(types.SET_USERS_LIST, data);
    return data;
  },
  setSearchState ({ commit }, payload) {
    commit(types.SET_SEARCH_STATE, payload);
    return payload;
  }
};
