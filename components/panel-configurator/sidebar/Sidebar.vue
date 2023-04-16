<template>
  <div class="sidebar-wrapper">
    <h3>Konfiguriere deine Platten:</h3>
    <thickness-wrapper/>
  </div>
</template>

<script lang="ts" setup>
  import ThicknessWrapper from "~/components/panel-configurator/sidebar/ThicknessWrapper.vue";
</script>

<style scoped lang="scss">
  .sidebar-wrapper {
    background-color: $primary;
    width: 22rem;
    height: 100vh;
    overflow: hidden;
    padding: 1rem 2rem;
  }
</style>
