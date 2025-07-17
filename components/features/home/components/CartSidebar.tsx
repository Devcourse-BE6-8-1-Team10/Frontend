"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {PrimaryButton} from "@/components/common/PrimaryButton";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "아메리카노", image: "https://www.biz-con.co.kr/upload/images/202501/400_20250122164028679_2.jpg", quantity: 2, price: 4500 },
    { id: 2, name: "카페 라떼", image: "https://dh.aks.ac.kr/Edu/wiki/images/thumb/8/85/1893535467_J78QnDCd_C4ABC6E4B6F3B6BC.jpg/300px-1893535467_J78QnDCd_C4ABC6E4B6F3B6BC.jpg", quantity: 1, price: 5000 },
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="bg-black/50 fixed inset-0 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-20/100 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">장바구니</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 cursor-pointer">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">장바구니가 비어있습니다.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center py-2 border-b last:border-b-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded-l-md bg-gray-100 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded-r-md bg-gray-100 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-800 font-bold mt-1">{(item.price * item.quantity).toLocaleString()}원</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">총 금액:</span>
            <span className="text-lg font-bold text-amber-600">{totalAmount.toLocaleString()}원</span>
          </div>
          <PrimaryButton>
            주문하기
          </PrimaryButton>

        </div>
      </div>
    </>
  );
};

export default CartSidebar;