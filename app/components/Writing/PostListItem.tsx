/* eslint-disable react/display-name */
import * as React from "react";

import type { Post } from "~/services/models/post";
import { timestampToCleanTime } from "../../../lib/transformers";
import { ListItem } from "../ListDetail/ListItem";

interface Props {
  post: Post;
  active: boolean;
}

export const PostListItem = React.memo<Props>(({ post, active }) => {
  const publishedAt = timestampToCleanTime({ timestamp: post.publishedAt });
  return (
    <ListItem
      key={post.id}
      href={`/writing/${post.id}`}
      title={post.title}
      byline={post.publishedAt ? publishedAt.formatted : "Draft"}
      active={active}
    />
  );
});
