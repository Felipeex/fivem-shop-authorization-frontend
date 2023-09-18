"use client";
import Link from "next/link";
import {
  AuthApi,
  ProductProps as ProductPropsApi,
} from "@/app/services/auth-api";
import { useState } from "react";

interface ProductProps {
  products: ProductPropsApi[];
  cookie: string;
}

export function Products({ products, cookie }: ProductProps) {
  const [Products, setProducts] = useState<ProductPropsApi[]>(products);
  const [loading, setLoading] = useState<{ key: number; isLoading: boolean }>();

  async function handleDelete(product: ProductPropsApi, key: number) {
    const filteredProducts = Products.filter(
      (filterProduct) => filterProduct.id !== product.id
    );
    setLoading({ key, isLoading: true });
    try {
      await AuthApi(cookie).delete(`/product/${product.id}`);
      setProducts(filteredProducts);
    } finally {
      setLoading({ key, isLoading: false });
    }
  }
  return (
    <>
      {Products.map((product, key) => (
        <div
          key={key}
          className="rounded-[10px] border border-[#5F71CB] p-5 flex flex-col bg-[#2E3035]"
        >
          <h2 className="font-normal text-[16px] truncate leading-normal">
            {product.name}
          </h2>
          <span className="text-[#75808A] font-normal text-[16px] leading-none">
            {product.version}
          </span>
          <div className="w-full flex gap-2">
            <Link
              href={`dashboard/product/${product.id}`}
              className="flex-1 flex"
            >
              <button className="flex-1 mt-[15px] bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]">
                Editar
              </button>
            </Link>
            <button
              onClick={() => handleDelete(product, key)}
              disabled={loading?.key === key && loading.isLoading}
              className="flex items-center justify-center mt-[15px] bg-red-400 px-[30px] py-3 rounded-md transition-colors hover:bg-red-500"
            >
              {loading?.key === key && loading.isLoading ? (
                <span className="icon-[eos-icons--loading] text-lg" />
              ) : (
                <span className="icon-[ph--trash-fill] text-lg" />
              )}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
