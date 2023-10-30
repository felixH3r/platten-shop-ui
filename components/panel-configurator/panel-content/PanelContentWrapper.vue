<template>
  <div class="flex flex-col gap-5 p-5 pt-20">
    <PanelView/>
    <PanelOptionsSlider/>
  </div>
</template>

<script lang="ts" setup>

  import PanelOptionsSlider from "~/components/panel-configurator/panel-content/PanelOptionsSlider.vue";
  import PanelView from "~/components/panel-configurator/panel-content/PanelView.vue";
</script>

<style scoped lang="scss">
  @import "../sidebar/_utils/sidebar-variables.scss";

  .panel-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - $sidebar-width);
    height: 100vh;
  }
</style>
