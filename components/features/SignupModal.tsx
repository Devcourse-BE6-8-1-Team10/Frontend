import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <div className="flex flex-col items-center mb-4">
          <UserPlus className="h-10 w-10 text-amber-600 mb-2" />
          <h2 className="text-xl font-bold text-center text-gray-800">
            회원가입
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            우아한 카페에 오신 것을 환영합니다.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignupSuccess();
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <Input placeholder="이름을 입력해 주세요" type="text" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <Input placeholder="example@cafe.com" type="email" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <div className="relative">
              <Input
                placeholder="비밀번호를 입력해 주세요"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              영문, 숫자 포함 8자 이상 입력해 주세요.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <div className="relative">
              <Input
                placeholder="비밀번호를 다시 입력해 주세요"
                type={showConfirmPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
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
