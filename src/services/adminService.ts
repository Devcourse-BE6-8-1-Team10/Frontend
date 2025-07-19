import client from "@/src/lib/backend/client";
import type { components } from "@/src/lib/backend/api/schema.d.ts";

// 타입 정의
type OrderDto = components["schemas"]["OrderDto"];

export interface Order {
  id: number;
  customerEmail: string;
  createdDate: string;
  state: "ORDERED" | "PAID" | "SHIPPING" | "COMPLETED" | "CANCELED";
  customerAddress: string;
  orderItems: {
    id: number;
    orderId: number;
    productId: number;
    count: number;
    price: number;
  }[];
}

export class AdminService {
  // 관리자용 주문 목록 조회
  static async getOrders(): Promise<Order[]> {
    const { data: response, error } = await client.GET("/api/adm/orders");

    if (error) {
      throw new Error("주문 목록 조회에 실패했습니다.");
    }

    if (!response?.data) {
      return [];
    }

    return response.data;
  }

  // 주문 상세 조회 (관리자용)
  static async getOrderDetail(orderId: number): Promise<OrderDto> {
    const { data: response, error } = await client.GET("/api/orders/{orderId}/detail", {
      params: { path: { orderId } },
    });

    if (error) {
      throw new Error("주문 상세 조회에 실패했습니다.");
    }

    if (!response?.data) {
      throw new Error("주문 상세 정보가 없습니다.");
    }

    return {
      id: response.data.id!,
      customerEmail: response.data.customerEmail!,
      createdDate: response.data.createdDate!,
      state: response.data.state!,
      customerAddress: response.data.customerAddress!,
      orderItems: response.data.orderItems?.map((item) => ({
        id: item.id!,
        orderId: item.orderId!,
        productId: item.productId!,
        count: item.count!,
        price: item.price!,
      })) || [],
    };
  }
} 