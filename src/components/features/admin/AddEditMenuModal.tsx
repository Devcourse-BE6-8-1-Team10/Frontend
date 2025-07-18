"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/src/components/common/Modal";
import { Input } from "@/src/components/common/Input";
import Button from "@/src/components/common/Button";
import { Product } from "@/src/components/features/home/types";

interface AddEditMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  editingProduct?: Product;
}

const AddEditMenuModal: React.FC<AddEditMenuModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProduct,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null); // To store base64 string
  const [imagePreview, setImagePreview] = useState<string | null>(null); // To display image preview

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
      setDescription(editingProduct.description);
      setImage(editingProduct.image); // Assuming editingProduct.image is a URL or base64
      setImagePreview(editingProduct.image); // Display existing image
    } else {
      setName("");
      setPrice(null);
      setCategory("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
    }
  }, [editingProduct]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(), // Simple ID generation
      name,
      price: price !== null ? price : 0,
      category,
      description,
      image: image || "", // Ensure image is a string, even if null
      isSoldOut: editingProduct ? editingProduct.isSoldOut : false,
    };
    onSave(newProduct);
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full mx-auto my-8 border border-gray-100">
        <h2 className="text-4xl font-extrabold mb-10 text-gray-900 text-center tracking-tight">
          {editingProduct ? "메뉴 수정" : "메뉴 추가"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              메뉴 이름
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none text-lg"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-semibold mb-2">
              가격
            </label>
            <Input
              id="price"
              type="number"
              value={price !== null ? price.toString() : ""}
              onChange={(e) => setPrice(e.target.value === '' ? null : Number(e.target.value))}
              required
              className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none text-lg"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-semibold mb-2 whitespace-nowrap">
              카테고리
            </label>
            <Input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none text-lg"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
              설명
            </label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none text-lg"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 text-sm font-semibold mb-2">
              이미지 파일
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-700 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <div className="mt-6 flex justify-center">
                <img src={imagePreview} alt="Image Preview" className="max-w-full h-48 object-cover rounded-lg shadow-md border border-gray-200" />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              onClick={onClose}
              text="취소"
              bgColor="bg-gray-100"
              hoverColor="hover:bg-gray-200"
              fontColor="text-gray-700"
              className="px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md"
            />
            <Button
              text="저장"
              bgColor="bg-blue-600"
              hoverColor="hover:bg-blue-700"
              fontColor="text-white"
              className="px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddEditMenuModal;
