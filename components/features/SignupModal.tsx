import { Modal } from "@/components/common/Modal";

export function SignupModal({
  onClose,
  onSignupSuccess,
}: {
  onClose: () => void;
  onSignupSuccess: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <div className="p-8 bg-white rounded-lg w-96">
        <h2 className="text-xl font-bold mb-6 text-center">회원가입</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignupSuccess();
          }}
          className="space-y-5"
        >
          <input
            className="border w-full p-3 rounded"
            placeholder="이름"
            type="text"
            required
          />
          <input
            className="border w-full p-3 rounded"
            placeholder="이메일"
            type="email"
            required
          />
          <input
            className="border w-full p-3 rounded"
            placeholder="비밀번호"
            type="password"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded transition"
          >
            회원가입
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <button
            type="button"
            className="text-orange-500 font-semibold hover:underline ml-1"
            onClick={onClose}
          >
            로그인
          </button>
        </div>
      </div>
    </Modal>
  );
}
