"use client";

import React, { useState, useEffect } from "react";
import { Order, OrderStatus } from "./types";
import { ORDERS } from "./data/orders";
import Button from "@/src/components/common/Button";

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [originalOrders, setOriginalOrders] = useState<Order[]>([]);
  const [changedOrders, setChangedOrders] = useState<Set<string>>(new Set());
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");

  useEffect(() => {
    setOrders(ORDERS);
    setOriginalOrders(ORDERS);
    setFilteredOrders(ORDERS);
  }, []);

  useEffect(() => {
    let updatedOrders = orders;

    if (searchTerm) {
      updatedOrders = updatedOrders.filter(
        (order) =>
          order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      updatedOrders = updatedOrders.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(updatedOrders);
  }, [searchTerm, statusFilter, orders]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setChangedOrders((prev) => new Set(prev.add(orderId)));
  };

  const handleSave = () => {
    setOriginalOrders(orders);
    setChangedOrders(new Set());
    alert("변경사항이 저장되었습니다.");
  };

  const hasChanges = changedOrders.size > 0;

  const statusOptions: (OrderStatus | "All")[] = [
    "All",
    "주문 접수",
    "준비중",
    "준비 완료",
    "배송중",
    "배송완료",
    "취소",
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">주문 관리</h1>
        <p className="text-gray-500 mt-2">주문 내역을 확인하고 상태를 변경하세요.</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="주문번호, 이름 검색..."
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "All")}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="w-full sm:w-auto"
          text="변경사항 저장"
          fontColor="text-white"
          bgColor="bg-blue-600"
          hoverColor="hover:bg-blue-700"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">주문 정보</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">주문 상품</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">총 가격</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">상태</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className={`transition-colors duration-200 ${changedOrders.has(order.id) ? "bg-yellow-50" : "hover:bg-gray-50"}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                  <div className="text-sm text-gray-600">{order.userName}</div>
                  <div className="text-sm text-gray-500">{order.address}</div>
                  <div className="text-sm text-gray-500">{order.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="text-sm text-gray-600">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.product.name} x {item.quantity} ({(item.product.price * item.quantity).toLocaleString()}원)
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.totalPrice.toLocaleString()}원</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.slice(1).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
