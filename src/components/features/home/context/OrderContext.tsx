"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useUser } from "@/src/components/features/home/context/UserContext";

// 서버 스키마 기반 + 프론트 전용 상품명(name)만 추가
export interface OrderItem {
  id: number; // 주문 아이템 ID
  orderId: number;
  productId: number;
  count: number;
  price: number;
  /**
   * 프론트 전용: 상품명 (실제 서버 컬럼명은 name, itemName 등으로 변경될 수 있음)
   * 실제 API 연동 시 서버에서 내려주는 필드명에 맞게 교체 필요
   */
  name?: string;
}

export interface Order {
  id: number;
  customerEmail: string;
  createdDate: string;
  state: string;
  customerAddress: string;
  orderItems: OrderItem[];
}

export interface CreateOrderData {
  customerEmail: string;
  customerAddress: string;
  orderItems: { productId: number; count: number }[];
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (orderData: CreateOrderData) => Promise<Order>;
  cancelOrder: (orderId: number) => Promise<void>;
  updateOrderAddress: (orderId: number, address: string) => Promise<void>;
  getOrderById: (orderId: number) => Order | undefined;
  getOrdersByStatus: (state: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// 더미 데이터 (orderItems에만 name 필드 추가)
const defaultOrders: Order[] = [
  {
    id: 123458,
    customerEmail: "kimcs@example.com",
    createdDate: "2025-07-15T10:00:00",
    state: "접수 전",
    customerAddress: "서울시 강남구 테헤란로 123",
    orderItems: [
      {
        id: 1,
        orderId: 123458,
        productId: 1,
        count: 2,
        price: 3000,
        name: "아메리카노",
      },
      {
        id: 2,
        orderId: 123458,
        productId: 2,
        count: 1,
        price: 4500,
        name: "카페모카",
      },
      {
        id: 3,
        orderId: 123458,
        productId: 3,
        count: 1,
        price: 4000,
        name: "티라떼",
      },
    ],
  },
  {
    id: 123457,
    customerEmail: "kimcs@example.com",
    createdDate: "2025-07-10T14:30:00",
    state: "배송중",
    customerAddress: "서울특별시 종로구 사직로 9",
    orderItems: [
      {
        id: 4,
        orderId: 123457,
        productId: 4,
        count: 1,
        price: 4500,
        name: "콜드브루",
      },
    ],
  },
  {
    id: 123456,
    customerEmail: "kimcs@example.com",
    createdDate: "2025-07-01T09:15:00",
    state: "배송완료",
    customerAddress: "서울특별시 마포구 상암동 123",
    orderItems: [
      {
        id: 5,
        orderId: 123456,
        productId: 1,
        count: 1,
        price: 3000,
        name: "아메리카노",
      },
      {
        id: 6,
        orderId: 123456,
        productId: 5,
        count: 1,
        price: 4000,
        name: "카페라떼",
      },
    ],
  },
];

export function OrderProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setOrders(defaultOrders);
    } else {
      setOrders([]);
    }
  }, [user]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders(defaultOrders);
    } catch (err) {
      setError("주문 목록을 불러오는데 실패했습니다.");
      console.error("주문 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(
    async (orderData: CreateOrderData): Promise<Order> => {
      setLoading(true);
      setError(null);
      try {
        // 실제 서버에선 name 없이 productId, count만 전송, 프론트에서 name 매핑 필요
        const newOrder: Order = {
          id: Date.now(),
          customerEmail: orderData.customerEmail,
          createdDate: new Date().toISOString(),
          state: "접수 전",
          customerAddress: orderData.customerAddress,
          orderItems: orderData.orderItems.map((item, idx) => ({
            id: Date.now() + idx,
            orderId: Date.now(),
            productId: item.productId,
            count: item.count,
            price: 3000, // TODO: 실제 상품 가격 매핑 필요
            name: `상품${item.productId}`, // 프론트 전용, 실제 서버 컬럼명에 맞게 교체 필요
          })),
        };
        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
      } catch (err) {
        setError("주문 생성에 실패했습니다.");
        console.error("주문 생성 실패:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const cancelOrder = useCallback(async (orderId: number) => {
    setLoading(true);
    setError(null);
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, state: "취소됨" } : order
        )
      );
    } catch (err) {
      setError("주문 취소에 실패했습니다.");
      console.error("주문 취소 실패:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderAddress = useCallback(
    async (orderId: number, address: string) => {
      setLoading(true);
      setError(null);
      try {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? { ...order, customerAddress: address }
              : order
          )
        );
      } catch (err) {
        setError("배송지 변경에 실패했습니다.");
        console.error("배송지 변경 실패:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getOrderById = useCallback(
    (orderId: number): Order | undefined => {
      return orders.find((order) => order.id === orderId);
    },
    [orders]
  );

  const getOrdersByStatus = useCallback(
    (state: string): Order[] => {
      return orders.filter((order) => order.state === state);
    },
    [orders]
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        createOrder,
        cancelOrder,
        updateOrderAddress,
        getOrderById,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
