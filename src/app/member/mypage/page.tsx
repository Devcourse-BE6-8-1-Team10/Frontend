"use client";

import { useState } from "react";
import MypageTabs from "@/components/features/mypage/MypageTabs";
import UserInfoPanel from "@/components/features/mypage/UserInfoPanel";
import AddressPanel from "@/components/features/mypage/AddressPanel";
import OrdersPanel from "@/components/features/mypage/OrdersPanel";
import SettingsPanel from "@/components/features/mypage/SettingsPanel";

export default function Mypage() {
  const [activeTab, setActiveTab] = useState<
    "info" | "address" | "orders" | "settings"
  >("info");

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
