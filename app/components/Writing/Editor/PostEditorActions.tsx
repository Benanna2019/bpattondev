/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useTransition } from "@remix-run/react";
import { equals, includes } from "ramda";
import * as React from "react";
import { Sidebar } from "react-feather";

import Button from "../../Button";
import { LoadingSpinner } from "../../LoadingSpinner";
import { PostEditorContext } from "./PostEditor";

export function PostEditorActions() {
  const transition = useTransition();
  const location = useLocation();
  const context = React.useContext(PostEditorContext);
  const {
    draftState,
    existingPost,
    sidebarIsOpen,
    setSidebarIsOpen,
    isPreviewing,
    setIsPreviewing,
  } = context;

  const loading = transition.state === "loading";

  let isAdding =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "new_post";

  // This relies on /edit-post or /new-post actions
  const handleEditOrCreate = existingPost?.id
    ? `/writing/${existingPost.id}/edit`
    : "/new-post";
  const postButtonActions = equals("/new-post", location.pathname)
    ? "new_post"
    : includes("edit", location.pathname)
    ? "edit_post"
    : null;

  const isSavingDraft = loading;

  return (
    <div className="flex items-center space-x-2">
      <Button
        disabled={isSavingDraft}
        name="_action"
        value="/new_post"
        as="/new_post"
        type="submit"
      >
        {isSavingDraft ? (
          <LoadingSpinner />
        ) : (
          <>
            <span>{existingPost?.publishedAt ? "Update" : "Publish"}</span>
          </>
        )}
      </Button>
      <Button onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
        <Sidebar size={16} />
      </Button>
    </div>
  );
}
