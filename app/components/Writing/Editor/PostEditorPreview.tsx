import * as React from "react";

import { Detail } from "../../ListDetail/Detail";
import { MarkdownRenderer } from "../../MarkdownRenderer";
import { PostEditorContext } from "./PostEditor";

export function PostEditorPreview() {
  const context = React.useContext(PostEditorContext);
  const { draftState } = context;
  const { title, body } = draftState;

  return (
    <Detail.ContentContainer>
      <Detail.Header>
        <Detail.Title>{title}</Detail.Title>
      </Detail.Header>

      <MarkdownRenderer children={body} className="prose mt-8" />

      {/* bottom padding to give space between post content and comments */}
      <div className="py-6" />
    </Detail.ContentContainer>
  );
}
