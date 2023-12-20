<template>
  <div class="w-full bg-primary px-5 py-5">
    <h3 v-if="!useMainStore().getIsMobile">{{ TC.pcSidebar.header }}</h3>
    <div class="flex gap-5 py-5">
      <select-component :values="['Sperrholz', 'Spanplatte']" class="w-2/3"/>
      <select-component :values="thicknessValues" class="w-1/3"/>
    </div>

    <MeasurementsWrapper :header="TC.pcSidebar.lengthHeader" :input-placeholder="TC.pcSidebar.lengthPlaceholder"
                         :usage="'length'"/>
    <MeasurementsWrapper class="pt-5 pb-5" :header="TC.pcSidebar.widthHeader"
                         :input-placeholder="TC.pcSidebar.widthPlaceholder"
                         :usage="'width'"/>
    <div v-if="!useMainStore().getIsMobile" class="flex flex-col gap-3">
      <h4>{{ TC.pcSidebar.descrHeader }}</h4>
      <span class="overflow-scroll">{{ TC.pcSidebar.descrContent }}</span>
    </div>

    <span class="text-4xl font-normal md:absolute md:left-5 md:bottom-5">€ 150,-</span>
  </div>
</template>

<script lang="ts" setup>
  import ThicknessWrapper from "~/components/panel-configurator/sidebar/ThicknessWrapper.vue";
  import {TC} from "../../../utils/text-content";
  import MeasurementsWrapper from "~/components/panel-configurator/sidebar/MeasurementsWrapper.vue";
  import DescrWrapper from "~/components/panel-configurator/sidebar/DescrWrapper.vue";
  import ThicknessSelect from "~/components/utils/SelectComponent.vue";
  import SelectComponent from "~/components/utils/SelectComponent.vue";
  import {useMainStore} from "~/store/mainStore";

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
