import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { ListDetailView, SiteLayout } from "~/components/Layouts";
import { Detail } from "~/components/ListDetail/Detail";
// import { withProviders } from '~/components/Providers/withProviders'
import { PostEditor } from "~/components/Writing/Editor/PostEditor";
import { trimBodyToExcerpt, useOptionalUser } from "~/utils";
import { z } from "zod";

import type { LoaderContext } from "~/types";
import slugify from "slugify";

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

const FormDataSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export const action: ActionFunction = async ({ request, context }) => {
  const { SessionServer, PostServer } = context as LoaderContext;

  const parent = await SessionServer.requireUserId(request);

  const formData = await request.formData();

  const parsed = FormDataSchema.safeParse({
    title: formData.get("title") ?? null,
    body: formData.get("body") ?? null,
  });

  if (!parsed.success) {
    const errors = parsed.error.format();
    return json<ActionData>(
      {
        errors: {
          title: errors.title?._errors.join(". "),
          body: errors.body?._errors.join(". "),
        },
      },
      { status: 400 }
    );
  }

  const { title, body } = parsed.data;

  let slug = slugify(title);
  let excerpt = trimBodyToExcerpt(body);

  const post = await PostServer.createPost({
    title,
    body,
    parent,
    slug,
    excerpt,
    publishedAt: new Date().toLocaleDateString(),
    status: "published",
  });

  console.log("full post", post);

  return redirect(`/writing/${post.id}`);
};

function NewPostPage() {
  const actionData = useActionData() as ActionData;
  const user = useOptionalUser();
  if (!user?.isAdmin) return <Detail.Null />;
  return (
    <SiteLayout>
      <ListDetailView
        list={null}
        hasDetail={false}
        detail={<PostEditor data={null} {...actionData} />}
      />
    </SiteLayout>
  );
}

export default NewPostPage;
