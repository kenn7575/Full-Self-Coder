"use client"

import { use } from "react"

import { UserContext } from "@/components/auth/user-provider"

/**
 * The signed-in user inside the (app) section. Non-null by construction:
 * the (app) layout only renders <UserProvider> after `requireUser()`.
 * Throws if used outside the gate; use `useAuth()` there instead.
 */
export function useUser() {
  const user = use(UserContext)
  if (!user) {
    throw new Error(
      "useUser() must be used inside the (app) section. Use useAuth() on public pages."
    )
  }
  return user
}
