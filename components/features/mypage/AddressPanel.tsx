import Button from "@/components/common/Button";
import { Plus, Edit } from "lucide-react";

export default function AddressPanel() {
  // 예시 데이터
  const addresses = [
    {
      id: 1,
      label: "서울시 강남구 테헤란로 123",
      isDefault: true,
    },
    {
      id: 2,
      label: "경기도 성남시 분당구 수내동 456",
      isDefault: false,
    },
  ];

  return (
    <section className="bg-white shadow p-6 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">주소 관리</h2>
        <Button
          icon={Plus}
          text="주소 추가"
          onClick={() => console.log("주소 추가")}
          className="border-amber-600 text-amber-600 hover:bg-amber-50"
        />
      </div>

      <ul className="space-y-4">
        {addresses.map((address) => (
          <li
            key={address.id}
            className="border border-gray-200 rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg text-gray-900 font-medium">
                {address.label}
              </p>
              {address.isDefault && (
                <span className="text-sm text-amber-600 font-medium">
                  (기본 배송지)
                </span>
              )}
            </div>
            <button className="text-base text-amber-600 hover:underline font-medium">
              수정
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
