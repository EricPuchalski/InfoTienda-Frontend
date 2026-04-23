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
