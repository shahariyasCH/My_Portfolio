import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

// Brute-force protection: in-memory tracking of failed login attempts
const failedAttemptsMap = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(email: string) {
  const now = Date.now();
  const record = failedAttemptsMap.get(email);

  if (record && record.lockedUntil > now) {
    const minutesLeft = Math.ceil((record.lockedUntil - now) / (60 * 1000));
    throw new Error(
      `Account access temporarily throttled due to multiple failed attempts. Please retry in ${minutesLeft} minute(s).`
    );
  }

  if (record && record.lockedUntil <= now) {
    failedAttemptsMap.delete(email);
  }
}

function recordFailedAttempt(email: string) {
  const now = Date.now();
  const record = failedAttemptsMap.get(email) || { count: 0, lockedUntil: 0 };
  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
  }

  failedAttemptsMap.set(email, record);
}

function clearFailedAttempts(email: string) {
  failedAttemptsMap.delete(email);
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const normalizedEmail = credentials.email.toLowerCase().trim();

        // 1. Check brute-force lockout
        checkRateLimit(normalizedEmail);

        // 2. Fetch admin user
        const admin = await prisma.admin.findUnique({
          where: { email: normalizedEmail },
        });

        if (!admin) {
          recordFailedAttempt(normalizedEmail);
          throw new Error("Invalid email or password");
        }

        // 3. Constant-time secure password comparison
        const isValid = await bcrypt.compare(credentials.password, admin.hashedPassword);

        if (!isValid) {
          recordFailedAttempt(normalizedEmail);
          throw new Error("Invalid email or password");
        }

        // 4. Successful login: clear attempt history
        clearFailedAttempts(normalizedEmail);

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-key",
};

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function requireAdminSession() {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
