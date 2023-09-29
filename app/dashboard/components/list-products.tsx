"use client";
import Link from "next/link";
import {
  AuthApi,
  ProductProps as ProductPropsApi,
} from "@/app/services/auth-api";
import { useState } from "react";

interface ProductProps {
  products: ProductPropsApi[];
  plan: any;
  cookie: string;
}

export function Products({ products, cookie, plan }: ProductProps) {
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
      {plan && Products.length <= 0 && (
        <Link href="dashboard/product/create">
          <div className="rounded-[10px] border border-[#5F71CB] p-5 flex flex-col bg-[#2E3035]">
            <h2 className="font-normal text-[16px] leading-normal">
              Meu primeiro produto
            </h2>
            <span className="text-[#75808A] font-normal text-[16px] leading-none">
              Clique ao botão abaixo
            </span>
            <button className="mt-[15px] bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]">
              Criar meu primeiro produto
            </button>
          </div>
        </Link>
      )}
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
            <a
              href={`${process.env.NEXT_PUBLIC_AUTH_API_URL}/product/download/${product.name}`}
              className="flex items-center justify-center mt-[15px] bg-emerald-500 px-[30px] py-3 rounded-md transition-colors hover:bg-emerald-600"
            >
              <span className="icon-[ic--round-download] text-lg" />
            </a>
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
