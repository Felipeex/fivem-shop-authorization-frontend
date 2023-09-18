import { NextAuthCookie } from "@/app/utils/next-auth-cookie";
import { verifyPlan } from "@/app/utils/verifyPlan";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UpdateProduct } from "@/components/edit-product";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function Page({ params }: Params) {
  const session = await getServerSession(authOptions);
  const cookie = NextAuthCookie()!;
  const plan = await verifyPlan(cookie);
  if (!session || !plan.data) redirect("/");

  return (
    <>
      <Link href="/dashboard">
        <ul className="flex items-center gap-4">
          <span className="icon-[ep--arrow-left-bold] text-3xl" />
          <h1 className="text-[38px] font-bold">Editar produto</h1>
        </ul>
      </Link>
      <UpdateProduct cookie={cookie} params={params} />
    </>
  );
}
