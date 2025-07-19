import {Product} from "@/src/components/features/home/types";

export type OrderStatus = 'ORDERED' | 'PAID' | 'SHIPPING' | 'COMPLETED' | 'CANCELED';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userName: string;
  address: string;
  phoneNumber: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
}
