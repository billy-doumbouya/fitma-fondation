"use client"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useToast() {
  return {
    success: (msg, opts) => toast.success(msg, opts),
    error:   (msg, opts) => toast.error(msg, opts),
    info:    (msg, opts) => toast.info(msg, opts),
    warning: (msg, opts) => toast.warning(msg, opts),
    loading: (msg, opts) => toast.loading(msg, opts),
    dismiss: (id) => toast.dismiss(id),
    promise: (p, msgs) => toast.promise(p, msgs),
  }
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const fn = (e) => setMatches(e.matches)
    mq.addEventListener("change", fn)
    return () => mq.removeEventListener("change", fn)
  }, [query])
  return matches
}

export const useIsMobile = () => useMediaQuery("(max-width: 767px)")

export function useAnalytics(page) {
  useEffect(() => {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page }),
    }).catch(() => {})
  }, [page])
}

export function useRequireAuth(redirectTo = "/login") {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "unauthenticated") router.push(redirectTo)
  }, [status, router, redirectTo])
  return { session, loading: status === "loading" }
}

export function useRequireAdmin(redirectTo = "/login") {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "unauthenticated") router.push(redirectTo)
    if (status === "authenticated" && session?.user?.role !== "ADMIN") router.push("/")
  }, [status, session, router, redirectTo])
  return { session, loading: status === "loading" }
}
