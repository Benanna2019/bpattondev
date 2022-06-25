import { Link } from "@remix-run/react";
import * as React from "react";
import { Settings } from "react-feather";
import { useTransition } from "@remix-run/react";
import { GhostButton } from "../Button";
import { LoadingSpinner } from "../LoadingSpinner";
import { GlobalNavigationContext } from "../Providers";
import { classNames, trimEmail, useOptionalUser } from "~/utils";

function Container(
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      data-cy="sign-in-button"
      className="filter-blur sticky bottom-0 z-10 flex items-center justify-between space-x-3 border-t border-gray-150 bg-white bg-opacity-80 p-2 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-60"
      {...props}
    />
  );
}

export function UserFooter() {
  // this is where I would set the user, but I think I can just pass the user to the Footer
  const { setIsOpen } = React.useContext(GlobalNavigationContext);
  const transition = useTransition();
  const user = useOptionalUser();

  function signInButton() {
    return (
      <GhostButton as={"login"} style={{ width: "100%" }}>
        <Link to="/login">Sign In</Link>
      </GhostButton>
    );
  }

  if (transition.state === "loading") {
    return (
      <Container>
        <div className="flex w-full items-center justify-center py-1">
          <LoadingSpinner />
        </div>
      </Container>
    );
  }

  if (!user) {
    return <Container>{signInButton()}</Container>;
  }

  if (user) {
    return (
      <Container>
        <Link
          to={`/u/${user.username}`}
          onClick={() => setIsOpen(false)}
          className={classNames(
            user
              ? " text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              : " text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200",
            "flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium"
          )}
        >
          👋, {trimEmail(user.email)}
        </Link>
        <GhostButton
          aria-label="Manage settings"
          onClick={() => setIsOpen(false)}
          size="small-square"
          href="/settings"
        >
          <Settings size={16} />
        </GhostButton>
      </Container>
    );
  }

  return <Container>{signInButton()}</Container>;
}
