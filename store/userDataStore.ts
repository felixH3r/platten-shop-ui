import {defineStore} from "pinia";
import {useMedusaClient} from "#imports";
import {type Nullable} from "~/utils/types";

export interface UserDataState {
  shipmentData: Nullable<UserData>;
  invoiceData: Nullable<UserData>;
}

export interface UserData {
  company: string,
  first_name: string,
  last_name: string,
  address_1: string,
  address_2: string,
  city: string,
  country_code: string,
  province: string,
  postal_code: string,
  phone: string,
}


export const useBackendDataStore = defineStore('backend', {
  state: (): UserDataState => ({
    shipmentData: null,
    invoiceData: null
  }),
  actions: {
    setShipmentData(shipmentData: UserData): void {
      this.shipmentData = shipmentData;
    },
    setInvoiceData(invoiceData: UserData): void {
      this.invoiceData = invoiceData;
    }
  },
  getters: {
    getShipmentData(): UserData | null {
      return this.shipmentData;
    },
    getInvoiceData(): UserData | null {
      return this.invoiceData;
    }
  }
});

