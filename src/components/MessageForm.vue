<template>
  <b-form
    @submit.prevent="debounceSubmit"
    @keydown.enter.shift.prevent="debounceSubmit"
    class="message-form d-flex flex-row w-100 form"
  >
    <b-form-textarea
      class="w-100 bg-dark text-light rounded-0 border-0"
      v-if="user"
      v-model="message"
      placeholder="Write a message"
      rows="1"
      max-rows="1"
      min-rows="1"
    ></b-form-textarea>
    <b-button
      class="message-send-button rounded-0 border-0 bg-transparent"
      variant="outline-secondary"
      type="submit">
      <b-icon icon="arrow-right-circle" variant="info" font-scale="2" aria-label="Send"></b-icon>
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
          ::-webkit-input-placeholder {
          color: #6c757d !important;
          }
          .message-send-button{
            width: 62px;
            &:active, &:focus {
              box-shadow: none !important;
            }
          }
      }

</style>>
