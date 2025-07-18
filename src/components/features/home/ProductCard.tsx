"use client";

import { useState } from "react";
import Button from "@/src/components/common/Button";
import { Product } from "./types";

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
    const [quantity, setQuantity] = useState(0);

    const isSoldOut = product.isSoldOut;

    const handleIncrease = () => {
        if (!isSoldOut) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (!isSoldOut && quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (isSoldOut) return; // 품절 시 장바구니 담기 방지

        const quantityToAdd = quantity === 0 ? 1 : quantity;
        addToCart(product, quantityToAdd);
        setQuantity(0); // Reset quantity after adding to cart
    };

    return (
        <div className={`group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg`}>
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-t-lg bg-gray-200 relative">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105 ${isSoldOut ? 'grayscale' : ''}`}
                />
                {isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-10">
                        <span className="text-white text-2xl font-bold tracking-wider">SOLD OUT</span>
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-base font-semibold ${isSoldOut ? 'text-gray-500' : 'text-gray-900'}`}>{product.name}</h3>
                    <p className={`text-xs px-2 py-1 rounded-full ${isSoldOut ? 'bg-gray-300 text-gray-600' : 'bg-amber-100 text-amber-800'}`}>{product.category}</p>
                </div>
                <div className="flex flex-1 flex-col">
                    <p className={`text-sm mb-3 ${isSoldOut ? 'text-gray-400' : 'text-gray-500'} flex-grow`}>{product.description}</p>
                    <p className={`text-xl font-bold mt-auto ${isSoldOut ? 'text-gray-500' : 'text-amber-700'}`}>{product.price.toLocaleString()}원</p>
                </div>
                <div className="flex flex-col justify-end pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-gray-300">
                            <button 
                                onClick={handleDecrease}
                                className={`px-3 py-1 text-gray-600 transition hover:bg-gray-100 rounded-l-md ${isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={isSoldOut}
                            >
                                -
                            </button>
                            <span className="px-4 py-1 text-sm font-medium text-gray-800">
                                {quantity}
                            </span>
                            <button 
                                onClick={handleIncrease}
                                className={`px-3 py-1 text-gray-600 transition hover:bg-gray-100 rounded-r-md ${isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={isSoldOut}
                            >
                                +
                            </button>
                        </div>
                        <Button 
                            text="+ 담기"
                            bgColor={isSoldOut ? "bg-gray-400" : "bg-black"}
                            fontColor="text-white"
                            hoverColor={isSoldOut ? "hover:bg-gray-400" : "hover:bg-gray-800"}
                            className={`text-sm ${isSoldOut ? 'cursor-not-allowed' : ''}`}
                            onClick={handleAddToCart}
                            disabled={isSoldOut}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;