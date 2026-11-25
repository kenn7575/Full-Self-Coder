"use client"

import { UserAvatar } from "@/components/auth/user-avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useUser } from "@/hooks/use-user"

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium" })

/** Client component reading the gated user via useUser(). */
export function AccountCard() {
  const user = useUser()

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Synced from your GitHub profile.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} size="lg" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{user.name}</span>
            <span className="truncate text-muted-foreground">{user.email}</span>
          </div>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
          <dt className="text-muted-foreground">Email verified</dt>
          <dd>{user.emailVerified ? "Yes" : "No"}</dd>
          <dt className="text-muted-foreground">Member since</dt>
          <dd>{dateFormat.format(new Date(user.createdAt))}</dd>
        </dl>
      </CardContent>
    </Card>
  )
}
