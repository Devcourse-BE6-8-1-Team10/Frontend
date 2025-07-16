import { Modal } from "@/components/common/Modal";

export function LoginModal({
  onClose,
  onLoginSuccess,
}: {
  onClose: () => void;
  onLoginSuccess: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8 bg-white rounded-lg w-96">
        <h2 className="text-xl font-bold mb-6 text-center">LOGIN</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLoginSuccess();
          }}
          className="space-y-5"
        >
          <input
            className="border w-full p-3 rounded"
            placeholder="이메일"
            type="email"
          />
          <input
            className="border w-full p-3 rounded"
            placeholder="비밀번호"
            type="password"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded"
          >
            로그인
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-gray-600">
          아직 회원이 아니신가요?{" "}
          <button
            type="button"
            className="text-black font-semibold hover:underline ml-1"
            onClick={onClose}
          >
            회원가입
          </button>
        </div>
      </div>
    </Modal>
  );
}
