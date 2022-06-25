import z from "zod";

const IdSchema = (prefix: string) => z.string().regex(new RegExp(`^${prefix}-([\\w-]+)$`));
const SlugSchema = (prefix: string) => z.string().regex(new RegExp(`^${prefix}-([\\w-]+)$`));

export const UserIdSchema = IdSchema("user");

export const NoteIdSchema = IdSchema("note");

export const PasswordIdSchema = IdSchema("password");

export const BookmarkIdSchema = IdSchema("bookmark");

export const QuestionIdSchema = IdSchema("question");

export const CommentIdSchema = IdSchema("comment");

export const PostIdSchema = IdSchema("post");
export const PostSlugSchema = SlugSchema("slug");

export const AudioIdSchema = IdSchema("audio");

export const PostEditIdSchema = IdSchema("post_edit");

export const TagIdSchema = IdSchema("tag");

export const StackIdSchema = IdSchema("stack");

export const ReactionIdSchema = IdSchema("reaction");

export const EmailSubscriptionIdSchema = IdSchema("email_subscription");

export const PostImageIdSchema = IdSchema("post_image");

export const DocType = z.enum([
  "note",
  "user",
  "password",
  "bookmark",
  "question",
  "comment",
  "post",
  "audio",
  "post_edit",
  "tag",
  "stack",
  "reaction",
  "email_subscription",
  "post_image",
]);
// A generic doc schema all of our docs in hyper data will adhere to
export const DocSchema = z
  .object({
    _id: z.union([
      UserIdSchema,
      NoteIdSchema,
      PasswordIdSchema,
      BookmarkIdSchema,
      QuestionIdSchema,
      CommentIdSchema,
      PostIdSchema,
      PostSlugSchema,
      AudioIdSchema,
      PostEditIdSchema,
      TagIdSchema,
      StackIdSchema,
      ReactionIdSchema,
      EmailSubscriptionIdSchema,
      PostImageIdSchema,
    ]),
    type: DocType,
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .passthrough();
