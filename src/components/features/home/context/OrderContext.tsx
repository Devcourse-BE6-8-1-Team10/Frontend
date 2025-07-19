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
import { OrderService } from "@/src/lib/backend/services/orderService";

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

export function OrderProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 회원 주문 목록 조회
  const fetchOrders = useCallback(async () => {
    if (!user) {
      setOrders([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const memberOrders = await OrderService.getMemberOrders();

      // 서버 응답을 프론트엔드 Order 타입으로 변환
      const convertedOrders: Order[] = memberOrders.map((order) => ({
        id: order.orderId,
        customerEmail: user?.email || "", // 현재 로그인한 사용자 이메일 사용
        createdDate: order.orderDate,
        state: order.status,
        customerAddress: order.customerAddress,
        orderItems: order.orderItems.map((item, idx) => ({
          id: idx, // 임시 ID
          orderId: order.orderId,
          productId: item.productId,
          count: item.count,
          price: item.price,
          name: item.productName,
        })),
      }));

      setOrders(convertedOrders);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "주문 목록을 불러오는데 실패했습니다.";
      setError(errorMessage);
      console.error("주문 목록 조회 실패:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user, fetchOrders]);

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
