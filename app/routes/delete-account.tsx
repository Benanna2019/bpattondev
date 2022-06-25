import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import type { LoaderContext } from "~/types";

export const action: ActionFunction = async ({ request, context }) => {
  const { SessionServer, UserServer } = context as LoaderContext;

  const user = await SessionServer.getUser(request);
  console.log("user data from delete-account route:", user);

  return await UserServer.deleteUser(user?.email as string);
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};
