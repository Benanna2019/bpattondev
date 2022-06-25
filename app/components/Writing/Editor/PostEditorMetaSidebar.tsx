import { Form, useLocation, useTransition } from "@remix-run/react";
import { equals, includes } from "ramda";
import * as React from "react";
import { X } from "react-feather";
import SegmentedControl from "~/components/SegmentedController";

import Button, { GhostButton, PrimaryButton } from "../../Button";
import { Input, Textarea } from "../../Input";
import { TitleBar } from "../../ListDetail/TitleBar";
import { LoadingSpinner } from "../../LoadingSpinner";
import { WritingContext } from "../PostsList";
import { PostEditorContext } from "./PostEditor";

interface ActionData {
  errors?: {
    title?: string;
    body?: string;
    slug?: string;
    excerpt?: string;
    status?: string;
  };
}

interface SidebarFormData {
  formData: {
    method: string;
    action: string;
  };
}

export function PostEditorMetaSidebar(
  { formData }: SidebarFormData,
  actionData: ActionData
) {
  const transition = useTransition();
  const location = useLocation();
  const context = React.useContext(PostEditorContext);
  const {
    draftState,
    existingPost,
    setDraftState,
    sidebarIsOpen,
    setSidebarIsOpen,
  } = context;
  const { setFilter, filter } = React.useContext(WritingContext);
  const scrollContainerRef = React.useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filterRef = React.useRef(null);

  const editingPost = location.pathname === `/writing/${existingPost?.id}/edit`;

  let isAdding =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "new_post";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postButtonActions = equals("/new-post", location.pathname)
    ? "new_post"
    : includes("edit", location.pathname)
    ? "edit_post"
    : null;

  function handleSlugChange(e: { target: { value: any } }) {
    return setDraftState((draft: any) => ({ ...draft, slug: e.target.value }));
  }

  function handleExcerptChange(e: { target: { value: any } }) {
    return setDraftState((draft: any) => ({
      ...draft,
      excerpt: e.target.value,
    }));
  }

  return (
    <>
      <nav
        ref={scrollContainerRef}
        className={`${
          sidebarIsOpen
            ? "absolute inset-y-0 right-0 translate-x-0 shadow-lg"
            : "absolute right-0 translate-x-full"
        } 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-l border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:w-56 2xl:w-72`}
      >
        <TitleBar
          scrollContainerRef={scrollContainerRef}
          leadingAccessory={null}
          trailingAccessory={
            <GhostButton size="small-square" aria-label="Close details">
              <X size={16} onClick={() => setSidebarIsOpen(false)} />
            </GhostButton>
          }
          globalMenu={false}
          title="Details"
        />
        <Form method="post" action="/new-post">
          <div className="flex-1 space-y-4 px-3 py-3">
            <div className="flex flex-col space-y-1">
              <p className="text-primary text-sm font-semibold">Slug</p>
              <Input
                name="slug"
                placeholder="Slug"
                value={draftState.slug}
                onChange={handleSlugChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <p className="text-primary text-sm font-semibold">Excerpt</p>
              <Textarea
                name="excerpt"
                value={draftState.excerpt}
                placeholder="Excerpt"
                rows={8}
                maxRows={8}
                onChange={handleExcerptChange}
              />
            </div>
            <div className="pt-2 pb-1">
              <SegmentedControl
                onSetActiveItem={setFilter}
                active={filter}
                items={[
                  { id: "published", label: "Published" },
                  { id: "draft", label: "Draft" },
                ]}
              />
            </div>
          </div>

          <div className="filter-blur sticky bottom-0 z-10 flex items-center justify-between space-x-3 border-t border-gray-150 bg-white bg-opacity-80 p-2 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-60">
            {!existingPost?.id && !existingPost?.publishedAt && (
              <PrimaryButton
                style={{ width: "100%" }}
                disabled={editingPost || isAdding}
                name="_action"
                value="new_post"
                as="new_post"
              >
                {editingPost ? <LoadingSpinner /> : "Publish"}
              </PrimaryButton>
            )}
            {existingPost?.id && existingPost?.publishedAt && (
              <Button style={{ width: "100%" }} disabled={editingPost}>
                {editingPost ? <LoadingSpinner /> : "Unpublish"}
              </Button>
            )}
          </div>
        </Form>
      </nav>

      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-5 transition duration-200 ease-in-out dark:bg-opacity-50 ${
          sidebarIsOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarIsOpen(false)}
      />
    </>
  );
}
