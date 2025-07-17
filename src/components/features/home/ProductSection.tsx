'use client';

import { useState } from "react";
import Category from "./Category";
import ProductList from "./ProductList";
import { useCart } from "@/src/components/features/home/context/CartContext";
import { PRODUCTS } from "./data/products";

const ProductSection = () => {
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState("전체");

    const filteredProducts = selectedCategory === "전체"
        ? PRODUCTS
        : PRODUCTS.filter(product => product.category === selectedCategory);

    return (
        <>
            <Category selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <ProductList products={filteredProducts} addToCart={addToCart} />
        </>
    )
}

export default ProductSection;