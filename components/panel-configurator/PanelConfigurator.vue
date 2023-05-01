<template>
  <div class="panel-configurator-wrapper">
    <Sidebar/>
    <PanelContentWrapper/>
  </div>
</template>

<script lang="ts" setup>
  import Sidebar from "~/components/panel-configurator/sidebar/Sidebar.vue";
  import {useMainStore} from "~/store/mainStore";

</script>

<style scoped lang="scss">
  .panel-configurator-wrapper {
    display: flex;
  }
</style>
