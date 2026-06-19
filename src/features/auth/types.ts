export type AuthUser = {
  username: string
}

export type AuthStore = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (username: string) => void
  logout: () => void
}
