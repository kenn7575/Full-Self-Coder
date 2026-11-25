import { createAuthClient } from "better-auth/react"

import { DEFAULT_AUTHENTICATED_PATH } from "@/lib/redirect"

// Same-origin: baseURL is inferred from window.location.
export const authClient = createAuthClient()

/**
 * Starts the GitHub OAuth flow. On success the browser navigates away to
 * GitHub; on failure better-auth returns `{ error }`. OAuth errors coming
 * back from GitHub land on /sign-in?error=<code>.
 */
export function signInWithGitHub(
  callbackURL: string = DEFAULT_AUTHENTICATED_PATH
) {
  return authClient.signIn.social({
    provider: "github",
    callbackURL,
    errorCallbackURL: "/sign-in",
  })
}
