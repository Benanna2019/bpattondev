import * as React from "react";
import AddPostForm from "~/components/Forms/AddPostForm";
import type { Post } from "~/services/models/post";

import { Detail } from "../../ListDetail/Detail";
import { TitleBar } from "../../ListDetail/TitleBar";
import { PostEditorActions } from "./PostEditorActions";
import { PostEditorComposer } from "./PostEditorComposer";
import { PostEditorMetaSidebar } from "./PostEditorMetaSidebar";
import { PostEditorPreview } from "./PostEditorPreview";
import { PreviewSwitch } from "./PreviewSwitch";
// import { getPostBySlug } from "~/services/post.server";

interface PostEditorData {
  data: {
    post: Post;
  } | null;
}

interface PostEditorActionData {
  errors?: {
    title?: string;
    body?: string;
    slug?: string;
    excerpt?: string;
    status?: string;
  };
}

interface PostEditorContextState {
  draftState: {
    title: string;
    body: string;
    slug: string;
    excerpt: string;
  };
  setDraftState: (draftobj: any) => void;
  existingPost?: Post | null;
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (isOpen: boolean) => void;
  isPreviewing: boolean;
  setIsPreviewing: (isPreviewing: boolean) => void;
}

export const PostEditorContext = React.createContext<PostEditorContextState>({
  draftState: {
    title: "",
    body: "",
    slug: "",
    excerpt: "",
  },
  setDraftState: (draftObj: unknown) => {},
  existingPost: null,
  sidebarIsOpen: false,
  setSidebarIsOpen: (isOpen: boolean) => {},
  isPreviewing: false,
  setIsPreviewing: (isPreviewing: boolean) => {},
});

export function PostEditor({ data }: PostEditorData, actionData: PostEditorActionData) {
  const scrollContainerRef = React.useRef(null);

  const editOrCreatPost = data === null ? "Add Post" : "Edit Post";
  const formData = {
    method: "post",
    action: "/new-post",
  };

  const defaultDraftState = {
    title: data?.post?.title || "",
    body: data?.post?.body || "",
    slug: data?.post?.slug || "",
    excerpt: data?.post?.excerpt || "",
  };

  const [draftState, setDraftState] = React.useState<any>(defaultDraftState);
  const [isPreviewing, setIsPreviewing] = React.useState(false);

  const existingPost = data?.post;
  const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);

  React.useEffect(() => {
    // if navigating between drafts, reset the state each time with the correct
    // post data
    setDraftState(defaultDraftState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.post.slug]);

  const defaultContextValue = {
    existingPost,
    draftState,
    setDraftState,
    sidebarIsOpen,
    setSidebarIsOpen,
    isPreviewing,
    setIsPreviewing,
  };

  return (
    <PostEditorContext.Provider value={defaultContextValue}>
      <Detail.Container ref={scrollContainerRef}>
        <AddPostForm>
          <TitleBar
            backButton
            globalMenu={false}
            backButtonHref={"/writing"}
            scrollContainerRef={scrollContainerRef}
            title=""
            trailingAccessory={<PostEditorActions />}
            leadingAccessory={<PreviewSwitch />}
          />

          {isPreviewing ? (
            <PostEditorPreview />
          ) : (
            <PostEditorComposer data={editOrCreatPost} {...actionData} />
          )}
        </AddPostForm>
      </Detail.Container>
      <PostEditorMetaSidebar formData={formData} {...actionData} />
    </PostEditorContext.Provider>
  );
}
