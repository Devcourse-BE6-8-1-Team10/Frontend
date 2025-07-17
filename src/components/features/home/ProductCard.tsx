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

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (quantity === 0) {
            addToCart(product, 1);
        } else {
            addToCart(product, quantity);
            setQuantity(0); // Reset quantity after adding to cart
        }
    };

    return (
        <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-t-lg bg-gray-200">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-sm text-gray-500">₩{product.price.toLocaleString()}</p>
                <div className="flex flex-1 flex-col justify-end pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-gray-300">
                            <button 
                                onClick={handleDecrease}
                                className="px-3 py-1 text-gray-600 transition hover:bg-gray-100 rounded-l-md cursor-pointer"
                            >
                                -
                            </button>
                            <span className="px-4 py-1 text-sm font-medium text-gray-800">
                                {quantity}
                            </span>
                            <button 
                                onClick={handleIncrease}
                                className="px-3 py-1 text-gray-600 transition hover:bg-gray-100 rounded-r-md cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                        <Button 
                            text="+ 담기"
                            bgColor="bg-black"
                            fontColor="text-white"
                            hoverColor="hover:bg-gray-800"
                            className="text-sm"
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;