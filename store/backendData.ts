import {defineStore} from "pinia";
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing";

export interface MedusaProduct {
  id: string;
  title: string;
  imageURL: string;
}

export interface BackendState {
  products: any;
}

export const useBackendDataStore = defineStore('backend', {
  state: (): BackendState => ({
    products: [],
  }),
  actions: {
    async getProducts() {
      const client = useMedusaClient();
      if (client) {
        const {products} = await client.products.list();
        this.products = products;
        // products.map((value, index) => {
        //   this.products[index].id = value.id!;
        //   this.products[index].title = value.title!;
        //   this.products[index].imageURL = value.images![0].url;
        // });
      }
    }
  }
});
