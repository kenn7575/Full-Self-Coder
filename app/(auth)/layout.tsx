import Link from "next/link"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-svh flex-col bg-muted/40">
      {/* Subtle dotted backdrop so the card has something to sit on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [background-size:16px_16px]"
      />
      <header className="relative flex h-14 items-center px-6">
        <Link href="/" className="text-sm font-medium tracking-tight">
          next-app
        </Link>
      </header>
      <main className="relative flex flex-1 items-center justify-center px-4 pb-14">
        {children}
      </main>
    </div>
  )
}
