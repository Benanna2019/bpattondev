import z from "zod";

import { DocSchema, BookmarkIdSchema } from "./model";

export const BookmarkSchema = z
  .object({
    id: BookmarkIdSchema,
    parent: z.string(), // user-id
    title: z.string().max(280),
    url: z.string().max(512),
    description: z.string().max(2048),
  })
  .passthrough();

export type Bookmark = z.infer<typeof BookmarkSchema>;
export type NewBookmark = Omit<Bookmark, "id">;

export const BookmarkDocSchema = DocSchema.extend(
  BookmarkSchema.extend({ _id: BookmarkIdSchema, type: z.literal("bookmark") }).omit({
    id: true,
  }).shape
);
export type BookmarkDoc = z.infer<typeof BookmarkDocSchema>;
