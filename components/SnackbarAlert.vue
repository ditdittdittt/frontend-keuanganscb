<template>
  <v-container>
    <v-snackbar
      v-model="show"
      :timeout="success ? timeout.success : timeout.error"
      top
      multi-line
      :color="success ? color.success : color.error"
    >
      <span class="caption font-weigth-light text-capitalize">{{
        messages
      }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="close()">
          {{ $translate('components.button.close') }}
        </v-btn>
      </template>
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
      timeout: {
        success: 3000,
        error: 6000
      },
      color: {
        success: 'green darken-1',
        error: 'red darken-1'
      }
    }
  },
  watch: {
    value(value) {
      this.show = value
    },
    show(value) {
      this.$emit('input', value)
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
