import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { User } from "~/services/models/user";
import type { Post } from "./services/models/post";

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

function isPosts(posts: any): posts is Post[] {
  return posts && typeof posts === "object";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function usePostMatchesData(): Post[] | undefined {
  const data = useMatchesData("root");
  if (!data || !isPosts(data.posts)) {
    return undefined;
  }
  return data.posts;
}

export function usePosts(): Post[] {
  const maybePosts = usePostMatchesData();
  if (!maybePosts) {
    throw new Error(
      "No posts found in root loader, but posts are required. This should never happen but if it does, try usePostMatchesData instead"
    );
  }
  return maybePosts;
}

export function trimEmail(email: string) {
  return email.substring(0, email.indexOf("@"));
}

export function trimBodyToExcerpt(body: string) {
  return body.substring(0, 40);
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function slugifyPostTitle(title: string) {
  const str = title.replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  return str;
}
