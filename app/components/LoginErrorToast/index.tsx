import { useLocation } from "@remix-run/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function LoginErrorToast() {
  const location = useLocation();
  // const transition = useTransition();
  const errorCode = location.key["error_code" as any];

  useEffect(() => {
    if (errorCode) {
      if (errorCode === "access_denied") {
        toast.error("Sign in failed. Try again?");
      } else {
        toast.error("Sorry, something went wrong.");
      }

      // Remove the query parameter from the visible URL.
      // router.replace(router.pathname);
    }
  }, [errorCode]);

  return null;
}
