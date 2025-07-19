"use client";

import React, { useState, useEffect } from "react";
import { Order, OrderStatus } from "./types";
import { ORDERS } from "./data/orders";
import Button from "@/src/components/common/Button";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [originalOrders, setOriginalOrders] = useState<Order[]>([]);
  const [changedOrders, setChangedOrders] = useState<Set<string>>(new Set());
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

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
      updatedOrders = updatedOrders.filter(
        (order) => order.status === statusFilter
      );
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

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "주문 접수":
        return "bg-blue-100 text-blue-800";
      case "준비중":
        return "bg-yellow-100 text-yellow-800";
      case "준비 완료":
        return "bg-green-100 text-green-800";
      case "배송중":
        return "bg-purple-100 text-purple-800";
      case "배송완료":
        return "bg-gray-100 text-gray-800";
      case "취소":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">주문 관리</h1>
        <p className="text-gray-500 mt-2">
          주문 내역을 확인하고 상태를 변경하세요.
        </p>
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
            onChange={(e) =>
              setStatusFilter(e.target.value as OrderStatus | "All")
            }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const isExpanded = expandedOrders.has(order.id);
          const itemsToShow = isExpanded
            ? order.items
            : order.items.slice(0, 2);

          return (
            <div
              key={order.id}
              className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl flex flex-col ${
                changedOrders.has(order.id) ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-lg font-bold text-gray-800">
                    #{order.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
                <div
                  className={`text-xs font-bold py-1 px-3 rounded-full ${getStatusBadgeColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-lg font-semibold text-gray-800">
                  {order.userName}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <FaPhone className="mr-2" />
                  {order.phoneNumber}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <FaMapMarkerAlt className="mr-2" />
                  {order.address}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">주문 상품</h4>
                <ul className="space-y-2">
                  {itemsToShow.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>
                        {item.product.productName} x {item.quantity}
                      </span>
                      <span>
                        {(item.product.price * item.quantity).toLocaleString()}
                        원
                      </span>
                    </li>
                  ))}
                </ul>
                {order.items.length > 2 && (
                  <button
                    onClick={() => toggleExpandOrder(order.id)}
                    className="text-sm text-blue-500 hover:underline mt-2 flex items-center"
                  >
                    {isExpanded ? "접기" : "더보기"}
                    {isExpanded ? (
                      <FaChevronUp className="ml-1" />
                    ) : (
                      <FaChevronDown className="ml-1" />
                    )}
                  </button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-800">총 가격</span>
                  <span className="font-bold text-xl text-blue-600">
                    {order.totalPrice.toLocaleString()}원
                  </span>
                </div>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.slice(1).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderManagement;
