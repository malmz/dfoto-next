ALTER TABLE "album" ADD COLUMN "legacy_id" text;--> statement-breakpoint
ALTER TABLE "image" ADD COLUMN "legacy_id" text;--> statement-breakpoint
ALTER TABLE "tag" ADD COLUMN "legacy_id" text;--> statement-breakpoint
ALTER TABLE "album" ADD CONSTRAINT "album_legacy_id_unique" UNIQUE("legacy_id");--> statement-breakpoint
ALTER TABLE "image" ADD CONSTRAINT "image_legacy_id_unique" UNIQUE("legacy_id");--> statement-breakpoint
ALTER TABLE "tag" ADD CONSTRAINT "tag_legacy_id_unique" UNIQUE("legacy_id");