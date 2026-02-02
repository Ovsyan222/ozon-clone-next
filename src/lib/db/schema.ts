// src/lib/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// 1. user таблица (обязательные поля для Better Auth)
export const user = sqliteTable('user', {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull().unique(),
    emailVerified: integer('email_verified', { mode: 'boolean' })
        .notNull()
        .default(false),
    image: text('image'),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// 2. account таблица (важно: accountId вместо providerAccountId)
export const account = sqliteTable('account', {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(), // ОБЯЗАТЕЛЬНОЕ поле для Better Auth!
    providerId: text('provider_id').notNull(), // 'email' или 'github' и т.д.
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: integer('access_token_expires_at'),
    refreshTokenExpiresAt: integer('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'), // Для email/password провайдера
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// 3. session таблица
export const session = sqliteTable('session', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    expiresAt: integer('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
});

// 4. verification таблица
export const verification = sqliteTable('verification', {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: integer('expires_at').notNull(),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// 5. Остальные таблицы вашего приложения
export const product = sqliteTable('product', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    price: integer('price').notNull(),
    discountPrice: integer('discount_price'),
    imageUrl: text('image_url').notNull(),
    stock: integer('stock').default(0),
    category: text('category'),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

export const order = sqliteTable('order', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    total: integer('total').notNull(),
    status: text('status').notNull().default('pending'),
    shippingAddress: text('shipping_address'),
    paymentMethod: text('payment_method'),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

export const orderItem = sqliteTable('order_item', {
    id: text('id').primaryKey(),
    orderId: text('order_id')
        .notNull()
        .references(() => order.id, { onDelete: 'cascade' }),
    productId: text('product_id')
        .notNull()
        .references(() => product.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull().default(1),
    price: integer('price').notNull(),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

export const review = sqliteTable('review', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    productId: text('product_id')
        .notNull()
        .references(() => product.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
});