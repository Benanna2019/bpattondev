import { useLocation } from "@remix-run/react";
import { Settings } from "react-feather";
import { useOptionalUser } from "~/utils";

import {
  ExternalLinkIcon,
  GitHubIcon,
  HomeIcon,
  WritingIcon,
  YouTubeIcon,
  SignOutIcon,
  LinkedInIcon,
  LinksIcon,
  AppDissectionIcon,
} from "../Icon";
import { NavigationLink } from "./NavigationLink";
import { SignOutAction } from "./SignOutAction";

export function SidebarNavigation() {
  const location = useLocation();
  const user = useOptionalUser();
  const sections = [
    {
      label: null,
      items: [
        {
          href: "/",
          label: "Home",
          icon: HomeIcon,
          trailingAccessory: null,
          isActive: location.pathname === "/",
          trailingAction: null,
          isExternal: false,
        },

        {
          href: "/writing",
          label: "Writing",
          icon: WritingIcon,
          trailingAccessory: null,
          isActive: location.pathname === "/writing",
          trailingAction: null,
          isExternal: false,
        },

        {
          href: "/links",
          label: "Links",
          icon: LinksIcon,
          trailingAccessory: null,
          isActive: location.pathname === "/links",
          trailingAction: null,
          isExternal: false,
        },
      ],
    },
    {
      label: "Projects",
      items: [
        {
          href: "https://careerchangers.co",
          label: "Career Changers",
          icon: AppDissectionIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },

        // {
        //   href: "https://dunedain.dev",
        //   label: "Web Dev Course",
        //   icon: WebDevCourseIcon,
        //   trailingAccessory: ExternalLinkIcon,
        //   isActive: false,
        //   trailingAction: null,
        //   isExternal: true,
        // },

        // {
        //   href: "https://forwhomthebilltolls.com",
        //   label: "Invoice Manager",
        //   icon: WritingIcon,
        //   trailingAccessory: ExternalLinkIcon,
        //   isActive: false,
        //   trailingAction: null,
        //   isExternal: true,
        // },
      ],
    },
    {
      label: "Online",
      items: [
        {
          href: "https://www.linkedin.com/in/benjaminapatton/",
          label: "LinkedIn",
          icon: LinkedInIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },

        {
          href: "https://www.youtube.com/channel/UC-esBYEUGQ6iK1wmw76f5MA",
          label: "YouTube",
          icon: YouTubeIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },

        {
          href: "https://github.com/Benanna2019",
          label: "GitHub",
          icon: GitHubIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },
      ],
    },
    {
      label: "You",
      items: [
        {
          href: "/logout",
          label: "Logout",
          icon: SignOutIcon,
          trailingAccessory: null,
          trailingAction: user ? SignOutAction : null,
          isExternal: false,
        },

        {
          href: "/settings",
          label: "Settings",
          icon: Settings,
          trailingAccessory: null,
          isActive: location.pathname === "/settings",
          trailingAction: null,
          isExternal: false,
        },
      ],
    },
  ];

  return (
    <div className="flex-1 space-y-1 px-3 py-3">
      {sections.map((section, i) => {
        return (
          <ul key={i} className="space-y-1">
            {section.label && (
              <h4
                key={i}
                className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white"
              >
                {section.label}
              </h4>
            )}
            {section.items.map((item, j) => (
              <NavigationLink key={j} link={item} />
            ))}
          </ul>
        );
      })}
    </div>
  );
}
