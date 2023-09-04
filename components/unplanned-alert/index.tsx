"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UnplannedAlertProps {
  name: string;
  expired?: boolean;
}

export function UnplannedAlert(props: UnplannedAlertProps) {
  const [AlertHandle, setAlertHandle] = useState(false);

  useEffect(() => {
    if (!props.expired) return setAlertHandle(true);
    const existAlert = localStorage.getItem("planAlert") || null;
    if (existAlert) return;
    setAlertHandle(true);
  }, []);

  function handleAlert() {
    setAlertHandle(!AlertHandle);
    localStorage.setItem("planAlert", "true");
  }

  return (
    <AlertDialog.Root open={AlertHandle}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[#00000026] data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[5px] bg-[#35383E] p-[23px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <ul>
            <h2 className="text-[25px] font-normal leading-[150%]">
              Olá, {props.name}
            </h2>
            <p className="text-[#FFFFFFCC] font-normal text-[15px]">
              {props.expired
                ? `Sua assinatura acabou, caso deseje ter acesso novamente ao
              serviço, renove sua assinatura em nosso Discord.`
                : `Você ainda não possui uma assinatura, para liberar acesso ao serviço. Faça sua assinatura em nosso Discord`}
            </p>
          </ul>

          <div className="w-full flex gap-6 mt-3">
            {props.expired && (
              <button
                className="mt-[15px] bg-[#42454D] px-[30px] py-3 rounded-md transition-colors hover:bg-[#3c4149]"
                onClick={handleAlert}
              >
                Fechar
              </button>
            )}
            <a
              className="flex flex-1"
              href={process.env.NEXT_PUBLIC_DISCORD_INVITE}
              target="_blank"
            >
              <button className="flex-1 mt-[15px] bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]">
                Entrar no Discord
              </button>
            </a>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
