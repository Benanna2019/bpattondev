import z from "zod";

import { DocSchema, PostIdSchema } from "./model";

const StatusSchema = z.enum(["published", "draft"]);

export const PostSchema = z
  .object({
    id: PostIdSchema,
    parent: z.string(), // user-id
    title: z.string().max(280),
    slug: z.string().optional(),
    body: z.string(),
    excerpt: z.string().max(280).optional(),
    status: StatusSchema.optional(),
    publishedAt: z.string().optional(),
    featureImage: z.string().nullable().optional(),
  })
  .passthrough();

export type Post = z.infer<typeof PostSchema>;
export type NewPost = Omit<Post, "id">;

export const PostDocSchema = DocSchema.extend(
  PostSchema.extend({ _id: PostIdSchema, type: z.literal("post") }).omit({
    id: true,
  }).shape
);
export type PostDoc = z.infer<typeof PostDocSchema>;
