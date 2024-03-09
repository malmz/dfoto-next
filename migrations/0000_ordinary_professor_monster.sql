CREATE TABLE IF NOT EXISTS "album" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"published" boolean DEFAULT false,
	"thumbnail_id" integer,
	"taken_at" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	"modified_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image" (
	"id" serial PRIMARY KEY NOT NULL,
	"exif_data" jsonb,
	"mimetype" text,
	"album_id" integer,
	"taken_by" text,
	"legacy_taken_by" text,
	"taken_at" date DEFAULT now(),
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"modified_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"image_id" integer,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "image" ADD CONSTRAINT "image_album_id_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_image_id_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
