import { ListDetailView, SiteLayout } from "../../components/Layouts";
import { UserDetail } from "../../components/UserProfile/UserDetail";

export default function UserPage() {
  return (
    <SiteLayout>
      <ListDetailView list={null} hasDetail detail={<UserDetail />} />
    </SiteLayout>
  );
}
