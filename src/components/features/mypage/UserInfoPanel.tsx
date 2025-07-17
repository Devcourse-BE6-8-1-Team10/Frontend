import Button from "@/src/components/common/Button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserInfoPanel() {
  // 예시 데이터
  const userInfo = {
    name: "김철수",
    email: "kimcs@example.com",
    address: "서울시 강남구 테헤란로 123",
  };

  const router = useRouter();

  return (
    <section className="bg-white shadow p-6 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">회원 정보</h2>
        <Button
          icon={Pencil}
          text="정보 수정하기"
          onClick={() => router.push("/member/mypage/edit")}
          className="border-amber-600 text-amber-600 hover:bg-amber-50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500">이름</label>
          <p className="mt-2 text-lg text-gray-900">{userInfo.name}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500">이메일</label>
          <p className="mt-2 text-lg text-gray-900">{userInfo.email}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-500">기본 배송지</label>
          <p className="mt-2 text-lg text-gray-900">{userInfo.address}</p>
        </div>
      </div>
    </section>
  );
}
