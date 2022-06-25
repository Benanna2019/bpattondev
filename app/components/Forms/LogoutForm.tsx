import { Form } from "@remix-run/react";
import { classNames } from "~/utils";

interface LogoutType {
  info: {
    href: any;
    label: any;
    Icon: any;
    Accessory: any;
    Action: any;
    isActive?: boolean;
  };
}

export default function LogoutForm({
  info: { href, label, Icon, Accessory, Action, isActive },
}: LogoutType) {
  return (
    <Form
      action={href}
      method="post"
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
      <span className="flex-1 cursor-pointer">
        <button type="submit">{label}</button>
      </span>

      {Accessory && (
        <span className="flex w-4 items-center justify-center text-black text-opacity-40 dark:text-white">
          <Accessory />
        </span>
      )}
    </Form>
  );
}
