import client from "../client";
import type { components } from "../api/schema.d.ts";

// 타입 정의
type AddressSubmitReqBody = components["schemas"]["AddressSubmitReqBody"];
type AddressSubmitResBody = components["schemas"]["AddressSubmitResBody"];
type AddressListResBody = components["schemas"]["AddressListResBody"];

export interface Address {
  id: number;
  content: string;
  isDefault?: boolean;
}

export interface AddressSubmitResponse {
  id: number;
  content: string;
  member?: {
    id: number;
    email: string;
    name: string;
  };
}

export class AddressService {
  // 주소 목록 조회
  static async getAddressList(): Promise<Address[]> {
    const { data: response, error } = await client.GET("/api/addresses");

    if (error) {
      throw new Error("주소 목록 조회에 실패했습니다.");
    }

    if (!response?.data) {
      return [];
    }

    return response.data.map((address) => ({
      id: address.id!,
      content: address.content!,
      isDefault: address.isDefault,
    }));
  }

  // 주소 등록
  static async submitAddress(content: string): Promise<AddressSubmitResponse> {
    const { data: response, error } = await client.POST("/api/addresses", {
      body: { content },
    });

    if (error) {
      throw new Error("주소 등록에 실패했습니다.");
    }

    if (!response?.data) {
      throw new Error("주소 등록 응답 데이터가 없습니다.");
    }

    return {
      id: response.data.id!,
      content: response.data.content!,
      member: response.data.member ? {
        id: response.data.member.id,
        email: response.data.member.email,
        name: response.data.member.name,
      } : undefined,
    };
  }

  // 주소 삭제
  static async deleteAddress(addressId: number): Promise<void> {
    const { error } = await client.DELETE("/api/addresses/{addressId}", {
      params: { path: { addressId } },
    });

    if (error) {
      throw new Error("주소 삭제에 실패했습니다.");
    }
  }
} 