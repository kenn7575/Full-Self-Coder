import Link from "next/link"

import { UserMenu } from "@/components/auth/user-menu"
import { UserProvider } from "@/components/auth/user-provider"
import { requireUser } from "@/lib/session"

/**
 * Auth gate for everything under app/(app).
 *
 * The proxy already redirected requests without a session cookie; this is
 * the authoritative check that the session is actually valid. Pages and
 * Server Actions that touch user data should still call `requireUser()`
 * themselves, because layouts don't re-run on every client navigation.
 */
export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser()

  return (
    <UserProvider user={user}>
      <div className="flex min-h-svh flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
            <Link href="/app" className="text-sm font-medium tracking-tight">
              next-app
            </Link>
            <UserMenu />
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          {children}
        </main>
      </div>
    </UserProvider>
  )
}
