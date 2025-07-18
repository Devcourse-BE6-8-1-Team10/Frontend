"use client";

import { useState, useEffect } from "react";
import { Input } from "@/src/components/common/Input";
import { useRouter } from "next/navigation";
import PasswordChangeSection from "@/src/components/features/mypage/PasswordChangeSection";
import Button from "@/src/components/common/Button";
import { useUser } from "@/src/components/features/home/context/UserContext";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, fetchUserInfo, updateUserInfo } = useUser();

  // 폼 입력값 상태
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // 사용자 정보 초기화 및 인증 체크
  useEffect(() => {
    if (!isAuthenticated) {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      router.push("/member/login");
      return;
    }

    if (!user) {
      // 인증은 되었지만 사용자 정보가 없는 경우 fetch
      fetchUserInfo();
    } else {
      // 사용자 정보가 있으면 name 초기값 설정
      setName(user.name);
    }
  }, [isAuthenticated, user, fetchUserInfo, router]);

  // 회원 정보 수정 핸들러
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      // UserContext의 updateUserInfo 함수 호출
      await updateUserInfo({ name, password: password || undefined });
      alert("회원 정보가 수정되었습니다.");
      router.back();
    } catch (error) {
      alert("회원 정보 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 인증되지 않은 경우 로딩 표시
  if (!isAuthenticated) {
    return (
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div>로그인 페이지로 이동 중...</div>
      </main>
    );
  }

  // 사용자 정보 로딩 중
  if (!user) {
    return (
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div>사용자 정보를 불러오는 중...</div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6">회원 정보 수정</h1>

      <section className="bg-white shadow p-8 rounded">
        <table className="w-full table-fixed border-separate border-spacing-y-6">
          <tbody>
            <tr>
              <th className="text-left align-top text-sm text-gray-600 w-36 pr-4 pt-2">
                이메일
              </th>
              <td>
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  className="max-w-md bg-gray-100 text-gray-500"
                />
              </td>
            </tr>

            <tr>
              <th className="text-left align-top text-sm text-gray-600 pr-4 pt-2">
                이름
              </th>
              <td>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-md"
                />
              </td>
            </tr>

            <tr>
              <th className="text-left align-top text-sm text-gray-600 pr-4 pt-2">
                비밀번호
              </th>
              <td>
                {/* 비밀번호 변경 섹션 */}
                <PasswordChangeSection
                  currentPassword={currentPassword}
                  password={password}
                  confirmPassword={confirmPassword}
                  setCurrentPassword={setCurrentPassword}
                  setPassword={setPassword}
                  setConfirmPassword={setConfirmPassword}
                />
              </td>
            </tr>

            <tr>
              <th className="text-left align-top text-sm text-gray-600 pr-4 pt-2">
                기본 배송지
              </th>
              <td>
                <Input
                  type="text"
                  value="주소는 주소 관리 탭에서 변경 가능합니다"
                  disabled
                  className="max-w-md bg-gray-100 text-gray-500"
                />
                <p className="text-sm text-gray-500 mt-2">
                  주소 변경은 마이페이지의 <strong>주소 관리</strong> 탭에서
                  가능합니다.
                </p>
              </td>
            </tr>

            <tr>
              <td colSpan={2} className="pt-8 pr-1">
                <div className="flex justify-end gap-3">
                  <Button
                    text="취소"
                    onClick={() => router.back()}
                    bgColor="bg-white"
                    fontColor="text-gray-700"
                    hoverColor="hover:bg-gray-100"
                    className="px-6"
                  />
                  <Button
                    text="저장"
                    onClick={handleSubmit}
                    bgColor="bg-amber-600"
                    hoverColor="hover:bg-amber-500"
                    fontColor="text-white"
                    className="px-6"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
