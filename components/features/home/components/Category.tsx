"use client";

import { useState } from "react";
import Button from "@/components/common/Button";

const CATEGORIES = ["전체", "커피", "디저트", "음료", "베이커리"];

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState("전체");

    return (
        <div className="flex items-center space-x-4 py-4">
            {CATEGORIES.map((category) => (
                <Button
                    key={category}
                    text={category}
                    bgColor={selectedCategory === category ? "bg-black" : "bg-white"}
                    fontColor={selectedCategory === category ? "text-white" : "text-black"}
                    hoverColor={selectedCategory === category ? "hover:bg-black" : "hover:bg-gray-200"}
                    onClick={() => setSelectedCategory(category)}
                />
            ))}
        </div>
    );
};

export default Category;