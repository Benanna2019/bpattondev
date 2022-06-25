import { Intro } from "../components/Home/Intro";
import { ListDetailView, SiteLayout } from "../components/Layouts";

export default function Index() {
  // Update so I can push main
  return (
    <SiteLayout>
      <ListDetailView list={null} hasDetail={false} detail={<Intro />} />
    </SiteLayout>
  );
}
