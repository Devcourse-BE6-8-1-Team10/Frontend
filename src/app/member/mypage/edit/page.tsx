"use client";

import { useState, useEffect } from "react";
import { Input } from "@/src/components/common/Input";
import { useRouter } from "next/navigation";
import PasswordChangeSection from "@/src/components/features/mypage/PasswordChangeSection";
import Button from "@/src/components/common/Button";
import { useUser } from "@/src/components/features/home/context/UserContext";
import { AuthGuard } from "@/src/components/common/AuthGuard";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, fetchUserInfo, updateUserInfo } = useUser();

  // 폼 입력값 상태
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // 사용자 정보 초기화
  useEffect(() => {
    if (user) {
      // 사용자 정보가 있으면 name 초기값 설정
      setName(user.name);
    } else {
      // 사용자 정보가 없으면 fetch
      fetchUserInfo();
    }
  }, [user, fetchUserInfo]);

  // 회원 정보 수정 핸들러
  const handleSubmit = async () => {
    // 현재 비밀번호 필수 체크
    if (!currentPassword) {
      alert("현재 비밀번호를 입력해 주세요.");
      return;
    }

    // 새 비밀번호 입력 시 확인 비밀번호 체크
    if (password && password !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // UserContext의 updateUserInfo 함수 호출
      // 현재 비밀번호를 password 필드로 전달 (서버에서 검증용)
      await updateUserInfo({
        name,
        password: password || currentPassword, // 새 비밀번호가 있으면 새 비밀번호, 없으면 현재 비밀번호
      });
      alert("회원 정보가 수정되었습니다.");
      router.back();
    } catch (error) {
      console.error("회원 정보 수정 오류:", error);
      alert("회원 정보 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <AuthGuard requireAuth={true}>
      <main className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-semibold mb-6">회원 정보 수정</h1>

        {!user ? (
          <div>사용자 정보를 불러오는 중...</div>
        ) : (
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
                    현재 비밀번호 <span className="text-red-500">*</span>
                  </th>
                  <td>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="현재 비밀번호를 입력해 주세요"
                      className="max-w-md"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      회원 정보 수정을 위해 현재 비밀번호가 필요합니다.
                    </p>
                  </td>
                </tr>

                <tr>
                  <th className="text-left align-top text-sm text-gray-600 pr-4 pt-2">
                    비밀번호 변경
                  </th>
                  <td>
                    {/* 비밀번호 변경 섹션 */}
                    <PasswordChangeSection
                      password={password}
                      confirmPassword={confirmPassword}
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
        )}
      </main>
    </AuthGuard>
  );
}
