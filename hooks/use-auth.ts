"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

import { authClient, signInWithGitHub } from "@/lib/auth-client"

/**
 * Live client-side auth state. Works anywhere (public or gated pages).
 * Backed by better-auth's shared session store, so every caller shares a
 * single /get-session request and updates together after sign-in/out.
 *
 * Inside the (app) section prefer `useUser()`, which is never null and
 * doesn't flash a loading state.
 */
export function useAuth() {
  const router = useRouter()
  const { data, isPending, error, refetch } = authClient.useSession()

  const signOut = useCallback(async () => {
    await authClient.signOut()
    router.push("/sign-in")
    // Drop any server-rendered data from the signed-in session.
    router.refresh()
  }, [router])

  return {
    user: data?.user ?? null,
    session: data?.session ?? null,
    isPending,
    isAuthenticated: Boolean(data),
    error,
    refetch,
    signInWithGitHub,
    signOut,
  }
}
