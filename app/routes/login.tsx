import * as React from "react";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import z from "zod";

import { NotFoundError, UnauthorizedError } from "~/services/models/err";
import type { LoaderContext } from "~/types";
import { ListDetailView, SiteLayout } from "~/components/Layouts";
import { SignInDialogContent } from "~/components/SignInDialog/SignInDialogContent";

export const loader: LoaderFunction = async ({ request, context }) => {
  const { SessionServer } = context as LoaderContext;

  const userId = await SessionServer.getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

const FormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request, context }) => {
  const { UserServer, SessionServer } = context as LoaderContext;

  const formData = await request.formData();
  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember");

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

  try {
    const user = await UserServer.verifyLogin(email, password);
    return SessionServer.createUserSession({
      request,
      userId: user.id,
      remember: remember === "on" ? true : false,
      redirectTo: typeof redirectTo === "string" ? redirectTo : "/notes",
    });
  } catch (err) {
    if (err instanceof UnauthorizedError || err instanceof NotFoundError) {
      return json<ActionData>(
        { errors: { email: "Invalid email or password" } },
        { status: 400 }
      );
    }

    throw err;
  }
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const actionData = useActionData() as ActionData;
  return (
    <SiteLayout>
      <ListDetailView
        list={null}
        hasDetail={false}
        detail={<SignInDialogContent {...actionData} />}
      />
    </SiteLayout>
  );
}
