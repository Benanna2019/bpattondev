import type { MetaFunction } from "@remix-run/server-runtime";
import { ListDetailView, SiteLayout } from "../components/Layouts";
import { UserSettings } from "../components/UserSettings";
import routes from "../../config/routes";
import { Meta } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: routes.settings.seo.title,
  description: routes.settings.seo.description,
});

export default function Settings() {
  return (
    <>
      <head>
        <Meta />
      </head>
      <SiteLayout>
        <ListDetailView list={null} hasDetail detail={<UserSettings />} />
      </SiteLayout>
    </>
  );
}
