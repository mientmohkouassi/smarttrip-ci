import type { NextConfig } from "next";

/**
 * OWASP Security Headers
 * A05: Security Misconfiguration — enforced via HTTP response headers
 * A01: Broken Access Control — X-Frame-Options prevents clickjacking
 * A02: Cryptographic Failures — HSTS enforces HTTPS
 */
const securityHeaders = [
  // Prevent MIME-type sniffing (OWASP A05)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevent clickjacking (OWASP A01)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // XSS protection header for older browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Strict referrer policy
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Permissions policy — disable unused browser APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  // HSTS — enforce HTTPS for 1 year (OWASP A02)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Content Security Policy (OWASP A03 / XSS prevention)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires these; tighten in future
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' https:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  // OWASP A09: Don't leak server info in headers
  poweredByHeader: false,
};

export default nextConfig;
