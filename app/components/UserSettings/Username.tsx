import { Form, useTransition } from "@remix-run/react";
import * as React from "react";
import type { User } from "~/services/models/user";

import Button from "../Button";
import { Input } from "../Input";
import { LoadingSpinner } from "../LoadingSpinner";

export function UsernameForm(props: { viewer: User }) {
  const { viewer } = props;
  const [username, setUsername] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = React.useState<boolean | null>(null);
  const transition = useTransition();

  let isAdding =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "save_username";

  // function onSubmit(e: { preventDefault: () => void }) {
  //   e.preventDefault()
  //   if (editUserResponse.loading) return
  //   if (username === viewer.username) return setIsEditing(false)
  //   if (!validUsername(username)) return setError(true)
  //   editUser()
  // }

  function handleUsernameChange(e: {
    target: { value: React.SetStateAction<string> };
  }) {
    setError(false);
    setUsername(e.target.value);
  }

  return (
    <div className="space-y-2">
      <p className="text-primary font-semibold">Username</p>

      {viewer.username || !viewer.username ? (
        <div className="text-primary flex space-x-2">
          <span>@{viewer.username}</span>
          <span>·</span>
          <button
            className="cursor-pointer font-medium text-blue-500"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      ) : null}

      {isEditing && (
        <Form className="space-y-2" action="/settings" method="post">
          <Input
            type="text"
            placeholder={"Choose a username"}
            value={username}
            autoFocus
            onChange={handleUsernameChange}
          />
          {error && (
            <p className={`text-xs text-red-500`}>
              Usernames should be between 4 and 16 characters and only have
              numbers, letters, or underscores.
            </p>
          )}
          <p className="text-quaternary text-xs">
            Updating your username will break any existing links to your
            profile, so you know, don’t do it too often.
          </p>
          <div className="flex justify-between">
            <Button type="submit" name="_action" value="save_username">
              {isAdding ? <LoadingSpinner /> : "Save username"}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
