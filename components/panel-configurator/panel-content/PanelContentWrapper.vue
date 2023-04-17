<template>
  <div class="panel-content-wrapper">
    <PanelView/>
  </div>
</template>

<script lang="ts" setup>

  import PanelOptionsSlider from "~/components/panel-configurator/panel-content/PanelOptionsSlider.vue";
  import PanelView from "~/components/panel-configurator/panel-content/PanelView.vue";
</script>

<style scoped lang="scss">
  .panel-content-wrapper {
    width: 100%;
  }
</style>
