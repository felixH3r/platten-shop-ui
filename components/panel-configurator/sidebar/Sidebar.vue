<template>
  <div class="w-full bg-primary px-5 py-5">
    <h3 v-if="!useMainStore().getIsMobile">{{ TC.pcSidebar.header }}</h3>
    <select-component :values="variants" :on-select="selectVariant" class="w-full mb-5"/>
    <MeasurementsWrapper :header="TC.pcSidebar.lengthHeader" :input-placeholder="TC.pcSidebar.lengthPlaceholder"
                         :usage="'length'"/>
    <MeasurementsWrapper class="pt-5 pb-8" :header="TC.pcSidebar.widthHeader"
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
  import {TC} from "../../../utils/text-content";
  import MeasurementsWrapper from "~/components/panel-configurator/sidebar/MeasurementsWrapper.vue";
  import SelectComponent from "~/components/utils/SelectComponent.vue";
  import {useMainStore} from "~/store/mainStore";
  import {computed} from "#imports";
  import {PricedVariant} from "@medusajs/medusa/dist/types/pricing";

  const variants = computed(() => {
    return useMainStore().getVariants?.map((value) => value.title);
  });

  const selectVariant = (selectedVariantTitle: string) => {
    const selectedVariant = useMainStore().getVariants?.find((variant) => variant.title === selectedVariantTitle);
    if (selectedVariant) {
      // ts-ignore because somehow the selectedVariant type does not fit perfectly but works
      // @ts-ignore
      useMainStore().setSelectedVariant(selectedVariant);
    }
  };


  // const options = computed((): { materials: string[], thicknesses: string[] } | null => {
  //   debugger;
  //   const variants = useMainStore().getVariants;
  //   const materialOptions = useMainStore().getMaterials;
  //   const thicknessOptions = useMainStore().getThicknesses;
  //   let options: MaterialOptions[];
  //   const materials: string[] = [];
  //   const thicknesses: string[] = [];
  //
  //   if (!variants || !materialOptions) {
  //     return null;
  //   }
  //   for (let material of materialOptions) {
  //     options;
  //   }
  //
  //
  //   for (let variant of variants) {
  //     const material = variant.options!.find((option) => option.value === 'Material');
  //     const thickness = variant.options!.find((option) => option.value === 'Dicke');
  //     if (material && !materials.includes(material.value)) {
  //       materials.push(material.value);
  //     }
  //     if (thickness && !thicknesses.includes(thickness.value)) {
  //       thicknesses.push(thickness.value);
  //     }
  //
  //
  //   }
  //   return {materials, thicknesses};
  // });

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
