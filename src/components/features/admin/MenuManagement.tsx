"use client";

import React, { useState, useEffect } from "react";
import Button from "@/src/components/common/Button";
import TrashIcon from "@/src/components/common/TrashIcon";
import PencilIcon from "@/src/components/common/PencilIcon";
import ToggleSwitch from "@/src/components/common/ToggleSwitch";
import {PRODUCTS} from "@/src/components/features/home/data/products";
import {Product} from "@/src/components/features/home/types";
const MenuManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [changedProducts, setChangedProducts] = useState<Set<number>>(new Set());

  useEffect(() => {
    setProducts(PRODUCTS);
    setOriginalProducts(PRODUCTS);
  }, []);

  const handleToggleSoldOut = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isSoldOut: !product.isSoldOut }
          : product
      )
    );
    setChangedProducts((prev) => new Set(prev.add(id)));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    setChangedProducts((prev) => new Set(prev.add(id))); // Mark as changed for deletion
  };

  const handleEditProduct = (id: number) => {
    alert(`제품 ID ${id} 수정`);
  };

  const handleSave = () => {
    // const updatedProducts = products.filter(product => !originalProducts.some(op => op.id === product.id && op.isSoldOut === product.isSoldOut));
    // const deletedProductIds = originalProducts.filter(op => !products.some(p => p.id === op.id)).map(p => p.id);

    setOriginalProducts(products);
    setChangedProducts(new Set());
    alert("변경사항이 저장되었습니다.");
  };

  const handleAddMenu = () => {
    alert("메뉴 추가 기능 구현 예정");
    // 여기에 메뉴 추가 로직을 구현하세요.
  };

  const hasChanges = changedProducts.size > 0;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">메뉴 관리</h1>

      <div className="flex justify-end mb-6">
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
          text="변경사항 저장"
          fontColor="text-white"
          bgColor="bg-indigo-600"
          hoverColor="hover:bg-indigo-700"
        />
        <Button
          onClick={handleAddMenu}
          className="ml-4 px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
          text="메뉴 추가"
          fontColor="text-white"
          bgColor="bg-green-500"
          hoverColor="hover:bg-green-600"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이미지</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가격</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">품절 상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">액션</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className={`hover:bg-gray-50 ${changedProducts.has(product.id) ? "bg-yellow-50" : ""}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price.toLocaleString()}원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500 overflow-hidden text-ellipsis">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <ToggleSwitch
                    isOn={!product.isSoldOut}
                    handleToggle={() => handleToggleSoldOut(product.id)}
                    onColor="bg-green-500"
                    offColor="bg-red-500"
                  />
                  <span className="ml-2 text-gray-700 font-medium">
                    {product.isSoldOut ? "품절" : "판매중"}
                  </span>
                </td>
                <td className="px-6 py-7 flex justify-between items-center">
                  <Button
                    onClick={() => handleEditProduct(product.id)}
                    icon={PencilIcon}
                    fontColor="text-white"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-600"
                  />
                  <Button
                    onClick={() => handleDeleteProduct(product.id)}
                    icon={TrashIcon}
                    fontColor="text-white"
                    bgColor="bg-red-500"
                    hoverColor="hover:bg-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManagement;
