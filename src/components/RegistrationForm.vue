<template>
  <div class="py-5 p-3 form-container">
    <b-form class="d-flex flex-column align-items-center"  @submit.prevent="debounceSubmit">
      <h4 class="text-center text-white">Registration Form</h4>

      <img
        width="200"
        class="my-4"
        v-if="sourceImage"
        :src="sourceImage"
        alt="avatar"
      >

      <b-form-file
        class="mb-2"
        v-model="avatar"
        accept="image/jpeg, image/png, image/gif"
        placeholder="Upload profile image"
      ></b-form-file>

      <b-form-input
        class="mb-2"
        placeholder="Name"
        v-model="form.name">
      </b-form-input>

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

      <b-button :disabled="!form.name || !form.email || !form.password" class="w-100" type="submit">Join Us</b-button>

    </b-form>
    <router-link class="d-block mt-3 text-light" to="login">Go to Login</router-link>
  </div>
</template>

<script>
  import {debounce} from 'lodash';
  import { toBase64 } from '../utils/helpers';

  export default {
    name: 'RegistrationForm',
    data() {
      return {
        avatar: null,
        form: {
          name: '',
          email: '',
          password: '',
        },
        debounceSubmit: () => {
        },
        sourceImage: null,
      }
    },
    created() {
      this.debounceSubmit = debounce(this.createUser, 300);
    },
    methods: {
      async createUser() {
        try {
          if (this.sourceImage) {
            this.form.avatar = await this.getAvatarObject();
          }
          await this.$store.dispatch('user/signUp', this.form);
          await this.$router.push({name: 'Home'})
        } catch (error) {
          let notificationMessage = error.response.data;
          if (error.response.status === 413) {
            notificationMessage = 'Avatat size is too large! Please, select another one.'
          }
          this.$noty.error(notificationMessage)
        }
      },
      async getAvatarObject() {        
        return {
          image: this.sourceImage.split(',')[1],
          extension: this.avatar.type.split('/')[1],
        }
      }
    },
    watch: {
      async avatar(newValue) {
        this.sourceImage = await toBase64(newValue);
      }
    }
  }
</script>
