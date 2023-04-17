<template>
  <div class="panel-configurator-wrapper">
    <Sidebar/>
    <PanelContentWrapper/>
  </div>
</template>

<script lang="ts" setup>

  import Sidebar from "~/components/panel-configurator/sidebar/Sidebar.vue";
</script>

<style scoped lang="scss">
  .panel-configurator-wrapper {
    display: flex;
    overflow: hidden;
  }
</style>
