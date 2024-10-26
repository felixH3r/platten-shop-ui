<template>
  <div class="w-full bg-primary px-5 py-5">
    <h3 v-if="!useMainStore().getIsMobile" class="mb-5">{{ TC.pcSidebar.header }}</h3>
    <select-component :values="variants" :on-select="selectVariant" class="w-full mb-3"/>
    <div class="flex items-center justify-center gap-3 mb-6 md:flex-col md:w-full">
      <MeasurementsWrapper :header="TC.pcSidebar.lengthHeader" :input-placeholder="DEFAULT_LENGTH+''"
                           :usage="'length'" :max-value="2700" ref="measurementInput_1"/>
      <MeasurementsWrapper class="" :header="TC.pcSidebar.widthHeader"
                           :input-placeholder="DEFAULT_WIDTH+''"
                           :usage="'width'" :max-value="2000" ref="measurementInput_2"/>
    </div>

    <div v-if="!useMainStore().getIsMobile" class="flex flex-col gap-3">
      <h4>{{ TC.pcSidebar.descrHeader }}</h4>
      <span class="overflow-scroll">{{ TC.pcSidebar.descrContent }}</span>
    </div>
    <span class="text-4xl font-normal md:absolute md:left-5 md:bottom-5">€ {{ getPrice }}</span>
  </div>
</template>

<script lang="ts" setup>
  import {TC} from "~/utils/text-content";
  import MeasurementsWrapper from "~/components/panel-configurator/sidebar/MeasurementsWrapper.vue";
  import SelectComponent from "~/components/utils/SelectComponent.vue";
  import {useMainStore} from "~/store/mainStore";
  import {computed} from "#imports";
  import {PricedVariant} from "@medusajs/medusa/dist/types/pricing";
  import {boolean} from "@oclif/parser/lib/flags";
  import {formatPrice} from "~/utils/helper";
  import {
    DEFAULT_LENGTH,
    DEFAULT_WIDTH,
    MAX_WIDTH,
    MAX_LENGTH,
    usePanelConfiguratorStore
  } from "~/store/panelConfiguratorStore";

  const panelConfiguratorStore = usePanelConfiguratorStore();

  const measurementInput_1 = ref({validateInput: (customErrMsg?: string, customValidate?: (input: string) => boolean) => false});
  const measurementInput_2 = ref({validateInput: (customErrMsg?: string, customValidate?: (input: string) => boolean) => false});

  const price = ref('');

  const variants = computed((): (string | undefined)[] => {
    if (!panelConfiguratorStore.selectedPanel || !panelConfiguratorStore.selectedPanel.variants) {
      return [];
    }
    return panelConfiguratorStore.selectedPanel.variants.map((value) => value.title);
  });

  const selectVariant = (selectedVariantTitle: string) => {
    if (!panelConfiguratorStore.selectedPanel || !panelConfiguratorStore.selectedPanel.variants) {
      return;
    }
    const selectedVariant = panelConfiguratorStore.selectedPanel.variants.find((variant) => variant.title === selectedVariantTitle);
    if (selectedVariant) {
      // ts-ignore because somehow the variants in product are not correctly typed
      // @ts-ignore
      panelConfiguratorStore.setSelectedVariant(selectedVariant);
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

  const getPrice = computed((): string => {
    if (price.value) {
      return price.value;
    }
    const selectedVariant = panelConfiguratorStore.selectedVariant;
    if (selectedVariant && selectedVariant.calculated_price) {
      return formatPrice(panelConfiguratorStore.calculatedPrice);
    }
    return '';
  });

  const calcPrice = () => {
    const selectedVariant = panelConfiguratorStore.selectedVariant;
    console.log(selectedVariant, 'selected variant price');
    if (!selectedVariant || !selectedVariant.calculated_price) {
      return '';
    }
    // const calcPrice = await useFetch('/api/panelPrice', {
    //   method: 'post',
    //   body: {
    //     width: 500,
    //     length: 1000,
    //     unitPrice: selectedVariant.calculated_price
    //   }
    // });
    // if (!calcPrice.data.value) {
    //   return '';
    // }
    price.value = formatPrice(panelConfiguratorStore.calculatedPrice);
  };

  onMounted(async () => {
    await calcPrice();
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
