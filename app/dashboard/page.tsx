import { authOptions } from "@/config/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Autenticação",
  description: "Serviço de autenticação para Fivem.",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <section className="flex">
      <div className="rounded-[10px] border border-[#5F71CB] p-5 flex flex-col bg-[#2E3035]">
        <h2 className="font-normal text-[16px] leading-none">Meu produto</h2>
        <span className="text-[#75808A] font-normal text-[16px] leading-none">
          Clique ao botão abaixo
        </span>
        <button className="mt-[15px] bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]">
          Criar meu primeiro produto
        </button>
      </div>
    </section>
  );
}
