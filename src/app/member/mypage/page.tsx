"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MypageTabs from "@/src/components/features/mypage/MypageTabs";
import UserInfoPanel from "@/src/components/features/mypage/UserInfoPanel";
import AddressPanel from "@/src/components/features/mypage/AddressPanel";
import OrdersPanel from "@/src/components/features/mypage/OrdersPanel";
import SettingsPanel from "@/src/components/features/mypage/SettingsPanel";
import { useUser } from "@/src/components/features/home/context/UserContext";

export default function Mypage() {
  const [activeTab, setActiveTab] = useState<
    "info" | "address" | "orders" | "settings"
  >("info");

  const { user, isAuthenticated, fetchUserInfo } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      router.push("/member/login");
      return;
    }

    if (!user) {
      // 인증은 되었지만 사용자 정보가 없는 경우 fetch
      fetchUserInfo();
    }
  }, [isAuthenticated, user, fetchUserInfo, router]);

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
      <h1 className="text-2xl font-semibold mb-6">마이 페이지</h1>
      <MypageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-8">
        {activeTab === "info" && <UserInfoPanel />}
        {activeTab === "address" && <AddressPanel />}
        {activeTab === "orders" && <OrdersPanel />}
        {activeTab === "settings" && <SettingsPanel />}
      </div>
    </main>
  );
}
