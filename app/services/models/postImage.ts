import z from "zod";

import { DocSchema, PostImageIdSchema } from "./model";

export const PostImageSchema = z
  .object({
    id: PostImageIdSchema,
    parent: z.string(), // post-id
    filename: z.string(),
  })
  .passthrough();

export type PostImage = z.infer<typeof PostImageSchema>;
export type NewPostImage = Omit<PostImage, "id">;

export const PostImageDocSchema = DocSchema.extend(
  PostImageSchema.extend({ _id: PostImageIdSchema, type: z.literal("postImage") }).omit({
    id: true,
  }).shape
);
export type PostImageDoc = z.infer<typeof PostImageDocSchema>;
