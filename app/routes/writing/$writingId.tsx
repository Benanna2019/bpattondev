import type { LoaderFunction } from "@remix-run/node";
import type { Post } from "~/services/models/post";
import type { LoaderContext } from "~/types";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { ListDetailView, SiteLayout } from "~/components/Layouts";
import { PostEditor } from "~/components/Writing/Editor/PostEditor";
import PostDetail from "~/components/Writing/PostDetail";
import { PostsList } from "~/components/Writing/PostsList";
import * as z from "zod";

type LoaderData = {
  data: {
    post: Post;
  };
};

const PostIdSchema = z.string().min(1);

// function checkPost(post: Post, parent: string) {
//   if (post.parent !== parent) {
//     console.warn(
//       `user ${parent} attempted to access post ${post.id} belonging to ${post.parent}`
//     );
//     throw new Response("Forbidden", { status: 403 });
//   }
// }

export const loader: LoaderFunction = async ({ params, context, request }) => {
  const { PostServer } = context as LoaderContext;

  const parsed = PostIdSchema.safeParse(params.writingId);

  if (!parsed.success) {
    throw new Response("postId query param required", { status: 404 });
  }

  const postById = await PostServer.getPost({ id: parsed.data });
  const postBySlug = await PostServer.getPostBySlug({ slug: parsed.data });

  const post = postById ? postById : postBySlug;

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ data: { post } });
};

function WritingPostPage() {
  const { data } = useLoaderData() as LoaderData;
  const page =
    data?.post && !data.post.publishedAt ? (
      <PostEditor data={data} />
    ) : (
      <PostDetail {...data.post} />
    );
  return (
    <SiteLayout>
      <ListDetailView list={<PostsList />} hasDetail detail={page} />
    </SiteLayout>
  );
}

export default WritingPostPage;
