import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const collections = pgTable('collections', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
});

export const userMedia = pgTable('media', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  tmdbId: integer('tmdb_id').notNull(),
  title: text('title').notNull(),
  mediaType: text('media_type').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
});

export const movies = pgTable('movies', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  tmdbId: integer('tmdb_id').notNull(),
  posterPath: text('poster_path').notNull(),
  title: text('title').notNull(),
  mediaId: text('media_id')
    .notNull()
    .references(() => userMedia.id),
});

export const collectionMedia = pgTable('collection_media', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  collectionId: text('collection_id')
    .notNull()
    .references(() => collections.id),
  mediaId: text('media_id')
    .notNull()
    .references(() => userMedia.id),
});
