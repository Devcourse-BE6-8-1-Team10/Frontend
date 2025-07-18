"use client";

import { useState } from "react";
import { KeyRound, X } from "lucide-react";
import Button from "@/src/components/common/Button";
import { PasswordInput } from "@/src/components/common/PasswordInput";

// 비밀번호 변경 섹션: 마이페이지/회원정보수정 등에서 사용
// 편집 모드/입력값 상태 관리, PasswordInput 공통 컴포넌트 사용
interface Props {
  currentPassword: string; // 현재 비밀번호
  password: string; // 새 비밀번호
  confirmPassword: string; // 새 비밀번호 확인
  setCurrentPassword: (v: string) => void;
  setPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
}

export default function PasswordChangeSection({
  currentPassword,
  password,
  confirmPassword,
  setCurrentPassword,
  setPassword,
  setConfirmPassword,
}: Props) {
  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);

  // 입력값 초기화 및 편집 종료
  const reset = () => {
    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
    setIsEditing(false);
  };

  // 편집 모드가 아니면 '비밀번호 변경' 버튼만 노출
  if (!isEditing) {
    return (
      <Button
        icon={KeyRound}
        text="비밀번호 변경"
        onClick={() => setIsEditing(true)}
        className="border-amber-600 text-amber-600 hover:bg-amber-50"
      />
    );
  }

  // 편집 모드: 비밀번호 입력 폼 노출
  return (
    <div className="space-y-4">
      <div className="w-full max-w-md">
        <label className="block text-sm text-gray-600 mb-1">
          현재 비밀번호
        </label>
        {/* 현재 비밀번호 입력 */}
        <PasswordInput
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="현재 비밀번호를 입력해 주세요"
        />
      </div>

      <div className="w-full max-w-md">
        <label className="block text-sm text-gray-600 mb-1">새 비밀번호</label>
        {/* 새 비밀번호 입력 */}
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="새 비밀번호를 입력해 주세요"
        />
        <p className="mt-1 text-sm text-gray-500">
          영문, 숫자 포함 8자 이상 입력해 주세요.
        </p>
      </div>

      <div className="w-full max-w-md">
        <label className="block text-sm text-gray-600 mb-1">
          비밀번호 확인
        </label>
        {/* 새 비밀번호 확인 입력 */}
        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력해 주세요"
        />
      </div>

      <div className="pt-2">
        <Button
          icon={X}
          text="취소"
          onClick={reset}
          className="text-sm border-gray-300 text-gray-600 hover:bg-gray-100"
        />
      </div>
    </div>
  );
}
