"use client"

import { Loader2Icon } from "lucide-react"
import { useState } from "react"

import { GitHubIcon } from "@/components/auth/github-icon"
import { Button } from "@/components/ui/button"
import { signInWithGitHub } from "@/lib/auth-client"

export function GitHubSignInButton({ callbackUrl }: { callbackUrl: string }) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setPending(true)
    setError(null)
    const { error } = await signInWithGitHub(callbackUrl)
    // On success the browser is already navigating to GitHub, so we leave
    // the button in its pending state.
    if (error) {
      setError(error.message ?? "Could not start GitHub sign-in.")
      setPending(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="lg"
        className="h-9 w-full text-sm"
        onClick={handleClick}
        disabled={pending}
      >
        {pending ? (
          <Loader2Icon className="animate-spin" data-icon="inline-start" />
        ) : (
          <GitHubIcon data-icon="inline-start" />
        )}
        {pending ? "Redirecting to GitHub…" : "Continue with GitHub"}
      </Button>
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
