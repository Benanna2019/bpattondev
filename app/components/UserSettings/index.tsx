import { useTransition } from "@remix-run/react";
import * as React from "react";
import { useOptionalUser } from "~/utils";

import { Detail } from "../ListDetail/Detail";
import { TitleBar } from "../ListDetail/TitleBar";
import { EmailForm } from "./Email";
//import { EmailPreferences } from "./EmailPreferences";
import { UserSettingsFooter } from "./Footer";
import { SignedOut } from "./SignedOut";
import { UsernameForm } from "./Username";

export function UserSettings() {
  const user = useOptionalUser();
  const transition = useTransition();

  const titleRef = React.useRef(null);
  const scrollContainerRef = React.useRef(null);

  if (!user && transition.state === "loading") {
    return <Detail.Loading />;
  }

  if (!user) {
    return <SignedOut />;
  }

  return (
    <Detail.Container ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        title={"Settings"}
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
      />
      <Detail.ContentContainer>
        <Detail.Header>
          <Detail.Title ref={titleRef}>Settings</Detail.Title>
        </Detail.Header>

        <div className="divide-y divide-gray-200 py-12 dark:divide-gray-800">
          <div className="space-y-8 py-12">
            <h3 className="text-primary text-lg font-bold">Account</h3>
            <EmailForm viewer={user} />
            <UsernameForm viewer={user} />
          </div>

          {/* {user.email && (
            <div className="space-y-8 py-12">
              <h3 className="text-primary text-lg font-bold">Emails</h3>
              <EmailPreferences viewer={user} />
            </div>
          )} */}

          <UserSettingsFooter />
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  );
}
