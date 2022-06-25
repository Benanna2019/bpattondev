import z from "zod";

import { DocSchema, UserIdSchema } from "./model";

export const RoleSchema = z.enum(["BLOCKED", "USER", "ADMIN"]);
export const EmailSchema = z
  .string()
  .email()
  .transform((val) => val.toLowerCase());
export const AvatarSchema = z.string();
export const NameSchema = z.string().optional();

export const UserSchema = z.object({
  id: UserIdSchema,
  email: EmailSchema,
  name: NameSchema,
  isAdmin: z.boolean().optional(),
  username: z.string().optional(),
  role: z.string().optional(),
  avatar: z.string().optional(),
  location: z.string().optional(),
});
export type User = z.infer<typeof UserSchema>;

export const UserDocSchema = DocSchema.extend(
  UserSchema.extend({ _id: UserIdSchema, type: z.literal("user") }).omit({ id: true }).shape
);
export type UserDoc = z.infer<typeof UserDocSchema>;
