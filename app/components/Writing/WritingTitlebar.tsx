import * as React from "react";
import { Plus, Radio } from "react-feather";
import { useOptionalUser } from "~/utils";

import Button, { GhostButton } from "../Button";
import { DialogComponent } from "../Dialog";
import { TitleBar } from "../ListDetail/TitleBar";
import SegmentedControl from "../SegmentedController";
import { WritingContext } from "./PostsList";
import { WritingSubscriptionForm } from "./SubscriptionForm";

export function WritingTitlebar({ scrollContainerRef }: any) {
  const user = useOptionalUser();
  const isAdmin = user?.role === "ADMIN";

  function getAddButton() {
    if (isAdmin) {
      return (
        <GhostButton
          href="/new-post"
          data-cy="new-post-button"
          size="small-square"
          aria-label="Add post"
        >
          <Plus size={16} />
        </GhostButton>
      );
    }
    return null;
  }

  function getSubscribeButton() {
    if (isAdmin) return null;
    return (
      <DialogComponent
        title="Newsletter"
        trigger={
          <Button data-cy="open-subscribe-hn-dialog" size="small">
            <Radio size={16} />
            <span>Subscribe</span>
          </Button>
        }
        modalContent={() => <WritingSubscriptionForm />}
      />
    );
  }

  function trailingAccessory() {
    return (
      <div className="flex space-x-2">
        {getSubscribeButton()}
        {getAddButton()}
      </div>
    );
  }

  function getChildren() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { setFilter, filter } = React.useContext(WritingContext);
    if (isAdmin) {
      return (
        <div className="pt-2 pb-1">
          <SegmentedControl
            onSetActiveItem={setFilter}
            active={filter}
            items={[
              { id: "published", label: "Published" },
              { id: "draft", label: "Drafts" },
            ]}
          />
        </div>
      );
    }
    return null;
  }

  return (
    <TitleBar
      trailingAccessory={trailingAccessory()}
      title="Writing"
      scrollContainerRef={scrollContainerRef}
    >
      {getChildren()}
    </TitleBar>
  );
}
