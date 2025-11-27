// app/lib/auth.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";


export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}
