export type RozetkaOffer = {
  $: {
    id: string;
    available: boolean;
  };
  old_price: string[];
  price: string[];
  currencyId: string[];
  categoryId?: string[];
  picture: string[];
  name: string[];
  description: { _: string }[];
  stock_quantity: string[];
  param?: { _: string; $: { name: string } }[];
};
