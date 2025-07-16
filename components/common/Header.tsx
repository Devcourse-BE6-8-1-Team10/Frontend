"use client";

import {Coffee, ShoppingCart} from "lucide-react";
import {useState} from "react";

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <header className="bg-white p-5 border-b border-gray-300 shadow-md">
            <div className="flex items-center">
                <div className="flex items-center space-x-4">
                    <Coffee className="h-10 w-10 text-amber-600"/>
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
                    {!isLoggedIn ? (
                        <button
                            className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-200 transition border-1 border-gray-300"
                            onClick={() => setIsLoggedIn(true)}
                        >
                            로그인
                        </button>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-200 transition border-1 border-gray-300">관리자 페이지</button>
                            <button className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-200 transition border-1 border-gray-300">마이 페이지</button>
                            <button
                                className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-200 transition border-1 border-gray-300">
                                <ShoppingCart className="w-5 h-5 text-gray-800"/>
                                <span className="text-gray-800 font-medium">장바구니</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-200 transition border-1 border-gray-300" onClick={() => setIsLoggedIn(false)}> 로그아웃 </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
