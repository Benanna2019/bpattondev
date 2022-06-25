import { useTransition } from "@remix-run/react";
import * as React from "react";
import type { Post } from "~/services/models/post";

import { timestampToCleanTime } from "../../../lib/transformers";
import { Detail } from "../ListDetail/Detail";
import { TitleBar } from "../ListDetail/TitleBar";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { PostActions } from "./PostActions";

export default function PostDetail(post: Post) {
  const scrollContainerRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const transition = useTransition();

  let loading = transition.state === "loading";

  if (loading) {
    return <Detail.Loading />;
  }

  if (!post) {
    return <Detail.Null />;
  }
  const publishedAt = timestampToCleanTime({ timestamp: post.publishedAt });
  return (
    <>
      <Detail.Container data-cy="post-detail" ref={scrollContainerRef}>
        <TitleBar
          backButton
          globalMenu={false}
          backButtonHref={"/writing"}
          magicTitle
          title={post.title}
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
          trailingAccessory={<PostActions {...post} />}
        />

        <Detail.ContentContainer>
          <Detail.Header>
            <Detail.Title ref={titleRef}>{post.title}</Detail.Title>
            <span
              title={publishedAt.raw}
              className="text-tertiary inline-block leading-snug"
            >
              {publishedAt.formatted}
            </span>
          </Detail.Header>

          <MarkdownRenderer children={post.body} className="prose mt-8" />

          {/* bottom padding to give space between post content and comments */}
          <div className="py-6" />
        </Detail.ContentContainer>
      </Detail.Container>
    </>
  );
}
