import { ListDetailView, SiteLayout } from "~/components/Layouts";
import { LinksDetail } from "~/components/Links/LinksDetail";

export default function LinksPage() {
  return (
    <SiteLayout>
      <ListDetailView list={null} hasDetail detail={<LinksDetail />} />
    </SiteLayout>
  );
}
