<template>
  <b-form
    @submit.prevent="debounceSubmit"
    @keydown.enter.prevent="debounceSubmit"
    class="message-form d-flex flex-column w-100 position-absolute form"
  >
    <b-form-textarea
      class="w-100 bg-dark text-light border-secondary"
      v-if="user"
      v-model="message"
      :placeholder="`${user.name}, enter something...`"
      rows="1"
      max-rows="3"
    ></b-form-textarea>
    <b-button class="flex-grow-0 mt-2" variant="secondary" type="submit">
      Send
    </b-button>
  </b-form>
</template>

<script>
  import { sendMessage } from '../utils/socketIO';

  export default {
    name: 'Form',
    props: {
      chat_id:{
        type: String,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      },
      receiver_id: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        message: '',
        debounceSubmit: () => {},
      }
    },
    created () {
      this.debounceSubmit = this.debounceFunction(this.submit, 300);
    },
    methods: {
      async submit() {
        try {
          const text = this.message.trim();
          text ? await sendMessage(this.message.trim(), this.chat_id, this.receiver_id) : null;
          await this.$store.dispatch('chats/getChats');
          this.message = '';
        } catch (error) {
          console.log(error, 'error from sendMessage form')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

      .message-form {
        bottom: 16px;
          ::-webkit-input-placeholder {
          color: #6c757d !important;
          }
      }

</style>>
