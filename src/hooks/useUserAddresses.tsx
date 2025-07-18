"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Address {
  id: number;
  address: string;
  isDefault: boolean;
}

// 기본 초기 데이터
const defaultAddresses: Address[] = [
  { id: 1, address: "서울시 강남구 테헤란로 123", isDefault: true },
  { id: 2, address: "경기도 성남시 분당구 수내동 456", isDefault: false },
];

interface AddressContextType {
  addresses: Address[];
  add: (address: string) => void;
  edit: (id: number, newAddress: string) => void;
  remove: (id: number) => void;
  setDefault: (id: number) => void;
  reset: () => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);

  const add = (address: string) => {
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        address,
        isDefault: prev.length === 0,
      },
    ]);
  };

  const edit = (id: number, newAddress: string) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, address: newAddress } : a))
    );
  };

  const remove = (id: number) => {
    setAddresses((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      const hasDefault = updated.some((a) => a.isDefault);
      return hasDefault
        ? updated
        : updated.map((a, i) => (i === 0 ? { ...a, isDefault: true } : a));
    });
  };

  const setDefault = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const reset = () => setAddresses([]);

  return (
    <AddressContext.Provider
      value={{ addresses, add, edit, remove, setDefault, reset }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useUserAddresses() {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useUserAddresses must be used within an AddressProvider");
  }
  return context;
}
