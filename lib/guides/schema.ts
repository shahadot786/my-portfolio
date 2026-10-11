import * as z from "zod";
import { SLUG_PATTERN } from "./types";

export const guideInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(150),
  slug: z.string().trim().toLowerCase().min(1, "Slug is required").max(120).regex(SLUG_PATTERN, "Invalid slug"),
  summary: z.string().trim().max(300).default(""),
  content: z.string().max(300_000).default(""),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  coverImage: z
    .string()
    .trim()
    .refine((v) => !v || /^https?:\/\//.test(v), "Cover image must be an http(s) URL")
    .default(""),
  published: z.boolean().default(false),
});
