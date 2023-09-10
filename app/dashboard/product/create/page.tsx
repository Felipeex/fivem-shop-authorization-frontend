import { NextAuthCookie } from "@/app/utils/next-auth-cookie";
import { verifyPlan } from "@/app/utils/verifyPlan";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreateProduct } from "@/components/create-product";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const cookie = NextAuthCookie();
  const plan = await verifyPlan(cookie!);
  if (!session || !plan.data) redirect("/");

  return (
    <>
      <Link href="/dashboard">
        <ul className="flex items-center gap-4">
          <span className="icon-[ep--arrow-left-bold] text-3xl" />
          <h1 className="text-[38px] font-bold">Criando seu produto</h1>
        </ul>
      </Link>
      <CreateProduct />
    </>
  );
}
