import {Product} from "@/src/components/features/home/types";

export type OrderStatus = '주문 접수' | '준비중' | '준비 완료' | '배송중' | '배송완료' | '취소';

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
