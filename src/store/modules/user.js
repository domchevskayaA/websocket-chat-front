import axios from '@/utils/axios';
import * as types from '../mutation-types';
import { deleteCookie } from '../../utils/cookie';

// state
export const state = {
  user: null,
  isAuthorized: false,
};

// getters
export const getters = {
  user: state => state.user,
  isAuthorized: state => !!state.user,
};

// mutations
export const mutations = {

  [types.SET_USER](state, user) {
    state.user = user;
    state.isAuthorized = true;
  },

  [types.UPDATE_USER](state, user) {
    state.user = {
      ...state.user,
      user,
    };
  },

  [types.CLEAR_USER](state) {
    state.user = null;
    state.isAuthorized = false;
  },
};

// actions
export const actions = {

  async getUser ({commit, state}, payload) {
    const {data} = await axios.get('users/current');

    await commit(types.SET_USER, data);
    return data;
  },

  async login({commit, state}, payload) {
    const {data} = await axios.post('auth/login', payload);

    await commit(types.SET_USER, data);
    return data;
  },

  async signUp({commit, state}, payload) {
    const {data} = await axios.post('auth/register', payload);

    await commit(types.SET_USER, data);
    return data;
  },

  async logout({commit}) {
    try {
      await axios.post('auth/logout');
      await commit(types.CLEAR_USER);
      deleteCookie('token');
    }
    catch (e) {
      console.error("Logout", e);
    }
  },

  async setUserAvatar({commit}, payload) {
    try {
      const {data} = await axios.post('users/current/avatar', payload);
      await commit(types.UPDATE_USER, data);
    }
    catch (e) {
      console.error(e);
    }
  } 

};
