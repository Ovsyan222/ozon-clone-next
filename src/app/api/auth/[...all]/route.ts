// app/api/auth/[...all]/route.ts
import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

// Проверяем инициализацию
if (!auth) {
  console.error('Auth not initialized');
}

const handler = toNextJsHandler(auth);

export const { GET, POST } = handler;

export const runtime = 'nodejs'; // Используйте nodejs вместо edge