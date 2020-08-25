import * as types from '../mutation-types';
import { deleteCookie } from '../../utils/cookie';
import { getData, postData } from '@/utils/requests';

export const state = {
  user: null,
  isAuthorized: false,
};

export const getters = {
  user: state => state.user,
  isAuthorized: state => !!state.user,
};

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

export const actions = {

  async getUser ({commit}) {
    const data = await getData('users/current');

    await commit(types.SET_USER, data);
    return data;
  },

  async login({commit}, payload) {
    const data = await postData('auth/login', payload);

    await commit(types.SET_USER, data);
    return data;
  },

  async signUp({commit}, payload) {
    const data = await postData('auth/register', payload);

    await commit(types.SET_USER, data);
    return data;
  },

  async logout({commit}) {
    try {
      await postData('auth/logout');
      await commit(types.CLEAR_USER);
      deleteCookie('token');
    }
    catch (e) {
      console.error("Logout", e);
    }
  },

  async setUserAvatar({commit}, payload) {
    try {
      const data = await postData('users/current/avatar', payload);
      await commit(types.UPDATE_USER, data);
    }
    catch (e) {
      console.error(e);
    }
  } 

};
