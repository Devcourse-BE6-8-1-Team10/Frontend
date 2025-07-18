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

export interface Address {
  id: number;
  address: string;
  isDefault: boolean;
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

// 기본 초기 데이터 (임시, 나중에 API 연동 시 제거)
const defaultAddresses: Address[] = [
  { id: 1, address: "서울시 강남구 테헤란로 123", isDefault: true },
  { id: 2, address: "경기도 성남시 분당구 수내동 456", isDefault: false },
];

export function AddressProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);

  // user 정보가 있을 때만 주소 목록 fetch (TODO: 실제 API 연동)
  useEffect(() => {
    if (user) {
      // TODO: 실제 API 연동(fetchAddresses 등)
      setAddresses(defaultAddresses); // 임시: 나중에 API 결과로 대체
    } else {
      setAddresses([]); // 로그아웃/탈퇴 시 주소 초기화
    }
  }, [user]);

  // 주소 추가 (TODO: openapi-fetch로 /api/addresses POST 연동 필요)
  const add = useCallback((address: string) => {
    // TODO: 실제 API 연동 후 setAddresses로 상태 갱신
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        address,
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
