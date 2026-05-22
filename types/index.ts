export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  size: string;
  color: string;
  quantity: number;
};

export type ShippingInfo = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  address: string;
  city: string;
  postalCode: string;
};

export type Order = {
  id: number;
  placedAt: string;
  shippingInfo: ShippingInfo;
  items: CartItem[];
};

