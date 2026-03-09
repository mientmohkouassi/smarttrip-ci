/**
 * auth-client.ts — SmartTrip CI Auth Utility
 *
 * All auth state is stored in localStorage under "smarttrip_auth".
 * This is structured exactly like a real API response so that when you
 * connect a real backend (Prisma, Supabase, etc.) you only need to
 * replace these functions with fetch() calls — zero UI changes needed.
 *
 * Schema mirrors what a real JWT payload / user profile endpoint returns.
 */

export type UserRole = "user" | "partner" | "admin";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string | null;
    phone: string | null;
    /** For partners: business name */
    businessName: string | null;
    /** For partners: business category */
    businessCategory: string | null;
    preferences: string[]; // e.g. ["Beach", "Nature", "Urban"]
    onboardingComplete: boolean;
    joinedAt: string; // ISO string
}

const STORAGE_KEY = "smarttrip_auth";
const ACCOUNTS_KEY = "smarttrip_accounts"; // all registered accounts index

// ─── Demo accounts (mirrors auth.ts server-side) ─────────────────────────────
const DEMO_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
    "user@smarttrip.ci": {
        password: "user1234",
        user: {
            id: "demo-user-1",
            name: "Demo Traveler",
            email: "user@smarttrip.ci",
            role: "user",
            avatar: null,
            phone: null,
            businessName: null,
            businessCategory: null,
            preferences: ["Beach", "Culture"],
            onboardingComplete: true,
            joinedAt: "2025-01-01T00:00:00Z",
        },
    },
    "partner@smarttrip.ci": {
        password: "partner123",
        user: {
            id: "demo-partner-1",
            name: "SmartTrip Partner",
            email: "partner@smarttrip.ci",
            role: "partner",
            avatar: null,
            phone: null,
            businessName: "Explore Côte d'Ivoire",
            businessCategory: "Tour Operator",
            preferences: [],
            onboardingComplete: true,
            joinedAt: "2025-01-01T00:00:00Z",
        },
    },
};

// ─── Read / Write helpers ─────────────────────────────────────────────────────

export function getCurrentUser(): AuthUser | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
        return null;
    }
}

function setCurrentUser(user: AuthUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearCurrentUser(): void {
    localStorage.removeItem(STORAGE_KEY);
}

function getAllAccounts(): Record<string, { passwordHash: string; user: AuthUser }> {
    try {
        const raw = localStorage.getItem(ACCOUNTS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveAccount(email: string, password: string, user: AuthUser): void {
    const accounts = getAllAccounts();
    // Store a simple hash (XOR obfuscation) — NOT for production, just to avoid plain text
    accounts[email.toLowerCase()] = { passwordHash: btoa(password), user };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

// ─── Auth Operations ──────────────────────────────────────────────────────────

export interface SignUpData {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    businessName?: string;
    businessCategory?: string;
}

export type AuthResult =
    | { success: true; user: AuthUser }
    | { success: false; error: string };

/** Register a brand-new account and log in immediately */
export function signUpLocal(data: SignUpData): AuthResult {
    const email = data.email.toLowerCase().trim();

    // Check demo accounts
    if (DEMO_ACCOUNTS[email]) {
        return { success: false, error: "An account with this email already exists." };
    }

    // Check existing registered accounts
    const accounts = getAllAccounts();
    if (accounts[email]) {
        return { success: false, error: "An account with this email already exists." };
    }

    const user: AuthUser = {
        id: `user-${Date.now()}`,
        name: data.name.trim(),
        email,
        role: data.role,
        avatar: null,
        phone: data.phone?.trim() || null,
        businessName: data.businessName?.trim() || null,
        businessCategory: data.businessCategory?.trim() || null,
        preferences: [],
        onboardingComplete: false, // triggers onboarding flow
        joinedAt: new Date().toISOString(),
    };

    saveAccount(email, data.password, user);
    setCurrentUser(user);
    return { success: true, user };
}

/** Sign in with email + password (checks demo accounts + localStorage accounts) */
export function signInLocal(email: string, password: string): AuthResult {
    const normalized = email.toLowerCase().trim();

    // Check demo accounts first
    const demo = DEMO_ACCOUNTS[normalized];
    if (demo) {
        if (demo.password !== password) {
            return { success: false, error: "Invalid email or password." };
        }
        setCurrentUser(demo.user);
        return { success: true, user: demo.user };
    }

    // Check localStorage accounts
    const accounts = getAllAccounts();
    const record = accounts[normalized];
    if (!record) {
        return { success: false, error: "No account found with this email address." };
    }
    if (atob(record.passwordHash) !== password) {
        return { success: false, error: "Invalid email or password." };
    }

    setCurrentUser(record.user);
    return { success: true, user: record.user };
}

/** Update the logged-in user's profile (merges partial data) */
export function updateUserProfile(updates: Partial<AuthUser>): AuthUser | null {
    const current = getCurrentUser();
    if (!current) return null;

    const updated = { ...current, ...updates };
    setCurrentUser(updated);

    // Also update the accounts store
    const accounts = getAllAccounts();
    if (accounts[current.email]) {
        accounts[current.email].user = updated;
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    }

    return updated;
}

/** Mark onboarding as complete */
export function completeOnboarding(preferences: string[]): void {
    updateUserProfile({ preferences, onboardingComplete: true });
}

/** Sign out */
export function signOutLocal(): void {
    clearCurrentUser();
}
