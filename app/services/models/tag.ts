import z from "zod";

import { DocSchema, TagIdSchema } from "./model";

export const TagSchema = z
  .object({
    id: TagIdSchema,
    parent: z.string(), // This is the post, bookmark, or question the comment is attached to.
    name: z.string().max(50),
  })
  .passthrough();

export type Tag = z.infer<typeof TagSchema>;
export type NewTag = Omit<Tag, "id">;

export const TagDocSchema = DocSchema.extend(
  TagSchema.extend({ _id: TagIdSchema, type: z.literal("tag") }).omit({
    id: true,
  }).shape
);
export type TagDoc = z.infer<typeof TagDocSchema>;
