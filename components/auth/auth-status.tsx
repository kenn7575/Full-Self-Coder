"use client"

import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { GitHubIcon } from "@/components/auth/github-icon"
import { UserAvatar } from "@/components/auth/user-avatar"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"

/** Session-aware call to action for public pages. */
export function AuthStatus() {
  const { user, isPending } = useAuth()

  if (isPending) {
    return <Skeleton className="h-8 w-44" />
  }

  if (!user) {
    return (
      <Link href="/sign-in" className={buttonVariants({ size: "lg" })}>
        <GitHubIcon data-icon="inline-start" />
        Sign in with GitHub
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <UserAvatar user={user} />
      <Link href="/app" className={buttonVariants({ size: "lg" })}>
        Go to dashboard
        <ArrowRightIcon data-icon="inline-end" />
      </Link>
    </div>
  )
}
