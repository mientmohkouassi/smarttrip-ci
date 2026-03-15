/**
 * auth-client.ts — SmartTrip CI
 *
 * This file now only exports the UserRole type which is used
 * across the codebase. All auth logic is handled by NextAuth.js
 * server-side with bcrypt-hashed passwords stored in Supabase.
 */

export type UserRole = "user" | "partner" | "admin";
