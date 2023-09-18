"use client";
import { usePathname } from "next/navigation";
import { Profile } from "@/components/profile";
import { Session } from "next-auth";
import Link from "next/link";

interface HeaderProps {
  session: Session | null;
}

export function Header({ session }: HeaderProps) {
  const pathname = usePathname();
  return (
    <header className="mt-[50px] flex justify-between">
      <Profile session={session} />
      {pathname === "/dashboard" && (
        <Link href="dashboard/product/create">
          <button className="mt-[15px] bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]">
            Criar Produto
          </button>
        </Link>
      )}
    </header>
  );
}
