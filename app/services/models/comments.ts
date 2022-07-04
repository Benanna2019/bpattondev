import z from "zod";

import { DocSchema, CommentIdSchema } from "./model";

export const CommentSchema = z
  .object({
    id: CommentIdSchema,
    author: z.string(), // user-id
    parent: z.string(), // This is the post, bookmark, or question the comment is attached to.
    text: z.string().max(280),
  })
  .passthrough();

export type Comment = z.infer<typeof CommentSchema>;
export type NewComment = Omit<Comment, "id">;

export const CommentDocSchema = DocSchema.extend(
  CommentSchema.extend({ _id: CommentIdSchema, type: z.literal("comment") }).omit({
    id: true,
  }).shape
);
export type CommentDoc = z.infer<typeof CommentDocSchema>;
