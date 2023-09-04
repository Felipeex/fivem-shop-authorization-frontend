"use client";
import * as Popover from "@radix-ui/react-popover";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface ProfileProps {
  session: Session | null;
}

export function Profile({ session }: ProfileProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <section className="flex gap-1 items-center cursor-pointer">
          <Image
            src={session?.user?.image!}
            alt="Profile"
            className="rounded-full"
            width={50}
            height={50}
          />
          <ul>
            <h2 className="font-normal text-xl leading-none">
              {session?.user?.name!}
            </h2>
            <span className="font-normal text-xs leading-none opacity-50">
              {session?.user?.email!}
            </span>
          </ul>
        </section>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="outline-none rounded-[5px] flex flex-col gap-[10px] p-[10px] w-[170px] bg-[#444851] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="icon-[icon-park-outline--config] text-xl text-white" />
            <h2 className="text-base">Configurações</h2>
          </div>
          <div className="w-full h-[1px] bg-white opacity-5" />
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            <span className="icon-[uil--signout] text-xl text-[#FF6B6B]" />
            <h2 className="text-base text-[#FF6B6B]">Sair</h2>
          </div>
          <Popover.Arrow className="fill-[#444851]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
