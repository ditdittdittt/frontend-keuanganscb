<template>
  <v-container>
    <v-snackbar
      v-model="show"
      :timeout="timeout"
      top
      multi-line
      :color="success ? color.success : color.error"
    >
      <span class="caption font-weigth-light">{{ messages }}</span>
      <v-btn text @click="close()">{{ $translate('components.button.close') }}</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  name: 'SnackbarAlert',
  props: {
    value: Boolean,
    messages: {
      type: String,
      default: ''
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.$props.value,
      timeout: 10000,
      color: {
        success: 'green darken-1',
        error: 'red darken-1'
      }
    }
  },
  watch: {
    value(value) {
      this.show = value
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped></style>
