"use client";

import { Modal } from "@/src/components/common/Modal";
import { ModalContent } from "@/src/components/common/ModalContent";
import Button from "@/src/components/common/Button";
import ConfirmModal from "@/src/components/features/modals/ConfirmModal";
import { useState } from "react";
import { useAddressContext } from "@/src/components/features/home/context/AddressContext";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
  currentAddress?: string;
}

export default function OrderAddressSelectModal({
  open,
  onClose,
  onSelect,
  currentAddress,
}: Props) {
  const { addresses, add } = useAddressContext();
  const [inputValue, setInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!open) return null;

  const handleSaveNew = () => {
    if (!inputValue.trim()) return;
    setConfirmOpen(true);
  };

  return (
    <>
      <Modal onClose={onClose} size="base">
        <ModalContent size="base" className="p-8 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">배송지 선택</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* 주소 목록 */}
          <ul className="space-y-4 max-h-60 overflow-y-auto">
            {addresses.map((addr) => (
              <li
                key={addr.id}
                className={`border p-4 rounded cursor-pointer hover:bg-gray-50 ${
                  addr.address === currentAddress
                    ? "border-amber-600 bg-amber-50"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  onSelect(addr.address);
                  onClose();
                }}
              >
                <span className="text-lg font-medium">{addr.address}</span>
                {addr.isDefault && (
                  <span className="ml-2 text-sm text-amber-600">
                    (기본 배송지)
                  </span>
                )}
                {addr.address === currentAddress && (
                  <span className="ml-2 text-sm text-amber-600">
                    (현재 선택됨)
                  </span>
                )}
              </li>
            ))}
          </ul>

          {isAdding ? (
            <div className="mt-6 flex gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="새 배송지를 입력하세요"
                className="flex-1 p-3 border rounded"
              />
              <Button text="저장" onClick={handleSaveNew} />
              <Button text="취소" onClick={() => setIsAdding(false)} />
            </div>
          ) : (
            <div className="mt-8">
              <Button
                text="새 주소 입력"
                onClick={() => {
                  setInputValue("");
                  setIsAdding(true);
                }}
                className="w-full"
              />
            </div>
          )}
        </ModalContent>
      </Modal>

      {confirmOpen && (
        <ConfirmModal
          open={true}
          onClose={() => setConfirmOpen(false)}
          message="이 주소를 등록하시겠습니까?"
          onConfirm={() => {
            add(inputValue);
            onSelect(inputValue);
            setConfirmOpen(false);
            setIsAdding(false);
            setInputValue("");
          }}
        />
      )}
    </>
  );
}
