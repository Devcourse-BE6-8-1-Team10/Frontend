"use client";

import React, { useState, useEffect } from "react";
import Button from "@/src/components/common/Button";
import TrashIcon from "@/src/components/common/TrashIcon";
import PencilIcon from "@/src/components/common/PencilIcon";
import ToggleSwitch from "@/src/components/common/ToggleSwitch";
import { Product } from "@/src/components/features/home/types";
import AddEditMenuModal from "@/src/components/features/admin/AddEditMenuModal";
import { ProductService } from "@/src/lib/backend/services";

const MenuManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [changedProducts, setChangedProducts] = useState<Set<number>>(new Set());
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const productData = await ProductService.getProducts();
            setProducts(productData);
            setOriginalProducts(productData);
        } catch (error) {
            console.error(error);
        }
    };

    fetchProducts();
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const handleToggleSoldOut = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, orderable: !product.orderable }
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
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setShowAddEditModal(true);
    }
  };

  const handleSave = () => {
    setOriginalProducts(products);
    setChangedProducts(new Set());
    alert("변경사항이 저장되었습니다.");
  };

  const handleAddMenu = () => {
    setEditingProduct(undefined);
    setShowAddEditModal(true);
  };

  const handleSaveProduct = (product: Product) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(p => p.id === product.id);
      if (existingProductIndex > -1) {
        return prevProducts.map((p, index) =>
          index === existingProductIndex ? product : p
        );
      } else {
        return [...prevProducts, product];
      }
    });
    setChangedProducts((prev) => new Set(prev.add(product.id)));
    setShowAddEditModal(false);
  };

  const hasChanges = changedProducts.size > 0;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">메뉴 관리</h1>
        <p className="text-gray-500 mt-2">메뉴를 추가, 수정, 삭제하고 품절 상태를 관리하세요.</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="메뉴 검색..."
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="w-full sm:w-auto"
            text="변경사항 저장"
            fontColor="text-white"
            bgColor="bg-blue-600"
            hoverColor="hover:bg-blue-700"
          />
          <Button
            onClick={handleAddMenu}
            className="w-full sm:w-auto"
            text="메뉴 추가"
            fontColor="text-white"
            bgColor="bg-green-500"
            hoverColor="hover:bg-green-600"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">메뉴</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">가격</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">카테고리</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className={`transition-colors duration-200 ${changedProducts.has(product.id) ? "bg-yellow-50" : "hover:bg-gray-50"}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img className="h-12 w-12 rounded-md object-cover" src={product.imageUrl || ''} alt={product.productName} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.price.toLocaleString()}원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <ToggleSwitch
                    isOn={product.orderable}
                    handleToggle={() => handleToggleSoldOut(product.id)}
                    onColor="bg-green-500"
                    offColor="bg-red-500"
                  />
                  <span className={`ml-2 text-sm font-medium ${!product.orderable ? 'text-red-600' : 'text-green-600'}`}>
                    {!product.orderable ? "품절" : "판매중"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center items-center gap-4">
                    <Button
                      onClick={() => handleEditProduct(product.id)}
                      icon={PencilIcon}
                      fontColor="text-white"
                      bgColor="bg-gray-400"
                      hoverColor="hover:bg-gray-500"
                      className="p-2 rounded-full"
                    />
                    <Button
                      onClick={() => handleDeleteProduct(product.id)}
                      icon={TrashIcon}
                      fontColor="text-white"
                      bgColor="bg-red-500"
                      hoverColor="hover:bg-red-600"
                      className="p-2 rounded-full"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddEditModal && (
        <AddEditMenuModal
          isOpen={showAddEditModal}
          onClose={() => setShowAddEditModal(false)}
          onSave={handleSaveProduct}
          editingProduct={editingProduct}
        />
      )}
    </div>
  );
};

export default MenuManagement;
