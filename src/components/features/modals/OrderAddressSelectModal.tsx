"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/src/components/common/Modal";
import { ModalContent } from "@/src/components/common/ModalContent";
import Button from "@/src/components/common/Button";
import ConfirmModal from "@/src/components/features/modals/ConfirmModal";
import { useAddressContext } from "@/src/components/features/home/context/AddressContext";
import { useOrders } from "@/src/components/features/home/context/OrderContext";

interface OrderAddressSelectModalProps {
  open: boolean;
  onClose: () => void;
  orderId: number;
  currentAddress: string;
  onAddressChange?: (address: string) => void;
}

export default function OrderAddressSelectModal({
  open,
  onClose,
  orderId,
  currentAddress,
  onAddressChange,
}: OrderAddressSelectModalProps) {
  const { addresses, add } = useAddressContext();
  const { updateOrderAddress } = useOrders();
  const [editAddress, setEditAddress] = useState(currentAddress);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewInput, setShowNewInput] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [confirm, setConfirm] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }>({ open: false, message: "", onConfirm: () => {} });

  useEffect(() => {
    setEditAddress(currentAddress);
  }, [currentAddress]);

  // 현재 배송지 등록 및 주문 주소 변경 확인
  const handleRegisterEdit = () => {
    setConfirm({
      open: true,
      message: "배송지가 변경되었습니다. 주소를 등록하시겠습니까?",
      onConfirm: async () => {
        // 주소록에 없으면 등록
        if (!addresses.some((a) => a.address === editAddress)) {
          add(editAddress);
        }
        // 주문 주소도 변경
        await updateOrderAddress(orderId, editAddress);
        setIsEditing(false);
        setConfirm({ ...confirm, open: false });
        if (onAddressChange) onAddressChange(editAddress);
      },
      onCancel: async () => {
        // 주소록에는 추가하지 않지만, 배송지 변경은 반드시 실행
        await updateOrderAddress(orderId, editAddress);
        setIsEditing(false);
        setConfirm({ ...confirm, open: false });
        if (onAddressChange) onAddressChange(editAddress);
      },
    });
  };

  // 새 주소 등록 확인
  const handleRegisterNew = () => {
    setConfirm({
      open: true,
      message: "배송지가 변경되었습니다. 주소를 등록하시겠습니까?",
      onConfirm: () => {
        if (!addresses.some((a) => a.address === newAddress)) {
          add(newAddress);
        }
        setShowNewInput(false);
        setNewAddress("");
        setConfirm({ ...confirm, open: false });
      },
      onCancel: () => setConfirm({ ...confirm, open: false }),
    });
  };

  // 주소 선택(배송지 변경) 확인
  const handleSelect = (address: string) => {
    setConfirm({
      open: true,
      message: "주소를 변경하시겠습니까?",
      onConfirm: async () => {
        await updateOrderAddress(orderId, address);
        setConfirm({ ...confirm, open: false });
        if (onAddressChange) onAddressChange(address);
        onClose();
      },
      onCancel: () => setConfirm({ ...confirm, open: false }),
    });
  };

  if (!open) return null;

  // 현재 배송지가 address 목록에 있나?
  const isCurrentInList = addresses.some((a) => a.address === currentAddress);

  return (
    <Modal onClose={onClose} size="base">
      <ModalContent size="base" className="p-6">
        <h2 className="text-xl font-bold mb-4">배송지 변경</h2>
        {/* 현재 배송지(수정 가능) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">현재 배송지</label>
          <div className="flex gap-2 items-center">
            <input
              className={`flex-1 p-3 rounded transition-all text-lg ${
                isEditing
                  ? "border border-gray-300 bg-white focus:outline-amber-500"
                  : "border-none bg-transparent text-2xl font-semibold cursor-default focus:outline-none"
              }`}
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              disabled={!isEditing}
              readOnly={!isEditing}
              tabIndex={isEditing ? 0 : -1}
              placeholder={isEditing ? "주소를 입력하세요" : undefined}
            />
            {isEditing ? (
              <>
                <Button text="저장" onClick={handleRegisterEdit} />
                <Button
                  text="취소"
                  onClick={() => {
                    setEditAddress(currentAddress);
                    setIsEditing(false);
                  }}
                />
              </>
            ) : (
              <Button text="수정" onClick={() => setIsEditing(true)} />
            )}
          </div>
        </div>
        {/* 주소 목록 */}
        <ul className="space-y-2 max-h-60 overflow-y-auto mb-4">
          {addresses.map((addr) => (
            <li
              key={addr.id}
              className={`border p-4 rounded cursor-pointer hover:bg-gray-50 ${
                currentAddress === addr.address
                  ? "border-amber-600 bg-amber-50"
                  : "border-gray-300"
              }`}
              onClick={() => handleSelect(addr.address)}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{addr.address}</span>
                {addr.isDefault && (
                  <span className="ml-2 px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded">
                    기본
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        {/* 새 주소 입력 */}
        {showNewInput ? (
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 p-3 border rounded"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="새 주소를 입력하세요"
            />
            <Button text="등록" onClick={handleRegisterNew} />
            <Button text="취소" onClick={() => setShowNewInput(false)} />
          </div>
        ) : (
          <Button
            text="새 주소 입력"
            onClick={() => setShowNewInput(true)}
            className="w-full mb-4"
          />
        )}
        <div className="flex justify-end mt-2">
          <Button text="닫기" onClick={onClose} />
        </div>
      </ModalContent>
      {/* 확인 모달 */}
      {confirm.open && (
        <ConfirmModal
          open={confirm.open}
          onClose={
            confirm.onCancel || (() => setConfirm({ ...confirm, open: false }))
          }
          onConfirm={confirm.onConfirm}
          message={confirm.message}
        />
      )}
    </Modal>
  );
}
