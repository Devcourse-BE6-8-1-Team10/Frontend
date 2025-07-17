import Button from "@/components/common/Button";
import { Search } from "lucide-react";

export default function OrdersPanel() {
  // 예시 주문 데이터
  const orders = [
    {
      id: "123456",
      date: "2025-07-01",
      status: "배송완료",
    },
    {
      id: "123457",
      date: "2025-07-10",
      status: "배송중",
    },
  ];

  return (
    <section className="bg-white shadow p-6 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">주문 내역</h2>
        {/* 정렬을 위해 더미 버튼 추가 */}
        <Button icon={Search} text="상세 조회" className="invisible" />
      </div>

      <table className="w-full text-left border-t border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-sm text-gray-500 font-medium">주문번호</th>
            <th className="p-3 text-sm text-gray-500 font-medium">주문일</th>
            <th className="p-3 text-sm text-gray-500 font-medium">상태</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100">
              <td className="p-3 text-lg text-gray-900 font-medium">
                {order.id}
              </td>
              <td className="p-3 text-lg text-gray-900 font-medium">
                {order.date}
              </td>
              <td className="p-3 text-lg text-gray-900 font-medium">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
