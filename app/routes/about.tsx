import * as React from "react";

import { Intro } from "~/components/Home/Intro";
import { ListDetailView, SiteLayout } from "~/components/Layouts";

export default function About() {
  return (
    <SiteLayout>
      <ListDetailView list={null} hasDetail detail={<Intro />} />
    </SiteLayout>
  );
}
