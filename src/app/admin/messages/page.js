// src/app/(admin)/messages/page.js
import { prisma } from "@/lib/prisma"
import { EmptyState, Badge } from "@/components/ui"
import { formatDate } from "@/lib/utils"
import AdminMessagesClient from "./AdminMessagesClient"
export const metadata = { title:"Messages | Admin Fitma" }
export default async function MessagesPage() {
  const messages = await prisma.message.findMany({ orderBy:{ createdAt:"desc" } })
  return <AdminMessagesClient messages={JSON.parse(JSON.stringify(messages))}/>
}
