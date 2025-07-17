"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound, X } from "lucide-react";
import { Input } from "@/src/components/common/Input";
import Button from "@/src/components/common/Button";

interface Props {
  currentPassword: string;
  password: string;
  confirmPassword: string;
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
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const reset = () => {
    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
    setIsEditing(false);
  };

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

  return (
    <div className="space-y-4">
      <div className="w-full max-w-md">
        <label className="block text-sm text-gray-600 mb-1">
          현재 비밀번호
        </label>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="현재 비밀번호를 입력해 주세요"
        />
      </div>

      <div className="relative w-full max-w-md">
        <label className="block text-sm text-gray-600 mb-1">새 비밀번호</label>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="새 비밀번호를 입력해 주세요"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-7 right-0 flex items-center pr-3 text-gray-400"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
        <p className="mt-1 text-sm text-gray-500">
          영문, 숫자 포함 8자 이상 입력해 주세요.
        </p>
      </div>

      <div className="relative w-full max-w-md">
        <label className="block text-sm text-gray-600 mb-1">
          비밀번호 확인
        </label>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력해 주세요"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute inset-y-7 right-0 flex items-center pr-3 text-gray-400"
        >
          {showConfirmPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
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
