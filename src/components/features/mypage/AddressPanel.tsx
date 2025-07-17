"use client";

import { useState } from "react";
import Button from "@/src/components/common/Button";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import ConfirmModal from "@/src/components/features/modals/ConfirmModal";

interface Address {
  id: number;
  address: string;
  isDefault: boolean;
}

export default function AddressPanel() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, address: "서울시 강남구 테헤란로 123", isDefault: true },
    { id: 2, address: "경기도 성남시 분당구 수내동 456", isDefault: false },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [confirm, setConfirm] = useState({
    open: false,
    onConfirm: () => {},
    message: "",
  });

  // ───────────────────────────────
  // 상태 제어 함수
  const resetForm = () => {
    setInputValue("");
    setEditingId(null);
    setIsAdding(false);
  };

  const openConfirm = (message: string, onConfirm: () => void) => {
    setConfirm({ open: true, onConfirm, message });
  };

  // ───────────────────────────────
  // 핸들러 함수
  const handleAdd = () => {
    if (!inputValue.trim()) return;
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        address: inputValue,
        isDefault: prev.length === 0,
      },
    ]);
    resetForm();
  };

  const handleEdit = (id: number) => {
    if (!inputValue.trim()) return;
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, address: inputValue } : a))
    );
    resetForm();
  };

  const handleDelete = (id: number) => {
    openConfirm("이 주소를 삭제하시겠습니까?", () => {
      setAddresses((prev) => {
        const updated = prev.filter((a) => a.id !== id);
        const hasDefault = updated.some((a) => a.isDefault);
        return hasDefault
          ? updated
          : updated.map((a, i) => (i === 0 ? { ...a, isDefault: true } : a));
      });
    });
  };

  const handleSetDefault = (id: number) => {
    openConfirm("기본 배송지를 변경하시겠습니까?", () => {
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === id }))
      );
    });
  };

  // ───────────────────────────────
  return (
    <section className="bg-white shadow p-6 rounded">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">주소 관리</h2>
        <Button
          icon={Plus}
          text="주소 추가"
          onClick={() => {
            resetForm();
            setIsAdding(true);
          }}
          className="border-amber-600 text-amber-600 hover:bg-amber-50"
        />
      </div>

      {/* 주소 목록 */}
      <ul className="space-y-4">
        {addresses.map((addr) =>
          editingId === addr.id ? (
            // 수정 폼
            <li
              key={addr.id}
              className="border border-dashed border-gray-300 rounded p-4"
            >
              <div className="flex items-center gap-2 w-full">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={addr.address}
                  className="flex-1 p-2 border rounded"
                />
                <Button text="저장" onClick={() => handleEdit(addr.id)} />
                <Button text="취소" onClick={resetForm} />
              </div>
            </li>
          ) : (
            // 주소 목록
            <li key={addr.id} className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg text-gray-900 font-medium">
                    {addr.address}
                    {addr.isDefault && (
                      <span className="text-sm text-amber-600 ml-2">
                        (기본 배송지)
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!addr.isDefault && (
                    <Button
                      icon={Star}
                      text="기본으로 설정"
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-sm"
                    />
                  )}
                  <Button
                    icon={Pencil}
                    text="수정"
                    onClick={() => {
                      resetForm();
                      setEditingId(addr.id);
                      setInputValue(addr.address);
                    }}
                    className="text-sm"
                  />
                  <Button
                    icon={Trash2}
                    text="삭제"
                    onClick={() => handleDelete(addr.id)}
                    className="text-sm text-red-600 border-red-300 hover:bg-red-50"
                  />
                </div>
              </div>
            </li>
          )
        )}

        {/* 주소 추가 입력창 */}
        {isAdding && (
          <li className="border border-dashed border-gray-300 rounded p-4">
            <div className="flex items-center gap-2 w-full">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="주소를 입력해 주세요"
              />
              <Button text="저장" onClick={handleAdd} />
              <Button text="취소" onClick={resetForm} />
            </div>
          </li>
        )}
      </ul>

      {/* 확인 모달 */}
      {confirm.open && (
        <ConfirmModal
          open={confirm.open}
          onClose={() => setConfirm({ ...confirm, open: false })}
          onConfirm={() => {
            confirm.onConfirm();
            setConfirm({ ...confirm, open: false });
          }}
          message={confirm.message}
        />
      )}
    </section>
  );
}
