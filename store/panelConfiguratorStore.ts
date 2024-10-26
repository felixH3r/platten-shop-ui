import type {PricedProduct, PricedVariant} from "@medusajs/medusa/dist/types/pricing";

type PanelInputType = {
  width: number,
  length: number,
}

export const DEFAULT_LENGTH = 1000;
export const DEFAULT_WIDTH = 500;

export const MAX_LENGTH = 2700;
export const MAX_WIDTH = 2000;

export const usePanelConfiguratorStore = defineStore('panelInput', () => {

  const panelInputForm: PanelInputType = reactive({
    width: DEFAULT_WIDTH,
    length: DEFAULT_LENGTH,
  });
  const selectedPanel = ref<Nullable<PricedProduct>>(null);
  const selectedVariant = ref<Nullable<PricedVariant>>(null);
  const calculatedPrice = ref<number>(0);

  const $resetPanelInputForm = () => {
    panelInputForm.width = DEFAULT_WIDTH;
    panelInputForm.length = DEFAULT_LENGTH;
  };

  const setSelectPanel = (panel: PricedProduct) => {
    selectedPanel.value = panel;
  };

  const setSelectedVariant = (variant: PricedVariant) => {
    selectedVariant.value = variant;
  };

  const calculatePrice = async () => {
    if (!selectedVariant.value) {
      return;
    }
    const data = await $fetch('/api/panelPrice', {
      method: 'POST',
      body: {
        width: panelInputForm.width,
        length: panelInputForm.length,
        unitPrice: selectedVariant.value.calculated_price,
      }
    });
    if (!data.calcPrice) {
      return;
    }
    calculatedPrice.value = data.calcPrice;
  };


  return {
    panelInputForm,
    selectedPanel,
    selectedVariant,
    $resetPanelInputForm,
    setSelectedVariant,
    setSelectPanel,
    calculatedPrice,
    calculatePrice,
  };
});
