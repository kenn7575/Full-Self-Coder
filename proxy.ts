import { getSessionCookie } from "better-auth/cookies"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Optimistic auth gate. It only checks that a session cookie exists (no DB
 * call), so it's fast but not authoritative: an expired or revoked session
 * still passes here and is caught by `requireSession()` in the (app) layout.
 *
 * Its job is to redirect early and remember where the user was going.
 */
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) {
    return NextResponse.next()
  }

  const { pathname, search } = request.nextUrl
  const signInUrl = new URL("/sign-in", request.url)
  signInUrl.searchParams.set("callbackUrl", `${pathname}${search}`)
  return NextResponse.redirect(signInUrl)
}

export const config = {
  // Keep in sync with the routes under app/(app).
  matcher: ["/app/:path*"],
}
