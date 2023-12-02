<template>
  <div class="w-full bg-primary px-5 pb-5">
    <!--    <h3>{{ TC.pcSidebar.header }}</h3>-->
    <div class="flex gap-5 py-8">
      <select-component :values="['Sperrholz', 'Spanplatte']" class="w-2/3"/>
      <select-component :values="thicknessValues" class="w-1/3"/>
    </div>

    <MeasurementsWrapper :header="TC.pcSidebar.lengthHeader" :input-placeholder="TC.pcSidebar.lengthPlaceholder"
                         :usage="'length'"/>
    <MeasurementsWrapper class="pt-5 pb-8" :header="TC.pcSidebar.widthHeader"
                         :input-placeholder="TC.pcSidebar.widthPlaceholder"
                         :usage="'width'"/>
    <span class="text-4xl font-normal">€ 150,-</span>
  </div>
</template>

<script lang="ts" setup>
  import ThicknessWrapper from "~/components/panel-configurator/sidebar/ThicknessWrapper.vue";
  import {TC} from "../../../utils/text-content";
  import MeasurementsWrapper from "~/components/panel-configurator/sidebar/MeasurementsWrapper.vue";
  import DescrWrapper from "~/components/panel-configurator/sidebar/DescrWrapper.vue";
  import ThicknessSelect from "~/components/utils/SelectComponent.vue";
  import SelectComponent from "~/components/utils/SelectComponent.vue";

  const thicknessValues = ref(['16mm', '19mm', '25mm', '32mm']);
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
