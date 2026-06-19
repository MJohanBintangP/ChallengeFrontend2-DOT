import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/stores/authStore"

type PublicRouteProps = {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/quiz" replace />
  }

  return children
}
