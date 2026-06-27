// src/app/apres-connexion/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ApresConnexionPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  redirect(session.user.role === "ADMIN" ? "/admin/dashboard" : "/membre/dashboard");
}