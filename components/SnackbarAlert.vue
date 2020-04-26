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
    name: 'snackbar-alert',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      messages: {
        type: String,
        default: ''
      },
      success: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      show: function(value) {
        this.$emit('input', false)
      }
    },
    data() {
      return {
        show: false,
        timeout: 10000,
        color: {
          success: 'green darken-1',
          error: 'red darken-1'
        }
      }
    },
    methods: {
      close() {
        this.show = false
      }
    },
    mounted() {
      this.show = this.$props.value
    }
  }
</script>
<style scoped>
</style>
