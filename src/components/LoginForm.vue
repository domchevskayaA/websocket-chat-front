<template>
  <div class="py-5 p-3 form-container">
    <b-form
      class="d-flex flex-column align-items-center"
      @submit.prevent="debounceSubmit"
    >
      <h4 class="text-center text-white">
        Login Form
      </h4>

      <b-form-input
        v-model="form.email"
        class="mb-2"
        placeholder="Email"
      />

      <b-form-input
        v-model="form.password"
        class="mb-2"
        type="password"
        placeholder="Password"
      />

      <b-button
        :disabled="!form.email || !form.password"
        variant="info"
        class="w-100"
        type="submit"
      >
        Log In
      </b-button>
    </b-form>
    <router-link
      class="d-block mt-3 text-light"
      to="registration"
    >
      Don't have an account?
    </router-link>
  </div>
</template>

<script>

  export default {
    name: 'LoginForm',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        debounceSubmit: () => {},
      }
    },
    created () {
      this.debounceSubmit = this.debounceFunction(this.loginUser, 300);
    },
    methods: {
      async loginUser() {
        try {
          await this.$store.dispatch('auth/login', this.form);
          await this.$router.push({name: 'Chat'});
        } catch (error) {
          console.log(error);
          if (error.response && error.response.data) {
            this.$noty.error(error.response.data);
          }
        }
      }
    }
  }
</script>
