import { Link } from "@remix-run/react";
import * as React from "react";
import { MapPin } from "react-feather";
import CharlestonPinMap from "../../../public/pin_map_charleston.png";

import { Detail } from "../ListDetail/Detail";
import { TitleBar } from "../ListDetail/TitleBar";

function SectionTitle(props: any) {
  return (
    <h4
      className="col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 md:text-right md:text-base md:font-normal md:text-opacity-40"
      {...props}
    />
  );
}

function SectionContent(props: any) {
  return <div className="col-span-10" {...props} />;
}

interface TableRowProps {
  href: string;
  title: string;
  date: string;
  subtitle?: string;
}

function TableRow({ href, title, subtitle, date }: TableRowProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="group flex items-center space-x-4"
    >
      <strong className="flex-none font-medium text-gray-1000 group-hover:text-blue-600 group-hover:underline dark:text-gray-100 dark:group-hover:text-blue-500">
        {title}
      </strong>
      <span className="w-full shrink border-t border-dashed border-gray-300 dark:border-gray-800" />
      {subtitle && <span className="text-tertiary flex-none">{subtitle}</span>}
      {date && (
        <span className="text-quaternary flex-none font-mono">{date}</span>
      )}
    </a>
  );
}

function SectionContainer(props: any) {
  return (
    <div
      className="grid grid-cols-1 items-start gap-6 md:grid-cols-12"
      {...props}
    />
  );
}

const workHistory = [
  {
    href: "https://comparecredit.com",
    title: "CompareCredit",
    subtitle: "Associate Software Engineer",
    date: "2022—\u00a0\u00a0",
  },
  {
    href: "https://careerchangers.co",
    title: "Career Changer Newsletter",
    subtitle: "Owner",
    date: "2020—\u00a0\u00a0",
  },
  {
    href: "https://tiag.net/",
    title: "TIAG",
    subtitle: "Junior Software Developer",
    date: "2021—22",
  },
];

const speakingData = [
  {
    href: "",
    title: "Check back later...",
    date: "tbd",
  },
];

export function Intro() {
  const scrollContainerRef = React.useRef(null);
  const titleRef = React.useRef(null);

  return (
    <Detail.Container data-cy="home-intro" ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
        title="Home"
      />

      {/* Keep this div to trigger the magic scroll */}
      <div className="p-4" ref={titleRef} />

      <Detail.ContentContainer>
        <div className="space-y-8 pb-24 md:space-y-16">
          <SectionContainer>
            <SectionTitle />
            <SectionContent>
              <div className="text-primary prose">
                <p>
                  Hey, I&apos;m Ben. I&apos;m a developer and{" "}
                  <Link to="/writing">
                    <span>writer</span>
                  </Link>
                  . I&apos;m currently writing a{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://careerchangers.co"
                  >
                    newsletter for career changers{" "}
                  </a>
                  becoming software developers to help them jobs quicker.
                </p>
                <p>
                  I currently for,{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://comparecredit.com"
                  >
                    CompareCredit
                  </a>
                  , on an awesome dev team. I get to work alongside developers
                  who went to the code school I went to in Charleston, SC called
                  Jack Russell Coding School.
                </p>
                <p>
                  Before becoming a software developer I worked in non-profit. I
                  made a living off of fundraising and was able to work with
                  people in all stages of life. The last year and a half of
                  non-profit work was spent working with Senior Adults. My
                  non-profit days are the catalyst for much of my thinking and
                  how I hope to impact the world through software.
                </p>
                <p>
                  Recently I have made the decision to be much more active on
                  LinkedIn. I spent a lot of time on twitter and one day was
                  really discouraged with the people who, in my estimation,
                  should be helping one another, serving others, and putting
                  good into the world, where devouring one another.
                </p>
                <p>
                  So it occurred to me that 1. I don't have to be on this
                  platform and 2. I can put good into the world. LinkedIn is not
                  everyone's favorite but I find it to be less hostile than
                  twitter. I share thoughts daily on for career changers,
                  product builders, and personal branding.
                </p>
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Online</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                <TableRow
                  href={"https://www.linkedin.com/in/benjaminapatton/"}
                  title={"LinkedIn"}
                  subtitle={"Follow"}
                  date={""}
                />
                <TableRow
                  href={
                    "https://www.youtube.com/channel/UCdznsnxpwF9qQCqfOomUqXg"
                  }
                  title={"YouTube"}
                  subtitle={"Subscribe"}
                  date={""}
                />
                <TableRow
                  href={"https://github.com/Benanna2019"}
                  title={"GitHub"}
                  subtitle={"Follow"}
                  date={""}
                />
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Where</SectionTitle>
            <SectionContent>
              <img
                src={CharlestonPinMap}
                className="h-full w-full object-cover object-center"
                alt="Map of Charleston SC Tri-country area"
              />
              <p className="text-quaternary flex items-center justify-end space-x-2 pt-2 text-sm md:text-right">
                <MapPin size={12} />
                <span>Charleston, SC</span>
              </p>
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Work</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                {workHistory.map((job) => (
                  <TableRow
                    href={job.href}
                    title={job.title}
                    subtitle={job.subtitle}
                    date={job.date}
                    key={job.href}
                  />
                ))}
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Speaking</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                {speakingData
                  ? speakingData.map((s) => (
                      <TableRow
                        href={s.href}
                        title={s.title}
                        date={s.date}
                        key={s.href}
                      />
                    ))
                  : null}
              </div>
            </SectionContent>
          </SectionContainer>
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  );
}
