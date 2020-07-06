<template>
  <div class="py-5 p-3 form-container">
    <b-form class="d-flex flex-column align-items-center" @submit.prevent="debounceSubmit">
      <h4 class="text-center text-white">Login Form</h4>

      <b-form-input
        class="mb-2"
        placeholder="Email"
        v-model="form.email">
      </b-form-input>

      <b-form-input
        class="mb-2"
        type="password"
        placeholder="Password"
        v-model="form.password">
      </b-form-input>

      <b-button :disabled="!form.email || !form.password" class="w-100" type="submit">Log In</b-button>

    </b-form>
    <router-link class="d-block mt-3 text-light" to="registration">Don't have an account?</router-link>
  </div>
</template>

<script>
  import {debounce} from 'lodash';

  export default {
    name: 'LoginForm',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        debounceSubmit: () => {
        }
      }
    },
    created() {
      this.debounceSubmit = debounce(this.loginUser, 300);
    },
    methods: {
      async loginUser() {
        try {
          await this.$store.dispatch('user/login', this.form);
          await this.$router.push({name: 'Home'});
        } catch (error) {
          this.$noty.error(error.response.data)
        }
      }
    }
  }
</script>
