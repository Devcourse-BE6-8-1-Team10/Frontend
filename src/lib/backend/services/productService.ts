import client from "../client";
import type { components } from "../api/schema.d.ts";
import { Product } from "@/src/components/features/home/types";

type ProductDto = components["schemas"]["ProductDto"];

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    const { data: response, error } = await client.GET("/api/products");

    if (error) {
      throw new Error("상품 목록을 불러오는데 실패했습니다.");
    }

    if (!response?.data?.items) {
      throw new Error("상품 목록 데이터가 없습니다.");
    }

    return response.data.items.map((item: ProductDto) => ({
      id: item.id,
      createdDate: item.createdDate!,
      modifiedDate: item.modifiedDate!,
      productName: item.productName!,
      price: item.price!,
      imageUrl: item.imageUrl!,
      category: item.category!,
      description: item.description!,
      orderable: item.orderable!,
    }));
  }
}
