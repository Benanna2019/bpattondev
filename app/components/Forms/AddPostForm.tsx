import { Form } from "@remix-run/react";

export default function AddPostForm({ children }: any) {
  return (
    <Form method="post" action="/new-post">
      {children}
    </Form>
  );
}
