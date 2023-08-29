import {defineStore} from "pinia";
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing";
import {Cart} from "@medusajs/medusa";
import {ca} from "date-fns/locale";

export interface MedusaProduct {
  id: string;
  title: string;
  imageURL: string;
}

export interface BackendState {
  products: any;
  cart: Nullable<Cart>;
}

export const useBackendDataStore = defineStore('backend', {
  state: (): BackendState => ({
    products: [],
    cart: null
  }),
  actions: {
    async getProducts() {
      const client = useMedusaClient();
      if (client) {
        const {products} = await client.products.list();
        this.products = products;
      }
    },
    async createCart() {
      const client = useMedusaClient();
      const {cart} = await client.carts.create();
      this.cart = cart;
    },
    async addItemToCart(variantId: string, quantity: number) {
      const client = useMedusaClient();
      if (this.cart) {
        const metadata = {length: 900, width: 200};
        const {cart} = await client.carts.lineItems.create(this.cart.id, {variant_id: variantId, quantity, metadata});
        // client.carts.lineItems.update(this.cart.id, {})
        cart.metadata = {length: 100, width: 200};
        console.log(cart.subtotal, 'subtotal');
        console.log(cart.items, 'line items');
        this.cart = cart;
      }
    }
  }
});
