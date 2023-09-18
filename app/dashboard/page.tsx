import { authOptions } from "@/config/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { verifyPlan } from "../utils/verifyPlan";
import { NextAuthCookie } from "../utils/next-auth-cookie";
import { Products } from "./components/list-products";
import { AuthApi, ProductProps } from "../services/auth-api";

export const metadata: Metadata = {
  title: "Dashboard - Autenticação",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const cookie = NextAuthCookie()!;
  const plan = await verifyPlan(cookie);
  const {
    data: { products },
  } = await AuthApi(cookie)<{ products: ProductProps[] }>("/product");

  return (
    <section className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))] mb-5">
      <Products
        products={products.reverse()}
        cookie={cookie}
        plan={plan.data}
      />
    </section>
  );
}
