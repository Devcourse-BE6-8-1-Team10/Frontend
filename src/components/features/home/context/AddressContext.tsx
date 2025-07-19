"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useUser } from "@/src/components/features/home/context/UserContext";
import { AddressService } from "@/src/lib/backend/services/addressService";

export interface Address {
  id: number;
  content: string;
  isDefault?: boolean;
}

// AddressContext에서 제공하는 값/함수 타입
interface AddressContextType {
  addresses: Address[];
  add: (address: string) => void; // TODO: 실제 API 연동 필요
  edit: (id: number, newAddress: string) => void; // TODO: 실제 API 연동 필요
  remove: (id: number) => void; // TODO: 실제 API 연동 필요
  setDefault: (id: number) => void; // TODO: 실제 API 연동 필요
  reset: () => void; // TODO: 실제 API 연동 필요
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export function AddressProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);

  // user 정보가 있을 때만 주소 목록 fetch
  useEffect(() => {
    if (user) {
      fetchAddresses();
    } else {
      setAddresses([]); // 로그아웃/탈퇴 시 주소 초기화
    }
  }, [user]);

  // 주소 목록 조회 함수
  const fetchAddresses = useCallback(async () => {
    try {
      const addressList = await AddressService.getAddressList();
      setAddresses(addressList);
    } catch (error) {
      console.error("주소 목록 조회 실패:", error);
      setAddresses([]);
    }
  }, []);

  // 주소 추가 (TODO: openapi-fetch로 /api/addresses POST 연동 필요)
  const add = useCallback((address: string) => {
    // TODO: 실제 API 연동 후 setAddresses로 상태 갱신
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        content: address,
        isDefault: prev.length === 0,
      },
    ]);
  }, []);

  // 주소 수정 (TODO: openapi-fetch로 /api/addresses/{id} PUT 연동 필요)
  const edit = useCallback((id: number, newAddress: string) => {
    // TODO: 실제 API 연동 후 setAddresses로 상태 갱신
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, address: newAddress } : a))
    );
  }, []);

  // 주소 삭제 (TODO: openapi-fetch로 /api/addresses/{id} DELETE 연동 필요)
  const remove = useCallback((id: number) => {
    // TODO: 실제 API 연동 후 setAddresses로 상태 갱신
    setAddresses((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      const hasDefault = updated.some((a) => a.isDefault);
      return hasDefault
        ? updated
        : updated.map((a, i) => (i === 0 ? { ...a, isDefault: true } : a));
    });
  }, []);

  // 기본 주소 설정 (TODO: openapi-fetch로 PATCH/PUT 등 연동 필요)
  const setDefault = useCallback((id: number) => {
    // TODO: 실제 API 연동 후 setAddresses로 상태 갱신
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }, []);

  // 주소 전체 초기화 (TODO: 회원 탈퇴/로그아웃 시 등 필요시 연동)
  const reset = useCallback(() => setAddresses([]), []);

  return (
    <AddressContext.Provider
      value={{ addresses, add, edit, remove, setDefault, reset }}
    >
      {children}
    </AddressContext.Provider>
  );
}

// AddressContext 사용 훅
export function useAddressContext() {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddressContext must be used within an AddressProvider");
  }
  return context;
}
