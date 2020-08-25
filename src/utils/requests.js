import axios from '@/utils/axios';
import Vue from 'vue';

const getData = (url, params, showAlert=true, redirect_url, ) => {
  return axios.get(url, {params})
    .then(res => {
      if (res && res.data) {
        return res.data;
      }
    })
    .catch(err => {
      if (showAlert && err && err.response) {
        Vue.noty.error(err.response.data.message);
      }
      if (redirect_url) {
        this.$router.replace({path: redirect_url});
      }
    })
};
const postData = (url, params, showAlert=false, redirect_url) => {
  return axios.post(url, params)
    .then(res => {
      if (res) {
        if (showAlert) {
          Vue.noty.success('Success!');
        }
        if (redirect_url) {
          this.$router.push({path: redirect_url});
        }
        return res.data;
      }
    })
    .catch(err => {
      if (err && err.response) {
        Vue.noty.error(err.response.data.message)
      }
    })
};
const putData = (url, params, showAlert=false, redirect_url) => {
  return axios.put(url, params)
    .then(res => {
      if (res) {
        if (showAlert) {
          Vue.noty.success('Success!');
        }
        if (redirect_url) {
          this.$router.push({path: redirect_url});
        }
        return res.data;
      }
    })
    .catch(err => {
      if (err && err.response) {
        Vue.noty.error(err.response.data.message)
      }
    })
};
const deleteData = (url, params, showAlert=true, redirect_url) => {
  return axios.put(url, params)
    .then(res => {
      if (res) {
        if (showAlert) {
          Vue.noty.success('Successfully deleted!');
        }
        if (redirect_url) {
          this.$router.push({path: redirect_url});
        }
        return res.data;
      }
    })
    .catch(err => {
      if (err && err.response) {
        Vue.noty.error(err.response.data.message)
      }
    })
};

export {
  getData,
  postData,
  putData,
};