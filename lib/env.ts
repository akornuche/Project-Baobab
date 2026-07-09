import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  MEILISEARCH_URL: z.string().url(),
  MEILISEARCH_API_KEY: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);