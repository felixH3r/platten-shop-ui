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
