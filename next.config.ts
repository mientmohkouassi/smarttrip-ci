import type { NextConfig } from "next";

/**
 * OWASP Security Headers
 * A05: Security Misconfiguration — enforced via HTTP response headers
 * A01: Broken Access Control — X-Frame-Options prevents clickjacking
 * A02: Cryptographic Failures — HSTS enforces HTTPS
 */
const securityHeaders = [
  // HSTS (OWASP A02: Cryptographic Failures) — enforce HTTPS globally
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Permissions Policy — restrict browser features (OWASP A05)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
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
