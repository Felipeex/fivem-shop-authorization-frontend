import { cookies } from "next/headers";

export function NextAuthCookie() {
  const cookieStore = cookies();
  return (
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value
  );
}
