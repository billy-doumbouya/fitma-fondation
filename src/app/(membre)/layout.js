// src/app/(membre)/layout.js
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import MembreSidebar from "@/components/membre/MembreSidebar"

export default async function MembreLayout({ children }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  if (session.user.role === "ADMIN") redirect("/admin/dashboard")
  return (
    <div className="min-h-screen flex" style={{ background:"var(--sable)" }}>
      <MembreSidebar user={session.user}/>
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  )
}
