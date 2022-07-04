import z from "zod";

import { DocSchema, ReactionIdSchema } from "./model";

export const ReactionSchema = z
  .object({
    id: ReactionIdSchema,
    user: z.string(), // user-id
    parent: z.string(), // This is the post, bookmark, or question the comment is attached to.
    total: z.number().int().default(0),
    // To sum reactions, whenever I get a fetch a post, comment, or something else, I should also be able to
    // getReactionsByParent, which should sum up the count of reactions
  })
  .passthrough();

export type Reaction = z.infer<typeof ReactionSchema>;
export type NewReaction = Omit<Reaction, "id">;

export const ReactionDocSchema = DocSchema.extend(
  ReactionSchema.extend({ _id: ReactionIdSchema, type: z.literal("reaction") }).omit({
    id: true,
  }).shape
);
export type ReactionDoc = z.infer<typeof ReactionDocSchema>;
