import { AuthStatus } from "@/components/auth/auth-status"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col items-start gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium tracking-tight">next-app</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This page is public. The dashboard is behind GitHub sign-in.
          </p>
        </div>
        <AuthStatus />
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
