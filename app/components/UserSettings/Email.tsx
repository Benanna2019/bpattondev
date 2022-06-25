import { Form, useTransition } from "@remix-run/react";
import * as React from "react";
import type { User } from "~/services/models/user";

// import { WarnAlert } from "../Alert";
import Button from "../Button";
import { Input } from "../Input";
import { LoadingSpinner } from "../LoadingSpinner";

export function EmailForm(props: { viewer: User }) {
  const { viewer } = props;
  const isNew = !viewer.email;

  const [isEditing, setIsEditing] = React.useState(isNew);
  const [email, setEmail] = React.useState("");
  const transition = useTransition();

  let isSettingEmail =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "set_email";

  function handleEmailChange(e: { target: { value: string } }) {
    setEmail(e.target.value.trim());
  }

  return (
    <div className="space-y-2">
      <p className="text-primary font-semibold">Email</p>

      {viewer.email && (
        <div className="text-primary flex space-x-2">
          <span>{viewer.email}</span>
          <span>·</span>
          <button
            className="cursor-pointer font-medium text-blue-500"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      )}

      {(isNew || isEditing) && (
        <Form method="post" className="space-y-2" noValidate>
          {isNew && (
            <p className="text-quaternary text-sm">
              Adding your email will allow you to turn on replies for comments
              or AMA questions.
            </p>
          )}
          <Input
            type="email"
            placeholder={
              isNew ? "Add your email address" : "Update your email address"
            }
            value={email}
            autoFocus
            onChange={handleEmailChange}
          />
          <div className="flex justify-between">
            <Button type="submit" value="set_email" name="_action">
              {isSettingEmail ? <LoadingSpinner /> : "Save email"}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
