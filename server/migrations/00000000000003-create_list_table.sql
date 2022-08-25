-- +migrate Up
CREATE TABLE "public"."list"
(
	"id"         uuid                                        NOT NULL DEFAULT uuid_generate_v4(),
	"user_id"    uuid                                        NOT NULL,
	"title"      varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
	"position"   int4                                        NOT NULL DEFAULT 0,
	"created_at" timestamptz(6)                              NOT NULL DEFAULT now(),
	"updated_at" timestamptz(6)                              NOT NULL DEFAULT now()
)
;
ALTER TABLE "public"."list" OWNER TO "postgres";
ALTER TABLE "public"."list" ADD CONSTRAINT "list_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."list" ADD CONSTRAINT "list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- +migrate Down
DROP TABLE IF EXISTS "public"."list";

