import * as React from "react";
// import type { User } from "~/services/models/user";

// interface ImageProps {
//   user: User;
//   src: string;
//   props: any;
// }

export function Avatar({ user, src, ...props }: any) {
  const fallbackUrl = "/static/img/fallback-avatar.png";
  const [srcState, setSrcState] = React.useState(src || fallbackUrl);

  // forces avatars to update if the component is in the same place between
  // page loads, e.g. changing between AMA questions, the header avatar should
  // update
  React.useEffect(() => {
    if (src) setSrcState(src);
  }, [src]);

  return (
    <img
      alt={`${user.email}'s profile`}
      src={srcState}
      {...props}
      onError={() => {
        setSrcState(fallbackUrl);
      }}
    />
  );
}
