import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"

import { prisma } from "@/lib/prisma"

// BETTER_AUTH_SECRET and BETTER_AUTH_URL are read from the environment.
export const auth = betterAuth({
  appName: "next-app",
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  session: {
    // Cache the session in a signed cookie for 5 minutes to avoid a DB
    // round-trip on every getSession call.
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  account: {
    // GitHub access tokens are stored on the account row; encrypt them at rest.
    encryptOAuthTokens: true,
  },

  // Send OAuth/API errors back to our own sign-in page (?error=...) instead
  // of better-auth's default error page.
  onAPIError: {
    errorURL: "/sign-in",
  },

  // nextCookies must be the last plugin so cookies set from Server Actions
  // are forwarded to the response.
  plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session
export type User = Session["user"]
