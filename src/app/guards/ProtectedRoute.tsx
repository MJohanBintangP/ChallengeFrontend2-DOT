import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/stores/authStore"
import type React from "react"

type ProtectedRoutesProps = {
  children: React.ReactNode
}

export function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
