"use client";

import { useRouter } from "next/navigation";
import Button from "@/src/components/common/Button";
import { Search } from "lucide-react";

const orders = [
  {
    id: "123456",
    date: "2025-07-01",
    status: "배송완료",
    items: [
      { name: "아메리카노", count: 1, price: 3000 },
      { name: "카페라떼", count: 1, price: 4000 },
    ],
  },
  {
    id: "123457",
    date: "2025-07-10",
    status: "배송중",
    items: [{ name: "콜드브루", count: 1, price: 4500 }],
  },
];

function formatOrderSummary(items: { name: string; count: number }[]) {
  if (items.length === 0) return "-";
  const firstItem = items[0];
  const extraCount = items.length - 1;
  return extraCount > 0
    ? `${firstItem.name} 외 ${extraCount}건`
    : `${firstItem.name}`;
}

function getTotalPrice(items: { count: number; price: number }[]) {
  return items.reduce((sum, item) => sum + item.count * item.price, 0);
}

export default function OrdersPanel() {
  const router = useRouter();

  return (
    <section className="bg-white shadow p-6 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">주문 내역</h2>
        <Button icon={Search} text="더미 버튼" className="invisible" />
      </div>

      <table className="w-full text-left border-t border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-sm text-gray-500 font-medium">주문번호</th>
            <th className="p-3 text-sm text-gray-500 font-medium">주문일</th>
            <th className="p-3 text-sm text-gray-500 font-medium">상태</th>
            <th className="p-3 text-sm text-gray-500 font-medium">주문내역</th>
            <th className="p-3 text-sm text-gray-500 font-medium">결제금액</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => router.push(`/mypage/orders/${order.id}`)}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            >
              <td className="p-3 text-gray-600">{order.id}</td>
              <td className="p-3 text-gray-900">{order.date}</td>
              <td className="p-3 text-gray-900">{order.status}</td>
              <td className="p-3 text-gray-900">
                {formatOrderSummary(order.items)}
              </td>
              <td className="p-3 text-gray-900 font-semibold">
                {getTotalPrice(order.items).toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
