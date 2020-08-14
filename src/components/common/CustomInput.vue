<template>
  <div class="w-100">
    <label
      v-if="label"
      :for="`type-${type}`"
    >{{ label }}</label>
    <b-form-input
      :id="`type-${type}`"
      v-model="value"
      class="input bg-dark text-light"
      :type="type"
      :placeholder="placeholder"
      @input="debounceChangeValue"
      @focus="$emit('changeState', true)"
      @blur="$emit('changeState', false)"
    />
  </div>
</template>s

<script>
export default {
    name: 'CustomInput',
    props: {
      placeholder: {
        type: String,
        default: '',
      },
      label: {
        type: String,
      },
      type: {
        type: String,
        default: 'text',
      },
    },
    data() {
        return {
          value: '',
          debounceChangeValue: () => {},
        }
    },
    created() {
      this.debounceChangeValue = this.debounceFunction(value => this.$emit('input', value), 300);
    },
}
</script>>

<style lang="scss">
  .input {
      ::-webkit-input-placeholder {
      color: #6c757d !important;
      }
  }
</style>
