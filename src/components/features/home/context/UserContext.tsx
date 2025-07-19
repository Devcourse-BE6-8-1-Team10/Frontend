"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { AuthService } from "../../../../lib/backend/services";

// UserContext: 인증/회원정보 관련 전역 상태 및 함수 제공

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
}

// Context에서 제공하는 값/함수 타입
interface UserContextType {
  user: UserInfo | null; // 현재 로그인한 사용자 정보
  isAuthenticated: boolean; // 로그인 여부
  setUser: (user: UserInfo) => void; // 직접 사용자 정보 설정(내부용)
  clearUser: () => void; // 사용자 정보/인증 상태 초기화(로그아웃)
  fetchUserInfo: () => Promise<void>; // 사용자 정보 새로고침 (TODO: API 연동 필요)
  login: (email: string, password: string) => Promise<void>; // 로그인 (TODO: API 연동 필요)
  signup: (name: string, email: string, password: string) => Promise<void>; // 회원가입 (TODO: API 연동 필요)
  updateUserInfo: (data: { name?: string; password?: string }) => Promise<void>; // 회원정보 수정 (TODO: API 연동 필요)
  withdraw: () => Promise<void>; // 회원 탈퇴 (TODO: API 연동 필요)
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Context 사용 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider 구현
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // 현재 로그인한 사용자 정보 (null이면 미로그인)
  const [user, setUserState] = useState<UserInfo | null>(null);

  // 내부용: 사용자 정보 직접 설정
  const setUser = (user: UserInfo) => {
    setUserState(user);
  };

  // 로그아웃: 사용자 정보 초기화
  const clearUser = () => {
    setUserState(null);
  };

  // 사용자 정보 조회
  const fetchUserInfo = useCallback(async () => {
    try {
      const userInfo = await AuthService.getUserInfo();
      setUserState(userInfo);
    } catch (error) {
      console.error("사용자 정보 조회 오류:", error);
      throw error;
    }
  }, []);

  // 로그인
  const login = useCallback(async (email: string, password: string) => {
    try {
      const userInfo = await AuthService.login({ email, password });
      setUserState(userInfo);
    } catch (error) {
      console.error("로그인 오류:", error);
      throw error;
    }
  }, []);

  // 회원가입
  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const userInfo = await AuthService.signup({ email, password, name });
        setUserState(userInfo);
      } catch (error) {
        console.error("회원가입 오류:", error);
        throw error;
      }
    },
    []
  );

  // 회원정보 수정 (TODO: openapi-fetch로 /api/members/info 수정 연동 필요)
  const updateUserInfo = useCallback(
    async (data: { name?: string; password?: string }) => {
      // TODO: openapi-fetch로 /api/members/info 수정 API 호출
      // 임시: 이름만 변경 가능, 비밀번호는 무시
      setUserState((prev) => (prev ? { ...prev, ...data } : prev));
    },
    []
  );

  // 회원 탈퇴 (TODO: openapi-fetch로 /api/members/withdraw 연동 필요)
  const withdraw = useCallback(async () => {
    // TODO: openapi-fetch로 /api/members/withdraw 호출
    // 임시: 성공만 반환
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        clearUser,
        fetchUserInfo,
        login,
        signup,
        updateUserInfo,
        withdraw,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
