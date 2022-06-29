import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import customStylesUrl from "./styles/custom-styles.css";
import draculaStylesUrl from "./styles/dracula.css";
import proseStylesUrl from "./styles/prose-styles.css";
import type { User } from "./services/models/user";
import type { LoaderContext } from "./types";
import { getEnv } from "./env.server";
import type { Post } from "./services/models/post";
import { Providers } from "./components/Providers";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: customStylesUrl },
    { rel: "stylesheet", href: draculaStylesUrl },
    { rel: "stylesheet", href: proseStylesUrl },
    // NOTE: Architect deploys the public directory to /_static/
    { rel: "icon", href: "/_static/favicon.ico" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: User;
  posts: Post[] | null;
  ENV: ReturnType<typeof getEnv>;
};

export const loader: LoaderFunction = async ({ request, context }) => {
  const { SessionServer, PostServer } = context as LoaderContext;
  return json<LoaderData>({
    user: (await SessionServer.getUser(request)) as User,
    posts: (await PostServer.getPostsList()) as unknown as Post[],
    ENV: getEnv(),
  });
};

function App() {
  const data = useLoaderData() as LoaderData;
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  return (
    <Providers>
      <App />
    </Providers>
  );
}
