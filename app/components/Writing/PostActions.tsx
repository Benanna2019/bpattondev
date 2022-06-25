/* eslint-disable react-hooks/rules-of-hooks */
import { useTransition } from "@remix-run/react";
import * as React from "react";
import type { Post } from "~/services/models/post";
import { useOptionalUser } from "~/utils";

import Button from "../Button";
import { ReactionButton } from "../Button/ReactionButton";

function getReactionButton(post: Post) {
  const transition = useTransition();
  const loading = transition.state === "loading";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clicked, setClicked] = React.useState(false);

  function handleClick() {
    if (loading) return;

    // This is where I need to increase post to reaction count by 1
    // Then, if clicked, disable button
    // Also add like to viewer and changed viewerHasReacted to true
    setClicked(true);
  }

  // Need to add a reaction model
  // On the reaction model have a postid and userid
  // If user.id = reaction.userid then viewerHasReacted === true
  return (
    <ReactionButton
      id={post.id}
      loading={loading}
      count={1} // This would be post.reactionCount
      hasReacted={true} // This would be viewerHasReacted value
      onClick={handleClick}
    />
  );
}

function getEditButton(post: any) {
  const user = useOptionalUser();

  if (!user?.isAdmin) return null;

  return (
    <Button href={`/writing/${post.slug}/edit`} as="/writing/[slug]/edit">
      Edit
    </Button>
  );
}

export function PostActions(post: Post) {
  return (
    <div className="flex items-center space-x-2">
      {getReactionButton(post)}
      {getEditButton(post)}
    </div>
  );
}
