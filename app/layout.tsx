import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "@/components/next-auth/provider";

const poppins = Poppins({ weight: ["500", "400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fivem Shop - Autenticação",
  description: "Serviço de autenticação para Fivem.",
  icons: "./favicon.ico",
  creator: "Felipeex",
  keywords: [
    "fivem",
    "autenticação",
    "authorization",
    "fivem-auth",
    "fivem-security",
  ],
  category: "security",
  openGraph: {
    title: "Fivem Shop - Autenticação",
    description: "Serviço de autenticação para Fivem.",
    images: [
      "https://cdn.discordapp.com/attachments/946522153887621140/1149213477748088852/fivem-shop.png",
    ],
  },
  assets: [
    "https://cdn.discordapp.com/attachments/946522153887621140/1149213477748088852/fivem-shop.png",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body className={poppins.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
