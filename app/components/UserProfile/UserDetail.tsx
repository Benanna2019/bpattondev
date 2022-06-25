import React from "react";
import { useOptionalUser } from "~/utils";

import { Detail } from "../ListDetail/Detail";
import { TitleBar } from "../ListDetail/TitleBar";

export function UserDetail() {
  const scrollContainerRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const user = useOptionalUser();

  if (user) {
    return (
      <Detail.Container ref={scrollContainerRef}>
        <TitleBar
          magicTitle
          title={user.name || user.email}
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />

        <Detail.ContentContainer>
          <Detail.Header>
            <Detail.Title ref={titleRef}>Profiles are coming soon</Detail.Title>
            <p className="text-tertiary text-xl">
              Check back in the future to see questions, comments, and more...
            </p>
          </Detail.Header>
        </Detail.ContentContainer>
      </Detail.Container>
    );
  }

  return null;
}
