import { DiscordToken } from "@/components/discord-token";
import { authOptions } from "@/config/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Configuração - Autenticação",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <Link href="/dashboard">
        <ul className="flex items-center gap-4">
          <span className="icon-[ep--arrow-left-bold] text-3xl" />
          <h1 className="text-[38px] font-bold">Configuração</h1>
        </ul>
      </Link>

      <DiscordToken />

      <h2 className="text-2xl font-semibold mt-9">Suas assinatura</h2>

      <section className="w-full flex gap-[10px] my-6">
        <div className="rounded-md bg-[#36393F] flex-1 py-[25px] px-[18px] flex flex-col gap-[15px]">
          <span className="font-semibold text-base">
            Informações de cobrança
          </span>
          <p className="text-base font-normal">
            Sua assinatura termina em{" "}
            <strong className="font-medium">25 set. de 2023.</strong> Você pode
            habilitar o pagamento automático ao lado, e não precisar se
            preocopar com a renovação manualmente.
          </p>
        </div>
        <div className="rounded-md bg-[#36393F] flex-1 py-[25px] px-[18px] flex flex-col justify-between">
          <span className="font-semibold text-base mb-2">
            Habilitar pagamento automatico
            <p className="text-base font-normal">
              Com o pagamento automático, você não precisa ser preocupar.
            </p>
          </span>
          <button
            disabled
            className="w-full bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors enabled:hover:bg-[#485598] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ativar
          </button>
        </div>
      </section>
    </>
  );
}
