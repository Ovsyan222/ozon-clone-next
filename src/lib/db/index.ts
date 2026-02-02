// src/lib/db/index.ts
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const isServer = typeof window === 'undefined';

let client = null;
let dbInstance = null;

if (isServer) {
  try {
    client = createClient({
      url: process.env.DATABASE_URL || 'file:./sqlite.db',
    });
    
    // Важно: передать schema в drizzle
    dbInstance = drizzle(client, { schema });
    console.log('✅ Database connected with schema');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
}

export const db = dbInstance;