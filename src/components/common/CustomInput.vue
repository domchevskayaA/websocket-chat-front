<template>
  <div>
      <label v-if="label" :for="`type-${type}`">{{ label }}</label>
      <b-form-input
        :id="`type-${type}`"
        :type="type"
        :placeholder="placeholder"
        v-model="value"
        @input="debounceChangeValue"
      ></b-form-input>
    </div>
</template>

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