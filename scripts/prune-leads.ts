/**
 * Delete data past its retention period: `pnpm leads:prune`
 * The form also does this after each submission; run it by hand if the form has been quiet.
 */
import { getDb } from "../db";
import { pruneExpired } from "../lib/retention";

try {
  process.loadEnvFile(".env.local");
} catch {
  // No .env.local: rely on the shell environment.
}

pruneExpired(getDb())
  .then((deleted) => {
    console.log(`Deleted ${deleted.leads} expired leads and ${deleted.submissionLogs} old rate-limit records`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
