// src/app/(admin)/layout.js
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AdminSidebar from "@/components/dashboard/AdminSidebar"

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") redirect("/login")
  return (
    <div className="min-h-screen flex" style={{ background:"var(--sable)" }}>
      <AdminSidebar/>
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  )
}
