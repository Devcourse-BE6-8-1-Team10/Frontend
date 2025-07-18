'use client';

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
import Button from "@/src/components/common/Button";
import CartSidebar from "@/src/components/features/home/CartSidebar";
import { useCart } from "@/src/components/features/home/context/CartContext";

const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isCartOpen, toggleCart, cartItems, setCartItems } = useCart();
  const router = useRouter();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="bg-white p-5 border-b border-gray-300 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push('/')}>
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

                  <Button
                    icon={User}
                    text="마이 페이지"
                    onClick={() => router.push("/member/mypage")}
                  />
                  <div className="relative">
                    <Button
                      icon={ShoppingCart}
                      text="장바구니"
                      onClick={toggleCart}
                    />
                    {totalQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {totalQuantity}
                      </span>
                    )}
                  </div>
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
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} cartItems={cartItems} setCartItems={setCartItems} />
    </>
  );
};

export default Header;