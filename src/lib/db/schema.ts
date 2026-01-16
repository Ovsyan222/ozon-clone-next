import { sqliteTable, text, real, integer, int } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
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

export const account = sqliteTable('account', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: integer('expires_at'),
    tokenType: text('token_type'),
    scope: text('scope'),
    idToken: text('id_token'),
    sessionState: text('session_state'),
});

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
    userAgent: text('user_agent'),
    ipAddress: text('ip_address'),
});

export const review = sqliteTable('review', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    productId: text('product_id')
        .notNull()
        .references(() => product.id, { onDelete: 'cascade' }),
    rating: real('rating').notNull(),
    comment: text('comment'),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

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