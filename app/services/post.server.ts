import cuid from "cuid";

import type { PostDoc, NewPost } from "./models/post";
import { PostSchema, PostDocSchema } from "./models/post";
import { DocType, PostIdSchema } from "./models/model";
import { NotFoundError } from "./models/err";

import { fromHyper, toHyper } from "./hyper";
import type { PostServer, ServerContext } from "./types";

export const PostsServerFactory = (env: ServerContext): PostServer => {
  async function getPostsList(): ReturnType<PostServer["getPostsList"]> {
    const { hyper } = env;

    const { docs } = await hyper.data.query({ type: "post" });

    return docs.map(fromHyper.as(PostSchema));
  }

  async function getPost({
    id,
  }: {
    id: string;
  }): ReturnType<PostServer["getPost"]> {
    const { hyper } = env;

    id = PostIdSchema.parse(id);
    const res = await hyper.data.get(id);

    if (!res.ok && res.status === 404) {
      return null;
    }

    return fromHyper.as(PostSchema)(res);
  }

  async function getPostsByParent({
    parent,
  }: {
    parent: string;
  }): ReturnType<PostServer["getPostsByParent"]> {
    // check hyper cache
    const { hyper, UserServer } = env;

    const user = await UserServer.getUserById(parent);

    if (!user) {
      throw new NotFoundError(`parent with id ${parent} not found`);
    }

    // TODO: use hyper cache to instead of querying db
    const { docs } = await hyper.data.query<PostDoc>({
      type: "post",
      parent,
    });
    return docs.map(fromHyper.as(PostSchema));
  }

  async function getPostBySlug({
    slug,
  }: {
    slug: string;
  }): ReturnType<PostServer["getPostBySlug"]> {
    // check hyper cache
    const { hyper } = env;

    // TODO: use hyper cache to instead of querying db
    const { docs } = await hyper.data.query<PostDoc>({
      type: "post",
      slug,
    });

    if (!docs.length) {
      return null;
    }

    const post = docs.pop() as PostDoc;

    return post && fromHyper.as(PostSchema)(post);
  }

  async function createPost({
    body,
    title,
    parent,
    slug,
    excerpt,
    status,
    publishedAt,
  }: NewPost): ReturnType<PostServer["createPost"]> {
    const { hyper, UserServer } = env;

    const user = await UserServer.getUserById(parent);

    if (!user) {
      throw new NotFoundError(`parent with id ${parent} not found`);
    }

    const newPost = PostSchema.parse({
      id: `post-${cuid()}`,
      title,
      body,
      parent,
      slug,
      excerpt,
      status,
      publishedAt,
    });
    await hyper.data.add<PostDoc>(
      toHyper.as(PostDocSchema)({ ...newPost, type: DocType.enum.post })
    );
    // TODO: invalidate hyper cache for posts from parent

    return newPost;
  }

  async function deletePost({
    id,
  }: {
    id: string;
  }): ReturnType<PostServer["deletePost"]> {
    const { hyper } = env;
    const post = await getPost({ id });

    if (!post) {
      throw new NotFoundError();
    }

    await hyper.data.remove(post.id);
    // TODO: invalidate hyper cache for posts from parent
  }

  return {
    getPostsList,
    getPost,
    getPostsByParent,
    getPostBySlug,
    createPost,
    deletePost,
  };
};
