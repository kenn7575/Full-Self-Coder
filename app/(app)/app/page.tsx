import type { Metadata } from "next"

import { AccountCard } from "@/app/(app)/app/account-card"
import { requireUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  // Re-checked here (cached per request) rather than trusting the layout.
  const user = await requireUser("/app")
  const firstName = user.name.split(" ")[0] || user.name

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-medium tracking-tight">Hi, {firstName}</h1>
        <p className="text-sm text-muted-foreground">
          You&apos;re signed in with GitHub.
        </p>
      </div>
      <AccountCard />
    </div>
  )
}
