"use client";
import { signIn } from "next-auth/react";

export function DiscordButton() {
  function handleDiscord(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    signIn("discord", { callbackUrl: "/dashboard" });
  }

  return (
    <button
      onClick={(e) => handleDiscord(e)}
      className="py-2 px-12 bg-[#516BF5] rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#485598] disabled:opacity-50"
    >
      <span className="icon-[ic--baseline-discord] text-[50px]" />
    </button>
  );
}
