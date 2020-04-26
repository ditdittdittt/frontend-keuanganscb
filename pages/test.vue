<template>
  <v-layout column justify-center align-center></v-layout>
</template>

<script>
export default {
  data() {
    return {
      test: null
    }
  },
  mounted() {
    this.funct()
  },
  methods: {
    async funct() {
      this.test = await this.$api('table', 'budgetlist', null)
      console.log(this.test)
    }
  }
}
</script>
