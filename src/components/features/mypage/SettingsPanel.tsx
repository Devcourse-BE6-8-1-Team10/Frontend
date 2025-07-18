import Button from "@/src/components/common/Button";
import { Settings, LogOut, UserX } from "lucide-react";
import { useUser } from "@/src/components/features/home/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "@/src/components/features/modals/ConfirmModal";

export default function SettingsPanel() {
  const { clearUser, withdraw } = useUser();
  const router = useRouter();
  // ConfirmModal open 상태 관리
  const [confirmOpen, setConfirmOpen] = useState(false);

  // 회원 탈퇴 실제 처리
  const handleWithdraw = async () => {
    try {
      await withdraw();
      clearUser();
      alert("회원 탈퇴가 완료되었습니다.");
      router.push("/");
    } catch (e) {
      alert("회원 탈퇴에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <section className="bg-white shadow p-6 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">설정</h2>
        <Button
          icon={Settings}
          text="설정 초기화"
          className="invisible border-amber-600 text-amber-600 hover:bg-amber-50"
        />
      </div>

      <ul className="space-y-6">
        <li className="flex items-center justify-between pt-6 border-t border-gray-200">
          <p className="text-gray-600">회원 탈퇴</p>
          <Button
            icon={UserX}
            text="회원 탈퇴"
            onClick={() => setConfirmOpen(true)}
            className="border-red-600 text-red-600 hover:bg-red-50"
          />
        </li>
      </ul>
      {/* 회원 탈퇴 확인 모달 */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          handleWithdraw();
        }}
        message={"정말로 회원 탈퇴하시겠습니까?\n이 작업은 되돌릴 수 없습니다."}
      />
    </section>
  );
}
