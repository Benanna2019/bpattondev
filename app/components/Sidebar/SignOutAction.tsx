import { Form } from "@remix-run/react";

export function SignOutAction({ children }: any) {
  return (
    <Form action="/logout" method="post">
      <button
        type="submit"
        className="hidden rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
      >
        Logout
      </button>
    </Form>
  );
}
