"use client";

import {
  Coffee,
  LogIn,
  LogOut,
  Shield,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import CartSidebar from "@/components/features/home/components/CartSidebar";

const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className="bg-white p-5 border-b border-gray-300 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <Coffee className="h-10 w-10 text-amber-600" />
              <div className="leading-tight">
                <h1 className="text-[20px] font-semibold text-gray-800 leading-none">
                  우아한 카페
                </h1>
                <p className="text-sm text-gray-500 leading-none mt-2">
                  우아한 커피와 디저트
                </p>
              </div>
            </div>

            <div className="ml-auto">
              {!isLogin ? (
                <Button
                  icon={LogIn}
                  text="로그인"
                  onClick={() => {
                    setLogin(true);
                    router.push("/member/login");
                  }}
                />
              ) : (
                <div className="flex items-center space-x-4">
                  {isAdmin && <Button icon={Shield} text="관리자 페이지" />}

                  <Button icon={User} text="마이 페이지" />
                  <Button
                    icon={ShoppingCart}
                    text="장바구니"
                    onClick={() => setIsCartOpen(true)}
                  />
                  <Button
                    icon={LogOut}
                    text="로그아웃"
                    onClick={() => setLogin(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
