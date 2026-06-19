import { create } from "zustand"
import type { AuthStore, AuthUser } from "../types"
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "@/lib/storage"

const AUTH_STORAGE_KEY = "quiz-app-auth"
const storedUser = getStorageItem<AuthUser>(AUTH_STORAGE_KEY)

export const useAuthStore = create<AuthStore>((set) => ({
  user: storedUser,
  isAuthenticated: Boolean(storedUser),

  login: (username: string) => {
    const user: AuthUser = {
      username,
    }

    setStorageItem(AUTH_STORAGE_KEY, user)

    set({
      user,
      isAuthenticated: true,
    })
  },

  logout: () => {
    removeStorageItem(AUTH_STORAGE_KEY)

    set({
      user: null,
      isAuthenticated: false,
    })
  },
}))
