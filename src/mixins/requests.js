import axios from '@/utils/axios';

export const requests = {
  methods: {
    getData(url, params, redirect, hideError) {
      return axios.get(url, {params})
        .then(resp => {
          if (resp && resp.data) {
            return resp.data
          }
        })
        .catch(err => {
          if (!hideError && err && err.response) {
            this.$noty.error(err.response.data);
          }
          if (redirect) {
            this.$router.replace({name: '404'})
          }
        })
    },
    postData(url, params, redirect_url, hideAlert = false) {
      return axios.post(url, params)
        .then(resp => {
          if (resp) {
            if (!hideAlert) {
              this.$noty.success('Success');
            }
            if (redirect_url) {
              this.$router.push({path: redirect_url})
            }
            return resp
          }
        })
        .catch(err => {
          if (err && err.response) {
            this.$noty.error(err.response.data)
          }
        })
    },
    putData(url, params, redirect_url, hideAlert = false) {
      return axios.put(url, params)
        .then(resp => {
          if (resp) {
            if (!hideAlert) {
              this.$noty.success('Success');
            }
            if (redirect_url) {
              this.$router.push({path: redirect_url})
            }
            return resp
          }
        })
        .catch(err => {
          if (err && err.response) {
            this.$noty.error(err.response.data)
          }
        })
    },
  }
};
