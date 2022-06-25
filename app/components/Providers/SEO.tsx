// import { DefaultSeo } from 'next-seo'
import * as React from "react";

import { baseUrl } from "config/seo"; // defaultSEO from config.
// figure out best SEO practices with Remix

export function SEO() {
  return (
    <>
      <head>
        <link rel="icon" href="/static/favicon.ico" sizes="any" />
        <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="mask-icon" href="/static/meta/mask-icon.svg" />
        <link rel="apple-touch-icon" href="/static/meta/apple-touch-icon.png" />
        <link rel="manifest" href="/static/meta/manifest.webmanifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed"
          href={`${baseUrl}/writing/rss`}
        />
        <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="rgb(23, 23, 23)" media="(prefers-color-scheme: dark)" />
      </head>
    </>
  );
}
