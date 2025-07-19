import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Order as AdminOrder } from "@/src/services/orderService";
import { AdminService } from "@/src/services/adminService";

interface AdminOrderContextType {
  orders: AdminOrder[];
  loading: boolean;
  error: string | null;
  fetchAdminOrders: () => Promise<void>;
}

const AdminOrderContext = createContext<AdminOrderContextType | undefined>(
  undefined
);

export const AdminOrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 관리자 주문 목록 조회
  const fetchAdminOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const adminOrders = await AdminService.getOrders();
      setOrders(
        adminOrders.map((order) => ({
          ...order,
          orderItems: order.orderItems ?? [],
        }))
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "관리자 주문 목록을 불러오는데 실패했습니다.";
      setError(errorMessage);
      setOrders([]);
      console.error("관리자 주문 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AdminOrderContext.Provider
      value={{ orders, loading, error, fetchAdminOrders }}
    >
      {children}
    </AdminOrderContext.Provider>
  );
};

export const useAdminOrders = () => {
  const context = useContext(AdminOrderContext);
  if (context === undefined) {
    throw new Error("useAdminOrders must be used within an AdminOrderProvider");
  }
  return context;
};
