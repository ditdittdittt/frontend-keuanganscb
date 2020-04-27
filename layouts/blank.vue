<template>
  <v-theme-provider>
    <v-app class="gradient-play">
      <div class="spacing-small"></div>
      <nuxt />
      <div class="spacing-small"></div>
    </v-app>
  </v-theme-provider>
</template>
<script>
export default {}
</script>
<style scoped>
.gradient-play {
  background: linear-gradient(270deg, #0039ff, #1de265);
  background-size: 150% 150%;
}
</style>
