import client from "../client";
import type { components } from "../api/schema.d.ts";

// 타입 정의
type OrderCreateReqBody = components["schemas"]["OrderCreateReqBody"];
type OrderUpdateAddressReqBody = components["schemas"]["OrderUpdateAddressReqBody"];
type OrderDto = components["schemas"]["OrderDto"];
type OrderDtoWithSpecific = components["schemas"]["OrderDtoWithSpecific"];
type UserOrderResponseBody = components["schemas"]["UserOrderResponseBody"];
type UserOrderDetailResponseBody = components["schemas"]["UserOrderDetailResponseBody"];

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  count: number;
  price: number;
}

export interface Order {
  id: number;
  customerEmail: string;
  createdDate: string;
  state: "ORDERED" | "PAID" | "SHIPPING" | "COMPLETED" | "CANCELED";
  customerAddress: string;
  orderItems: OrderItem[];
}

export interface UserOrder {
  orderId: number;
  orderDate: string;
  status: string;
  customerAddress: string;
  orderItems: {
    productName: string;
    productId: number;
    count: number;
    price: number;
  }[];
}

export interface UserOrderDetail {
  orderId: number;
  orderDate: string;
  status: string;
  customerAddress: string;
  orderItems: {
    productName: string;
    productId: number;
    productImageUrl: string;
    productCategory: string;
    count: number;
    price: number;
  }[];
}

export class OrderService {
  // 주문 생성
  static async createOrder(data: OrderCreateReqBody): Promise<Order> {
    const { data: response, error } = await client.POST("/api/orders", {
      body: data,
    });

    if (error) {
      throw new Error("주문 생성에 실패했습니다.");
    }

    if (!response?.data) {
      throw new Error("주문 생성 응답 데이터가 없습니다.");
    }

    return response.data;
  }

  // 주문 상세 조회 (관리자용)
  static async getOrderDetail(orderId: number): Promise<OrderDtoWithSpecific> {
    const { data: response, error } = await client.GET("/api/orders/{orderId}/detail", {
      params: { path: { orderId } },
    });

    if (error) {
      throw new Error("주문 상세 조회에 실패했습니다.");
    }

    if (!response?.data) {
      throw new Error("주문 상세 정보가 없습니다.");
    }

    return response.data;
  }

  // 회원의 주문 내역 전체 조회
  static async getMemberOrders(): Promise<UserOrder[]> {
    const { data: response, error } = await client.GET("/api/members/orders");

    if (error) {
      throw new Error("주문 내역 조회에 실패했습니다.");
    }

    if (!response?.data) {
      return [];
    }

    return response.data.map((order) => ({
      orderId: order.orderId!,
      orderDate: order.orderDate!,
      status: order.status!,
      customerAddress: order.customerAddress!,
      orderItems: order.orderItems?.map((item) => ({
        productName: item.productName!,
        productId: item.productId!,
        count: item.count!,
        price: item.price!,
      })) || [],
    }));
  }

  // 회원의 특정 주문 내역 상세 조회
  static async getMemberOrderDetail(orderId: number): Promise<UserOrderDetail> {
    const { data: response, error } = await client.GET("/api/members/orders/{orderId}", {
      params: { path: { orderId } },
    });

    if (error) {
      throw new Error("주문 상세 조회에 실패했습니다.");
    }

    if (!response?.data) {
      throw new Error("주문 상세 정보가 없습니다.");
    }

    return {
      orderId: response.data.orderId!,
      orderDate: response.data.orderDate!,
      status: response.data.status!,
      customerAddress: response.data.customerAddress!,
      orderItems: response.data.orderItems?.map((item) => ({
        productName: item.productName!,
        productId: item.productId!,
        productImageUrl: item.productImageUrl!,
        productCategory: item.productCategory!,
        count: item.count!,
        price: item.price!,
      })) || [],
    };
  }

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

  // 주문 취소
  static async cancelOrder(orderId: number): Promise<void> {
    const { error } = await client.DELETE("/api/orders/{orderId}", {
      params: { path: { orderId } },
    });

    if (error) {
      throw new Error("주문 취소에 실패했습니다.");
    }
  }

  // 주문 주소 변경
  static async updateOrderAddress(orderId: number, newAddress: string): Promise<void> {
    const { error } = await client.PUT("/api/orders/{orderId}/address", {
      params: { path: { orderId } },
      body: { newAddress },
    });

    if (error) {
      throw new Error("주문 주소 변경에 실패했습니다.");
    }
  }
} 