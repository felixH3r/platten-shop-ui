<template>
  <div class="w-full bg-primary px-5 py-5">
    <h3 v-if="!useMainStore().getIsMobile">{{ TC.pcSidebar.header }}</h3>
    <select-component :values="variants" :on-select="selectVariant" class="w-full mb-5"/>
    <MeasurementsWrapper :header="TC.pcSidebar.lengthHeader" :input-placeholder="DEFAULT_LENGTH+''"
                         :usage="'length'" :max-value="2700" ref="measurementInput_1"/>
    <MeasurementsWrapper class="pb-8 mt-4" :header="TC.pcSidebar.widthHeader"
                         :input-placeholder="DEFAULT_WIDTH+''"
                         :usage="'width'" :max-value="2000" ref="measurementInput_2"/>
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
  import {DEFAULT_LENGTH, DEFAULT_WIDTH, MAX_LENGTH, MAX_WIDTH, useMainStore} from "~/store/mainStore";
  import {computed} from "#imports";
  import {PricedVariant} from "@medusajs/medusa/dist/types/pricing";
  import {boolean} from "@oclif/parser/lib/flags";

  const measurementInput_1 = ref({validateInput: (customErrMsg?: string, customValidate?: (input: string) => boolean) => false});
  const measurementInput_2 = ref({validateInput: (customErrMsg?: string, customValidate?: (input: string) => boolean) => false});

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

  const validateInputs = (): boolean => {
    const valid_1 = measurementInput_1.value.validateInput(TC.errorMsg.maxLength + MAX_LENGTH, (input: string) => parseInt(input) <= MAX_LENGTH);
    const valid_2 = measurementInput_2.value.validateInput(TC.errorMsg.maxWidth + MAX_WIDTH, (input: string) => parseInt(input) <= MAX_WIDTH);
    return valid_1 && valid_2;
  };

  defineExpose({
    validateInputs
  });


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
