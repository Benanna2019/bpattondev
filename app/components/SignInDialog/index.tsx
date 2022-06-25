import { DialogComponent } from "../Dialog";
import { SignInDialogContent } from "./SignInDialogContent";

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

interface SignInDialogProps {
  children?: any;
  trigger: any;
  actionData?: ActionData;
}

export function SignInDialog({
  children = null,
  trigger = null,
  actionData,
}: SignInDialogProps) {
  return (
    <DialogComponent
      trigger={trigger}
      title={"Sign In"}
      modalContent={() => <SignInDialogContent {...actionData} />}
    >
      {children ? ({ openModal }: any) => children({ openModal }) : null}
    </DialogComponent>
  );
}
