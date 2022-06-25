import { Form, useTransition } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

import { DeleteButton } from "../Button";
import { DialogComponent } from "../Dialog";
import { LoadingSpinner } from "../LoadingSpinner";

export function DeleteUserDialog({ trigger }: any) {
  const transition = useTransition();
  const user = useOptionalUser();

  let isDeleting =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "delete_my_account";

  return (
    <DialogComponent
      trigger={trigger}
      title={"Delete account"}
      modalContent={() => (
        <div className="text-primary flex flex-col space-y-4 p-4 text-left">
          <p>All comments, reactions, and AMA questions will be deleted.</p>
          <Form action="/delete-account" method="post">
            <input type="hidden" name="user_email" value={user?.email} />
            <DeleteButton
              as="delete_my_account"
              value="delete_my_account"
              name="_action"
              type="submit"
            >
              {isDeleting ? <LoadingSpinner /> : "Delete my account"}
            </DeleteButton>
          </Form>
        </div>
      )}
    />
  );
}
