<template>
  <div class="sidebar-wrapper">
    <h3>{{ TC.pcSidebar.header }}</h3>
    <thickness-wrapper/>
    <MeasurementsWrapper :header="TC.pcSidebar.lengthHeader" :input-placeholder="TC.pcSidebar.lengthPlaceholder"/>
    <MeasurementsWrapper :header="TC.pcSidebar.widthHeader" :input-placeholder="TC.pcSidebar.widthPlaceholder"/>
    <descr-wrapper/>
  </div>
</template>

<script lang="ts" setup>
  import ThicknessWrapper from "~/components/panel-configurator/sidebar/ThicknessWrapper.vue";
  import {TC} from "../../../utils/text-content";
  import MeasurementsWrapper from "~/components/panel-configurator/sidebar/MeasurementsWrapper.vue";
  import DescrWrapper from "~/components/panel-configurator/sidebar/DescrWrapper.vue";
</script>

<style scoped lang="scss">
  @import "./_utils/sidebar-variables.scss";

  .sidebar-wrapper {
    background-color: $primary;
    width: $sidebar-width;
    height: 100vh;
    overflow: hidden;
    padding: 1rem 2rem;
  }
</style>
