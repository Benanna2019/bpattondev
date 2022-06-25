import cuid from "cuid";

import type { NewPostImage } from "./models/postImage";
import { PostImageSchema, PostImageDocSchema } from "./models/postImage";
import { DocType, PostImageIdSchema } from "./models/model";
import { NotFoundError } from "./models/err";

import { fromHyper, toHyper } from "./hyper";
import type { PostImageServer, ServerContext } from "./types";

export const PostImagesServerFactory = (
  env: ServerContext
): PostImageServer => {
  async function getPostImage({
    id,
  }: {
    id: string;
  }): ReturnType<PostImageServer["getPostImage"]> {
    const { hyper } = env;

    id = PostImageIdSchema.parse(id);
    // Now I want to use hyper.storage.download and need to take into account the sreams and maybe promisify.
    const res = await hyper.storage.download(id);

    // Ill need to figure out how to use the streamPipeline in the loader function for posts to get the post image
    // Then I think I can return it in the loader. But I don't know how to pass that to the response, since
    // the streamPipeline takes 2 args, one being the call to hyper storage and the other being where we are piping the result.

    if (!res) {
      return null;
    }

    return fromHyper.as(PostImageSchema)(res);
  }

  async function getPostImageByParent({
    parent,
  }: {
    parent: string;
  }): ReturnType<PostImageServer["getPostImageByParent"]> {
    // check hyper cache
    const { hyper, UserServer } = env;

    const user = await UserServer.getUserById(parent);

    if (!user) {
      throw new NotFoundError(`parent with id ${parent} not found`);
    }

    // TODO: use hyper cache to instead of querying db
    const res = await hyper.storage.download(parent);
    return fromHyper.as(PostImageSchema)(res);
  }

  async function createPostImage({
    parent,
    filename,
  }: NewPostImage): ReturnType<PostImageServer["createPostImage"]> {
    const { hyper, UserServer } = env;

    const user = await UserServer.getUserById(parent);

    if (!user) {
      throw new NotFoundError(`parent with id ${parent} not found`);
    }

    const newPostImage = PostImageSchema.parse({
      id: `postImage-${cuid()}`,
      parent,
      filename,
    });
    await hyper.data.add(
      toHyper.as(PostImageDocSchema)({
        ...newPostImage,
        type: DocType.enum.post_image,
      })
    );
    // TODO: invalidate hyper cache for posts from parent

    return newPostImage;
  }

  async function deletePostImage({
    id,
  }: {
    id: string;
  }): ReturnType<PostImageServer["deletePostImage"]> {
    const { hyper } = env;
    const postImage = await getPostImage({ id });

    if (!postImage) {
      throw new NotFoundError();
    }

    await hyper.storage.remove(postImage.id);
    // TODO: invalidate hyper cache for posts from parent
  }

  return {
    getPostImage,
    getPostImageByParent,
    createPostImage,
    deletePostImage,
  };
};
