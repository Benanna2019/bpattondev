import * as React from "react";

import { Dropzone } from "../../Dropzone";
import { Textarea } from "../../Input";
import { Detail } from "../../ListDetail/Detail";
import { PostEditorContext } from "./PostEditor";

interface EditOrAddPost {
  data: "Add Post" | "Edit Post";
}

interface ActionData {
  errors?: {
    title?: string;
    body?: string;
    slug?: string;
    excerpt?: string;
    status?: string;
  };
}

export function PostEditorComposer({ data }: EditOrAddPost, actionData: ActionData) {
  const context = React.useContext(PostEditorContext);
  const { draftState, setDraftState } = context;
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  const uploadingImagePlaceholder = "![](Uploading...)";

  function handleTitleChange(e: { target: { value: any } }) {
    setDraftState((draft: any) => ({ ...draft, title: e.target.value }));
  }

  function handleTextBodyChange(e: { target: { value: any } }) {
    setDraftState((draft: any) => ({ ...draft, body: e.target.value }));
  }

  function onUploadComplete(url: any) {
    const image = `![](${url})`;
    setDraftState((draft: { text: string }) => ({
      ...draft,
      text: draft.text.replace(uploadingImagePlaceholder, image),
    }));
  }

  function onUploadFailed() {
    setDraftState((draft: { text: string }) => ({
      ...draft,
      text: draft.text.replace(uploadingImagePlaceholder, ""),
    }));
  }

  function onUploadStarted() {
    setDraftState((draft: { text: string }) => ({
      ...draft,
      text: (draft.text += uploadingImagePlaceholder),
    }));
  }

  return (
    <Dropzone
      onUploadStarted={onUploadStarted}
      onUploadComplete={onUploadComplete}
      onUploadFailed={onUploadFailed}
    >
      <Detail.ContentContainer>
        <Detail.Header>
          <Textarea
            rows={1}
            name="title"
            ref={titleRef}
            value={draftState.title}
            onChange={handleTitleChange}
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={actionData?.errors?.title ? "title-error" : undefined}
            placeholder={"Post title"}
            className="composer text-primary block w-full resize-none border-none p-0 text-2xl font-bold focus:border-0 focus:outline-none focus:ring-0 dark:bg-black md:text-3xl"
          />
          {actionData?.errors?.title && (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.title}
            </div>
          )}
          <Textarea
            rows={20}
            maxRows={2000}
            name="body"
            ref={bodyRef}
            value={draftState.body}
            onChange={handleTextBodyChange}
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={actionData?.errors?.body ? "body-error" : undefined}
            placeholder={"Write a post..."}
            className="composer text-primary prose block w-full resize-none border-none p-0 pt-5 text-lg font-normal focus:border-0 focus:outline-none focus:ring-0 dark:bg-black"
          />
          {actionData?.errors?.body && (
            <div className="pt-1 text-red-700" id="body-error">
              {actionData.errors.body}
            </div>
          )}
        </Detail.Header>
      </Detail.ContentContainer>
    </Dropzone>
  );
}
