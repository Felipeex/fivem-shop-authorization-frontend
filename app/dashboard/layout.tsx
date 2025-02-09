import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { verifyPlan } from "../utils/verifyPlan";
import { UnplannedAlert } from "@/components/unplanned-alert";
import { NextAuthCookie } from "../utils/next-auth-cookie";
import { Header } from "@/components/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const cookie = NextAuthCookie();
  if (!cookie) return <>{children}</>;
  const plan = await verifyPlan(cookie);

  return (
    <>
      {!plan.data && <UnplannedAlert name={session?.user?.name!} />}
      {plan.data.isExpired && (
        <UnplannedAlert name={session?.user?.name!} expired />
      )}
      {!plan.data && (
        <div className="w-full py-[5px] bg-[#5F71CB] text-center">
          <span>
            Faça sua assinatura em nosso discord, para ter acesso a criação de
            produto
          </span>
        </div>
      )}

      {plan.data && plan.data.isExpired && (
        <div className="w-full py-[5px] bg-[#FF6B6B] text-center">
          <span>
            Sua assinatura acabou, renove-a para ter acesso ao serviço
            novamente!
          </span>
        </div>
      )}
      <main className="max-w-[90vw] m-auto">
        <Header session={session} />
        <div className="mt-[50px]">{children}</div>
      </main>
    </>
  );
}
