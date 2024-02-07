import {defineStore} from "pinia";
import {PricedProduct} from "@medusajs/medusa/dist/types/pricing";
import {Cart, StoreShippingOptionsListRes} from "@medusajs/medusa";
import {ca} from "date-fns/locale";
import {useMedusaClient} from "#imports";
import {Nullable} from "~/utils/types";

export interface MedusaProduct {
  id: string;
  title: string;
  imageURL: string;
}

export interface BackendState {
  products: any;
  variants: any;
  cart: Nullable<Cart>;
  shipmentOptions: Nullable<StoreShippingOptionsListRes>;
}

export interface ShipmentData {
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
  state: (): BackendState => ({
    products: [],
    variants: [],
    cart: null,
    shipmentOptions: null,
  }),
  actions: {
    async getProducts() {
      const client = useMedusaClient();
      if (client) {
        const {products} = await client.products.list();
        this.products = products;
      }
    },
    async getVariants() {
      const client = useMedusaClient();
      if (client) {
        const {variants} = await client.products.variants.list();
        this.variants = variants;
      }
    },
    async createCart() {
      const client = useMedusaClient();
      if (localStorage.getItem('cart_id')) {
        const {cart} = await client.carts.retrieve(localStorage.getItem('cart_id')!);
        this.cart = cart;
        return;
      }
      const {cart} = await client.carts.create();
      localStorage.setItem('cart_id', cart.id);
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
    },
    async increaseItemQty(itemId: string, quantity: number) {
      const client = useMedusaClient();
      if (this.cart) {
        const {cart} = await client.carts.lineItems.update(this.cart.id, itemId, {quantity});
        this.cart = cart;
        console.log(this.cart, 'updated cart');
      }
    },
    async addShipmentData(shipmentData: ShipmentData) {
      const client = useMedusaClient();
      if (this.cart) {
        await client.carts.update(this.cart.id, {shipping_address: shipmentData});
        console.log(this.cart);
      }
    },
    async changeCartRegionId(region_id: string) {
      const client = useMedusaClient();
      if (this.cart) {
        await client.carts.update(this.cart.id, {region_id});
      }
    },
    async listShipmentOptions(): Promise<typeof this.shipmentOptions | undefined> {
      const client = useMedusaClient();
      if (!this.cart) {
        return;
      }
      this.shipmentOptions = await client.shippingOptions.listCartOptions(this.cart.id);
      return this.shipmentOptions;
    },

    // async getPanelTypes(): Promise<string[]> {
    //   const client = useMedusaClient();
    //   client
    // }
  },
  getters: {}
});

