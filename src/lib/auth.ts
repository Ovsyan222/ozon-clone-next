// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

// Проверяем, что db существует и на сервере
const isServer = typeof window === 'undefined';

export const auth = betterAuth({
  database: isServer && db 
    ? drizzleAdapter(db, {
        provider: 'sqlite',
      })
    : undefined,
  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: false,
  },
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-key-change-in-production",
  trustedOrigins: ['http://localhost:3000'],
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;