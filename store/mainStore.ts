import {defineStore} from 'pinia';
import {Product} from "~/store/posts";

export const DEFAULT_THICKNESS = 0;
export const DEFAULT_LENGTH = 2000;
export const DEFAULT_WIDTH = 1000;

export const useMainStore = defineStore('main', {
  state: () => ({
    panelConfigurator: {
      thickness: DEFAULT_THICKNESS,
      length: DEFAULT_LENGTH,
      width: DEFAULT_WIDTH,
    },
    selectedProduct: null as Nullable<Product>
  }),
  actions: {
    setThickness(thickness: number) {
      this.panelConfigurator.thickness = thickness;
    },
    setLength(length: number) {
      this.panelConfigurator.length = length;
    },
    setWidth(width: number) {
      this.panelConfigurator.width = width;
    },
    setSelectedProduct(selectedProduct: Product) {
      this.selectedProduct = selectedProduct;
    }
  },
});
