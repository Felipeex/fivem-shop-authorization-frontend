import Image from "next/image";
import Logo from "@/assets/logo.png";
import { DiscordButton } from "@/components/next-auth/discord-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="w-screen h-screen bg-[url('../assets/background.svg')] flex items-center justify-center">
      <section className="w-[695px] flex flex-col overflow-hidden rounded-[10px]">
        <div className="relative w-full h-[282px] bg-[#5F71CB] flex items-center justify-center">
          <span className="absolute left-4 top-4 icon-[typcn--plus] opacity-20 text-[38px]"></span>
          <Image src={Logo} alt="Logo Fivem Shop" />
          <span className="absolute right-4 bottom-4 icon-[typcn--plus] opacity-20 text-[38px]"></span>
        </div>
        <div className="flex-1 bg-[#36393F] text-center p-[20px]">
          <h1 className="text-[26px] font-medium leading-normal">
            Bem-vindo a nosso sistema de autenticação
          </h1>
          <span className="text-[22px] font-normal leading-normal">
            Faça login com alguma plataforma
          </span>

          <section className="w-full flex justify-between items-center mt-[37px]">
            <DiscordButton />
            <button className="opacity-50 py-2 px-12 bg-white rounded-lg flex items-center justify-center cursor-not-allowed">
              <span className="icon-[flat-color-icons--google] text-[50px]"></span>
            </button>
            <button className="opacity-50 py-2 px-12 bg-black rounded-lg flex items-center justify-center cursor-not-allowed">
              <span className="icon-[ic--baseline-apple] text-[50px]"></span>
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}
