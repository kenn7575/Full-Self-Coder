import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { auth } from "@/lib/auth"

/**
 * Data Access Layer for auth. This is the authoritative session check:
 * the proxy only does an optimistic cookie check, so every protected
 * page, layout, Server Action and Route Handler should go through here.
 *
 * Wrapped in React `cache` so multiple calls in one render share a lookup.
 */
export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() })
})

/** Returns the session or redirects to /sign-in. */
export async function requireSession(callbackUrl?: string) {
  const session = await getSession()
  if (!session) {
    redirect(signInUrl(callbackUrl))
  }
  return session
}

/** Returns the signed-in user or redirects to /sign-in. */
export async function requireUser(callbackUrl?: string) {
  const { user } = await requireSession(callbackUrl)
  return user
}

function signInUrl(callbackUrl?: string) {
  if (!callbackUrl) return "/sign-in"
  return `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`
}
