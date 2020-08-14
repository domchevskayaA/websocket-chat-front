<template>
  <b-form
    class="message-form d-flex flex-row w-100 form"
    @submit.prevent="emitSubmit"
    @keydown.enter.shift.prevent="emitSubmit"
  >
    <b-form-textarea
      v-model="message"
      class="w-100 bg-dark text-light rounded-0 border-0"
      placeholder="Write a message"
      rows="1"
      max-rows="1"
      min-rows="1"
    />
    <b-button
      class="message-send-button rounded-0 border-0 bg-transparent"
      variant="outline-secondary"
      type="submit"
    >
      <b-icon
        icon="arrow-right-circle"
        variant="info"
        font-scale="2"
        aria-label="Send"
      />
    </b-button>
  </b-form> 
</template>

<script>

  export default {
    name: 'Form',
    data() {
      return {
        message: '',
        debounceSubmit: () => {},
      }
    },
    created () {
      this.debounceSubmit = this.debounceFunction(value => this.$emit('submit', value), 300);
    },
    methods: {
      emitSubmit() {
        const text = this.message.trim();
        if (text) {
          this.debounceSubmit(text);
          this.message = '';
        }
      },
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
