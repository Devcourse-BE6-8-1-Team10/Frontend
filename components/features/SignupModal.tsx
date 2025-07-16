import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { ModalContent } from "@/components/common/ModalContent";
import { Input } from "@/components/common/Input";
import { PrimaryButton } from "@/components/common/PrimaryButton";

export function SignupModal({
  onClose,
  onSignupSuccess,
}: {
  onClose: () => void;
  onSignupSuccess: () => void;
}) {
  const router = useRouter();

  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <div className="flex flex-col items-center mb-6">
          <UserPlus className="h-10 w-10 text-amber-600 mb-2" />
          <h2 className="text-xl font-bold text-center text-gray-800">
            회원가입
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignupSuccess();
          }}
          className="space-y-5"
        >
          <Input placeholder="이름" type="text" required />
          <Input placeholder="이메일" type="email" required />
          <Input placeholder="비밀번호" type="password" required />
          <PrimaryButton type="submit">회원가입</PrimaryButton>
        </form>
        <div className="mt-8 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <button
            type="button"
            className="text-amber-600 font-semibold hover:underline ml-1"
            onClick={() => router.replace("/member/login")}
          >
            로그인
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
}
