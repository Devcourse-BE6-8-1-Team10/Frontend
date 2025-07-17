"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useRouter } from "next/navigation";
import PasswordChangeSection from "@/components/features/mypage/PasswordChangeSection";

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("김철수");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const email = "kimcs@example.com";
  const address = "서울시 강남구 테헤란로 123";

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("수정 완료");
  };

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
                  value={email}
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
                  value={address}
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
                <div className="flex justify-end">
                  <Button
                    text="저장"
                    onClick={() => router.push("/member/mypage")}
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
