import {defineStore} from 'pinia';
import {
  type PricedProduct,
  type PricedVariant
} from "@medusajs/medusa/dist/types/pricing";
import {ProductOptionValue} from "@medusajs/medusa";
import {type UnwrapRef} from "vue";
import {type Nullable, PAYMENT_OPTIONS} from "~/utils/types";
import {DEFAULT_LENGTH, DEFAULT_WIDTH} from "./panelConfiguratorStore";

export const DEFAULT_THICKNESS = 0;

export interface CreditCard {
  card_no: string,
  expire_date: string,
  cvv: string
}

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      // panelConfigurator: {
      //   panelType: '',
      //   thickness: DEFAULT_THICKNESS,
      //   length: DEFAULT_LENGTH,
      //   width: DEFAULT_WIDTH,
      // },
      // selectedProduct: null as Nullable<PricedProduct>,
      // selectedVariant: null as Nullable<Partial<PricedVariant>>,
      // variantsSelectedProduct: null as Nullable<PricedVariant[]>,
      // materials: null as Nullable<ProductOptionValue[]>,
      // thicknesses: null as Nullable<ProductOptionValue[]>,
      isDesktop: false,
      isMobile: false,
      selectedPaymentOption: null as Nullable<PAYMENT_OPTIONS>,
    };
  },
  actions: {
    // setPanelType(panelType: string) {
    //   this.panelConfigurator.panelType = panelType;
    // },
    // setThickness(thickness: number) {
    //   this.panelConfigurator.thickness = thickness;
    // },
    // setLength(length: number) {
    //   this.panelConfigurator.length = length;
    // },
    // setWidth(width: number) {
    //   this.panelConfigurator.width = width;
    // },
    // setSelectProduct(selectedProduct: PricedProduct) {
    //   this.selectedProduct = selectedProduct;
    // },
    // setSelectedVariant(selectedVariant: Partial<PricedVariant>) {
    //   this.selectedVariant = selectedVariant;
    // },
    setIsDesktop(isDesktop: boolean) {
      this.isDesktop = isDesktop;
    },
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    },
    // setVariantsSelectedProduct(variantsSelectedProduct: PricedVariant[]) {
    //   this.variantsSelectedProduct = variantsSelectedProduct;
    // },
    // setMaterials(materials: ProductOptionValue[]) {
    //   this.materials = materials;
    // },
    // setThicknesses(thicknesses: ProductOptionValue[]) {
    //   this.thicknesses = thicknesses;
    // },
    setPaymentOption(paymentOption: PAYMENT_OPTIONS) {
      this.selectedPaymentOption = paymentOption;
    },
  },
  getters: {
    getIsDesktop(): boolean {
      return this.isDesktop;
    },
    getIsMobile(): boolean {
      return this.isMobile;
    },
    // getVariants(): UnwrapRef<PricedVariant[] | null> {
    //   return this.variantsSelectedProduct;
    // },
    // getMaterials(): UnwrapRef<ProductOptionValue[] | null> {
    //   return this.materials;
    // },
    // getThicknesses(): UnwrapRef<ProductOptionValue[] | null> {
    //   return this.thicknesses;
    // },
    // getSelectedVariant(): UnwrapRef<Partial<PricedVariant> | null> {
    //   return this.selectedVariant;
    // },
    getSelectedPaymentOption(): PAYMENT_OPTIONS | null {
      return this.selectedPaymentOption;
    },
    // getPanelWidth(): number {
    //   return this.panelConfigurator.width;
    // },
    // getPanelLength(): number {
    //   return this.panelConfigurator.length;
    // },
  }
});
