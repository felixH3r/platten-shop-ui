export type Nullable<T> = T | null;

export interface MaterialOptions {
    material: string;
    possibleThickness: [
        {
            value: string,
            variantId: string
        }
    ];
}

export enum PAYMENT_OPTIONS {
    INVOICE = 'invoice',
    CREDIT_CARD = 'creditCard',
    PAYPAL = 'paypal'
}
