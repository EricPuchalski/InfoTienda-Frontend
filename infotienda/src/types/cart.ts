export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl?: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  totalPrice: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface MergeCartRequest {
  items: {
    productId: number;
    quantity: number;
  }[];
}

export type DeliveryMethod = 'SHIPPING' | 'PICKUP';

export interface ShippingAddress {
  street: string;
  number: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  reference?: string;
}

export interface CheckoutRequest {
  deliveryMethod: DeliveryMethod;
  shippingAddress?: ShippingAddress;
  pickupStoreName?: string;
  receiverName?: string;
}

export interface CheckoutResponse {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
}
