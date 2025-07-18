import { Order } from "@/src/components/features/admin/types";
import { PRODUCTS } from "@/src/components/features/home/data/products";

export const ORDERS: Order[] = [
  {
    id: "1",
    userName: "김철수",
    address: "서울시 강남구 테헤란로 123",
    phoneNumber: "010-1234-5678",
    items: [
      { product: PRODUCTS[0], quantity: 2, price: PRODUCTS[0].price },
      { product: PRODUCTS[2], quantity: 1, price: PRODUCTS[2].price },
    ],
    totalPrice: PRODUCTS[0].price * 2 + PRODUCTS[2].price * 1,
    status: "주문 접수",
  },
  {
    id: "2",
    userName: "이영희",
    address: "경기도 성남시 분당구 판교역로 456",
    phoneNumber: "010-9876-5432",
    items: [
      { product: PRODUCTS[1], quantity: 1, price: PRODUCTS[1].price },
      { product: PRODUCTS[3], quantity: 3, price: PRODUCTS[3].price },
    ],
    totalPrice: PRODUCTS[1].price * 1 + PRODUCTS[3].price * 3,
    status: "준비중",
  },
  {
    id: "3",
    userName: "박지성",
    address: "인천시 연수구 송도국제대로 789",
    phoneNumber: "010-5555-4444",
    items: [
      { product: PRODUCTS[4], quantity: 1, price: PRODUCTS[4].price },
    ],
    totalPrice: PRODUCTS[4].price * 1,
    status: "배송완료",
  },
];

