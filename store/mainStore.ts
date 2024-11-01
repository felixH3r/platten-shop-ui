import {defineStore} from 'pinia';
import {
  type PricedProduct,
  type PricedVariant
} from "@medusajs/medusa/dist/types/pricing";
import {ProductOptionValue} from "@medusajs/medusa";
import {type UnwrapRef} from "vue";
import {type Nullable, PAYMENT_OPTIONS} from "~/utils/types";
import {DEFAULT_LENGTH, DEFAULT_WIDTH} from "./panelConfiguratorStore";

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      isDesktop: false,
      isMobile: false,
      selectedPaymentOption: null as Nullable<PAYMENT_OPTIONS>,
    };
  },
  actions: {
    setIsDesktop(isDesktop: boolean) {
      this.isDesktop = isDesktop;
    },
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    },
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
    getSelectedPaymentOption(): PAYMENT_OPTIONS | null {
      return this.selectedPaymentOption;
    },
  }
});
