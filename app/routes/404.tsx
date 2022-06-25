import { ListDetailView, SiteLayout } from "../components/Layouts";
import { Detail } from "../components/ListDetail/Detail";

function MissingPage() {
  return <Detail.Null />;
}

export default function Home() {
  return (
    <SiteLayout>
      <ListDetailView list={null} hasDetail detail={<MissingPage />} />
    </SiteLayout>
  );
}
