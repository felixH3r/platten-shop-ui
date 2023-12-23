import {defineStore} from 'pinia';
import {PricedProduct, PricedVariant} from "@medusajs/medusa/dist/types/pricing";
import {MedusaProduct} from "~/store/backendData";
import {ProductOptionValue} from "@medusajs/medusa";
import {UnwrapRef} from "vue";

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
    selectedProduct: null as Nullable<PricedProduct>,
    variants: null as Nullable<PricedVariant[]>,
    materials: null as Nullable<ProductOptionValue[]>,
    thicknesses: null as Nullable<ProductOptionValue[]>,
    isDesktop: false,
    isMobile: false,
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
    setSelectProduct(selectedProduct: PricedProduct) {
      this.selectedProduct = selectedProduct;
    },
    setIsDesktop(isDesktop: boolean) {
      this.isDesktop = isDesktop;
    },
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    },
    setVariants(variants: PricedVariant[]) {
      this.variants = variants;
    },
    setMaterials(materials: ProductOptionValue[]) {
      this.materials = materials;
    },
    setThicknesses(thicknesses: ProductOptionValue[]) {
      this.thicknesses = thicknesses;
    }
  },
  getters: {
    getIsDesktop(): boolean {
      return this.isDesktop;
    },
    getIsMobile(): boolean {
      return this.isMobile;
    },
    getVariants(): UnwrapRef<PricedVariant[] | null> {
      return this.variants;
    },
    getMaterials(): UnwrapRef<ProductOptionValue[] | null> {
      return this.materials;
    },
    getThicknesses(): UnwrapRef<ProductOptionValue[] | null> {
      return this.thicknesses;
    }
  }
});
