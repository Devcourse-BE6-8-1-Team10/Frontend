"use client";

import { Modal } from "@/src/components/common/Modal";
import { ModalContent } from "@/src/components/common/ModalContent";
import Button from "@/src/components/common/Button";

interface OrderCompleteModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export default function OrderCompleteModal({
  open,
  onClose,
  message,
}: OrderCompleteModalProps) {
  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <div className="flex flex-col items-center justify-center gap-6 py-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{message}</h3>
          <Button
            text="확인"
            onClick={onClose}
            className="px-8 py-3 text-lg font-semibold rounded-lg mt-4"
            bgColor="bg-amber-600"
            fontColor="text-white"
            hoverColor="hover:bg-amber-500"
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
