import { Form } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

import Button, { DeleteButton } from "../Button";
import { DeleteUserDialog } from "./DeleteUserDialog";

export function UserSettingsFooter() {
  const user = useOptionalUser();

  if (user) {
    return (
      <div className="flex justify-between space-x-4 py-12">
        <Form action="/logout" method="post">
          <Button as="logout">Log out</Button>
        </Form>
        <DeleteUserDialog trigger={<DeleteButton>Delete account</DeleteButton>} />
      </div>
    );
  }
  return null;
}
