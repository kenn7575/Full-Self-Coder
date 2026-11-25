export const DEFAULT_AUTHENTICATED_PATH = "/app"

/**
 * Only allow same-origin relative paths as post-sign-in redirects, so a
 * crafted ?callbackUrl= can't bounce users to another site.
 */
export function safeCallbackUrl(
  value: string | string[] | null | undefined,
  fallback: string = DEFAULT_AUTHENTICATED_PATH
): string {
  const url = Array.isArray(value) ? value[0] : value
  if (!url) return fallback
  // Must be a path ("/foo"), not protocol-relative ("//evil.com") or
  // backslash tricks ("/\evil.com") that some browsers normalise to "//".
  if (!url.startsWith("/") || url.startsWith("//") || url.startsWith("/\\")) {
    return fallback
  }
  return url
}
