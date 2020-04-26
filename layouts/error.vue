<template>
  <v-app dark>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="8" class="text-center">
          <logo />
        </v-col>
        <v-col cols="12" align-self="center">
          <p class="text-center font-weight-black display-2">{{ error.statusCode }}</p>
          <div class="text-center font-weight-light body-1">{{ error.message }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    layout: 'empty',
    components: {
      Logo
    },
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    data() {
      return {}
    },
    head() {
      const title = this.error.statusCode
      return {
        title
      }
    },
    mounted() {
      console.log(this.$props.error)
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
