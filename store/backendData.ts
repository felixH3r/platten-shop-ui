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
  shipmentData: any;
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
    shipmentData: null,
    cart: null,
    shipmentOptions: null,
  }),
  actions: {
    async fetchProducts() {
      const client = useMedusaClient();
      if (client) {
        const {products} = await client.products.list();
        this.products = products;
      }
    },
    async fetchVariants() {
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
    async addPanelToCart(variantId: string, quantity: number, width: number, length: number) {
      const client = useMedusaClient();
      if (this.cart) {
        const metadata = {length: length, width: width};
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
        const {cart} = await client.carts.update(this.cart.id, {shipping_address: shipmentData});
        this.cart = cart;
      }
      this.shipmentData = shipmentData;
    },
    async changeCartRegionId(region_id: string) {
      const client = useMedusaClient();
      if (this.cart) {
        const {cart} = await client.carts.update(this.cart.id, {region_id});
        this.cart = cart;
      }
    },
    async addShipmentMethod(option_id: string) {
      if (this.cart && this.shipmentOptions) {
        const {cart} = await useMedusaClient().carts.addShippingMethod(this.cart.id, {option_id: option_id});
        this.cart = cart;
      }
    },
    async addGuestUser(userEmail: string) {
      if (this.cart) {
        const {cart} = await useMedusaClient().carts.update(this.cart.id, {email: userEmail});
        this.cart = cart;
      }
    },
    async loadShipmentOptions() {
      if (!this.cart) {
        return;
      }
      this.shipmentOptions = await useMedusaClient().shippingOptions.listCartOptions(this.cart.id);
    },
    async createPaymentSession() {
      if (!this.cart) {
        return;
      }
      const {cart} = await useMedusaClient().carts.createPaymentSessions(this.cart.id);
      this.cart = cart;
    },
    async setPaymentSession(provider_id: string) {
      if (!this.cart) {
        return;
      }
      const {cart} = await useMedusaClient().carts.setPaymentSession(this.cart.id, {
        provider_id
      });
      this.cart = cart;
    },
    async completeCart() {
      if (!this.cart) {
        return;
      }
      await useMedusaClient().carts.complete(this.cart.id);
      useBackendDataStore().$reset();
    }
  },
  getters: {
    getCart(): any {
      return this.cart;
    },
    getProducts(): any {
      return this.products;
    },
    getVariants(): any {
      return this.variants;
    }
  }
});

