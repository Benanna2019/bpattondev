import * as React from "react";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { z } from "zod";

import { ConflictError } from "~/services/models/err";

import type { LoaderContext } from "~/types";
import { ListDetailView, SiteLayout } from "~/components/Layouts";
import JoinForm from "~/components/Forms/JoinForm";
import { trimEmail } from "~/utils";
import { getEnv } from "~/env.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  const { SessionServer } = context as LoaderContext;

  const userId = await SessionServer.getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

const FormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const action: ActionFunction = async ({ request, context }) => {
  const { UserServer, SessionServer } = context as LoaderContext;

  const formData = await request.formData();
  const redirectTo = formData.get("redirectTo");

  const parsed = FormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const errors = parsed.error.format();
    return json<ActionData>(
      {
        errors: {
          email: errors.email?._errors.join(". "),
          password: errors.password?._errors.join(". "),
        },
      },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const ENV = getEnv();

  const role = email === ENV.ADMIN_EMAIL ? "ADMIN" : "Guest";
  console.log("role from create user:", role);

  const isAdmin = role === "ADMIN" ? true : false;
  console.log("isAdmin from create user:", isAdmin);

  const username = trimEmail(email);
  console.log("username from create user:", username);

  try {
    const user = await UserServer.createUser(
      email,
      password,
      role,
      isAdmin,
      username
    );
    return SessionServer.createUserSession({
      request,
      userId: user.id,
      remember: false,
      redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
    });
  } catch (err) {
    if (err instanceof ConflictError) {
      return json<ActionData>(
        { errors: { email: "A user already exists with this email" } },
        { status: 400 }
      );
    }

    throw err;
  }
};

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const actionData = useActionData() as ActionData;
  return (
    <SiteLayout>
      <ListDetailView
        list={null}
        hasDetail={false}
        detail={<JoinForm {...actionData} />}
      />
    </SiteLayout>
  );
}
