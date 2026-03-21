import { auth } from "./auth"
import { NextResponse } from "next/server"

/**
 * Centered Security Middleware (OWASP High Modern Patterns)
 * A01: Broken Access Control — Protecting private routes
 * A05: Security Misconfiguration — Enforcing CSP Nonces and Headers
 * A07: Identification and Authentication Failures — Enforcing session checks
 */
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // 1. Route-Level Protection (Identification and Authentication Failures - OWASP A07)
  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')
  const isApiUserRoute = nextUrl.pathname.startsWith('/api/user')
  const isAuthPage = nextUrl.pathname.startsWith('/auth')

  if ((isDashboardRoute || isApiUserRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl))
  }

  // 2. CSP Nonce Implementation (Cryptographic Failures - OWASP A02)
  // Nonces allow us to remove 'unsafe-inline' and trust only specific scripts
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
    style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim()

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-nonce", nonce)
  // Also pass the CSP header so layouts can access it if needed
  requestHeaders.set("Content-Security-Policy", cspHeader)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Enforce the policy on the response (Security Misconfiguration - OWASP A05)
  response.headers.set("Content-Security-Policy", cspHeader)
  
  // Anti-Clickjacking (Broken Access Control - OWASP A01)
  response.headers.set("X-Frame-Options", "DENY")
  
  // MIME Type Sniffing protection
  response.headers.set("X-Content-Type-Options", "nosniff")
  
  // Referrer Policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  return response
})

export const config = {
  // Apply middleware to all routes except assets and icons
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
    "/api/user/:path*",
    "/api/booking/:path*"
  ],
}
