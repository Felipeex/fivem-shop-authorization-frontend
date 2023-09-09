import { NextAuthCookie } from "@/app/utils/next-auth-cookie";
import { verifyPlan } from "@/app/utils/verifyPlan";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

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
      <div className="w-full flex justify-between gap-5">
        <div className="flex flex-col mt-[30px] flex-1 gap-[10px] max-w-[537px]">
          <label>Nome do produto</label>
          <input
            placeholder="nome-do-script"
            className="flex-1 p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
          />
        </div>
        <div className="flex flex-col mt-[30px] flex-1 gap-[10px] max-w-[537px]">
          <label>Nome do produto</label>
          <input
            placeholder="nome-do-script"
            className="flex-1  p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
          />
        </div>
      </div>
    </>
  );
}
