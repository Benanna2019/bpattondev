import React from "react";

import { Detail } from "../ListDetail/Detail";
import { TitleBar } from "../ListDetail/TitleBar";

export function LinksDetail() {
  const scrollContainerRef = React.useRef(null);
  const titleRef = React.useRef(null);

  return (
    <Detail.Container ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        title="Links"
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
      />

      <Detail.ContentContainer>
        <Detail.Header>
          <Detail.Title ref={titleRef}>Links are coming soon</Detail.Title>
          <p className="text-tertiary text-xl">
            Check back in the future to see links and things that I am keeping up with/interested
            in.
          </p>
          <p>
            For an idea of what links will be for me and on this site, check out{" "}
            <a href="https://perell.com/links/" target="_blank" rel="noopener noreferrer">
              David Perell's
            </a>{" "}
            links page.
          </p>
        </Detail.Header>
      </Detail.ContentContainer>
    </Detail.Container>
  );
}
