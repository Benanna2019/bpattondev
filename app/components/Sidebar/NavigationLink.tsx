import { Link } from "@remix-run/react";
import * as React from "react";
import { classNames } from "~/utils";
import LogoutForm from "../Forms/LogoutForm";

import { GlobalNavigationContext } from "../Providers";

interface NavLink {
  link: {
    href: any;
    label: any;
    icon: any;
    trailingAccessory: any;
    trailingAction: any;
    isActive?: boolean;
    isExternal: any;
  };
}

export function NavigationLink({
  link: {
    href,
    label,
    icon: Icon,
    trailingAccessory: Accessory,
    trailingAction: Action,
    isActive,
    isExternal,
  },
}: NavLink) {
  const { setIsOpen } = React.useContext(GlobalNavigationContext);
  return (
    <li
      className="flex items-stretch space-x-1"
      onClick={() => setIsOpen(false)}
    >
      {href === "/logout" ? (
        <LogoutForm info={{ href, label, Icon, Accessory, Action, isActive }} />
      ) : !isExternal ? (
        <Link
          to={href}
          className={classNames(
            isActive
              ? " text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              : " text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200",
            "flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium"
          )}
        >
          <span className="flex w-4 items-center justify-center">
            <Icon />
          </span>
          <span className="flex-1">{label}</span>
          {Accessory && (
            <span className="flex w-4 items-center justify-center text-black text-opacity-40 dark:text-white">
              <Accessory />
            </span>
          )}
        </Link>
      ) : (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className={classNames(
            isActive
              ? " text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              : " text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200",
            "flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium"
          )}
        >
          <span className="flex w-4 items-center justify-center">
            <Icon />
          </span>
          <span className="flex-1">{label}</span>
          {Accessory && (
            <span className="flex w-4 items-center justify-center text-black text-opacity-40 dark:text-white">
              <Accessory />
            </span>
          )}
        </a>
      )}
      {Action ? <Action /> : null}
    </li>
  );
}
