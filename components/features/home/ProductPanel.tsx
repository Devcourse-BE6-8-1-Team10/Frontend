'use client';

import Category from "@/components/features/home/components/Category";
import ProductList from "@/components/features/home/components/ProductList";
import { useCart } from "@/components/features/home/context/CartContext";

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

const ProductPanel = () => {
    const { addToCart } = useCart();

    return (
        <>
            <Category/>
            <ProductList addToCart={addToCart} />
        </>
    )
}

export default ProductPanel;