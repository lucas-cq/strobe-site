import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { Pool } from "pg";
import * as schema from "./schema";

export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

let db: Db | undefined;

/**
 * Neon URLs use Neon's HTTP driver, which suits serverless functions.
 * Any other Postgres URL (a local database, for example) uses node-postgres.
 * Created on first use so builds don't need DATABASE_URL.
 */
export function getDb(): Db {
  if (db) return db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  const isNeon = new URL(url).hostname.endsWith(".neon.tech");
  db = isNeon ? drizzleNeon({ client: neon(url), schema }) : drizzlePg({ client: new Pool({ connectionString: url }), schema });
  return db;
}

export { schema };
