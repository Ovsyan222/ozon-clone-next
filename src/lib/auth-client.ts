// lib/auth-client.ts
import { createAuthClient } from 'better-auth/react';
import { auth } from './auth';

export const { signIn, signOut, signUp, useSession } = createAuthClient(auth);