import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { ModalContent } from "@/components/common/ModalContent";
import { Input } from "@/components/common/Input";
import { PrimaryButton } from "@/components/common/PrimaryButton";

export function LoginModal({
  onClose,
  onLoginSuccess,
}: {
  onClose: () => void;
  onLoginSuccess: () => void;
}) {
  const router = useRouter();

  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <div className="flex flex-col items-center mb-6">
          <LogIn className="h-10 w-10 text-amber-600 mb-2" />
          <h2 className="text-xl font-bold text-center text-gray-800">
            로그인
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLoginSuccess();
          }}
          className="space-y-5"
        >
          <Input placeholder="이메일" type="email" />
          <Input placeholder="비밀번호" type="password" />
          <PrimaryButton type="submit">로그인</PrimaryButton>
        </form>
        <div className="mt-8 text-center text-sm text-gray-600">
          아직 회원이 아니신가요?
          <button
            type="button"
            className="text-amber-600 font-semibold hover:underline ml-1"
            onClick={() => router.replace("/member/signup")}
          >
            회원가입
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
}
