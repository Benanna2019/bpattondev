import * as React from "react";
import type { Post } from "~/services/models/post";
import { usePostMatchesData } from "~/utils";

import { ListContainer } from "../ListDetail/ListContainer";
import { LoadingSpinner } from "../LoadingSpinner";
import { PostListItem } from "./PostListItem";
import { WritingTitlebar } from "./WritingTitlebar";

export const WritingContext = React.createContext({
  filter: "published",
  setFilter: (filter: string) => {},
});

export function PostsList() {
  const data = usePostMatchesData();
  const [filter, setFilter] = React.useState("published");
  let [scrollContainerRef, setScrollContainerRef] = React.useState(null);
  let slug: any;

  if (!data) {
    return (
      <ListContainer onRef={setScrollContainerRef}>
        <WritingTitlebar scrollContainerRef={scrollContainerRef} />
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      </ListContainer>
    );
  }

  const defaultContextValue = {
    filter,
    setFilter,
  };

  return (
    <WritingContext.Provider value={defaultContextValue}>
      <ListContainer data-cy="posts-list" onRef={setScrollContainerRef}>
        <WritingTitlebar scrollContainerRef={scrollContainerRef} />

        <div className="lg:space-y-1 lg:p-3">
          {data.map((post: Post) => {
            const active = slug === post.slug; // use url query params or params?.slug

            return <PostListItem key={post.id} post={post} active={active} />;
          })}
        </div>
      </ListContainer>
    </WritingContext.Provider>
  );
}
