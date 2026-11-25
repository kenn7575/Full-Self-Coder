"use client"

import { createContext, type ReactNode } from "react"

import type { User } from "@/lib/auth"

export const UserContext = createContext<User | null>(null)

/**
 * Provides the server-verified user to client components in the gated
 * section. Only pass the user, never the session: the session object
 * contains the session token.
 */
export function UserProvider({
  user,
  children,
}: {
  user: User
  children: ReactNode
}) {
  return <UserContext value={user}>{children}</UserContext>
}
