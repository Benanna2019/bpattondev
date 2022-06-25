import { ListDetailView, SiteLayout } from "~/components/Layouts";
import { PostsList } from "~/components/Writing/PostsList";

export default function WritingIndexPage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <SiteLayout>
        <ListDetailView hasDetail={false} detail={null} list={<PostsList />} />
      </SiteLayout>
    </div>
  );
}

// Since <PostsList /> will always have the same data, we can load posts in the root and pass it in
// the useMatches, the same way we do it with the useUser() and useOptionalUser()
