import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const album = pgTable('album', {
  id: serial('id').primaryKey(),
  legacy_id: text('legacy_id').unique().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  published: boolean('published').default(false).notNull(),
  thumbnail_id: integer('thumbnail_id'),
  taken_at: date('taken_at').defaultNow().notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  modified_at: timestamp('modified_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const image = pgTable('image', {
  id: serial('id').primaryKey(),
  legacy_id: text('legacy_id').unique().notNull(),
  exif_data: jsonb('exif_data'),
  mimetype: text('mimetype'),
  album_id: integer('album_id')
    .references(() => album.id)
    .notNull(),
  taken_by: text('taken_by'),
  taken_by_name: text('taken_by_name'),
  taken_at: date('taken_at').defaultNow().notNull(),
  created_by: text('created_by'),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const tag = pgTable('tag', {
  id: serial('id').primaryKey(),
  legacy_id: text('legacy_id').unique().notNull(),
  text: text('text').notNull(),
  image_id: integer('image_id')
    .references(() => image.id)
    .notNull(),
  created_by: text('created_by'),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
