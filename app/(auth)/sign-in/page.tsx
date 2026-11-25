import { AlertCircleIcon } from "lucide-react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { GitHubSignInButton } from "@/components/auth/github-sign-in-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { safeCallbackUrl } from "@/lib/redirect"
import { getSession } from "@/lib/session"

export const metadata: Metadata = {
  title: "Sign in",
}

// Error codes better-auth appends as ?error= when the OAuth flow fails.
const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "You cancelled the GitHub authorization.",
  state_mismatch:
    "Your sign-in session expired or was started in another tab. Please try again.",
  please_restart_the_process: "Your sign-in expired. Please try again.",
  email_not_found:
    "We couldn't read an email address from your GitHub account. Add a verified email on GitHub and try again.",
  account_not_linked:
    "This email is already linked to a different sign-in method.",
  unable_to_get_user_info:
    "GitHub didn't return your profile. Please try again.",
  signup_disabled: "New sign-ups are currently disabled.",
}

export default async function SignInPage({
  searchParams,
}: PageProps<"/sign-in">) {
  const params = await searchParams
  const callbackUrl = safeCallbackUrl(params.callbackUrl)

  // Already signed in: skip the form.
  if (await getSession()) {
    redirect(callbackUrl)
  }

  const errorCode = Array.isArray(params.error) ? params.error[0] : params.error
  const errorMessage = errorCode
    ? (ERROR_MESSAGES[errorCode] ??
      "Something went wrong signing you in. Please try again.")
    : null

  return (
    <Card className="w-full max-w-sm gap-6 py-8 shadow-sm [--card-spacing:--spacing(8)]">
      <CardHeader className="justify-items-center text-center">
        <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="text-sm font-semibold">N</span>
        </div>
        <CardTitle className="text-lg">Welcome back</CardTitle>
        <CardDescription>Sign in to continue to next-app.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {errorMessage ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Sign-in failed</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}
        <GitHubSignInButton callbackUrl={callbackUrl} />
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-center text-xs text-muted-foreground">
          We only read your public profile and email address.
          <br />A new account is created on first sign-in.
        </p>
      </CardFooter>
    </Card>
  )
}
