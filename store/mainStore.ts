import {defineStore} from 'pinia';
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing";
import {MedusaProduct} from "~/store/backendData";

export const DEFAULT_THICKNESS = 0;
export const DEFAULT_LENGTH = 2000;
export const DEFAULT_WIDTH = 1000;

export const useMainStore = defineStore('main', {
  state: () => ({
    panelConfigurator: {
      panelType: '',
      thickness: DEFAULT_THICKNESS,
      length: DEFAULT_LENGTH,
      width: DEFAULT_WIDTH,
    },
    selectedProduct: null as Nullable<PricedProduct>
  }),
  actions: {
    setPanelType(panelType: string) {
      this.panelConfigurator.panelType = panelType;
    },
    setThickness(thickness: number) {
      this.panelConfigurator.thickness = thickness;
    },
    setLength(length: number) {
      this.panelConfigurator.length = length;
    },
    setWidth(width: number) {
      this.panelConfigurator.width = width;
    },
    setSelectedProduct(selectedProduct: PricedProduct) {
      this.selectedProduct = selectedProduct;
    }
  },
});
