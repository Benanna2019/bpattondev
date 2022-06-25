import ReactVisibilitySensor from "react-visibility-sensor";

import { LoadingSpinner } from "../LoadingSpinner";

interface IsVisible {
  setIsVisible: (arg: boolean) => void;
}

export function ListLoadMore({ setIsVisible }: IsVisible) {
  return (
    <ReactVisibilitySensor
      partialVisibility
      onChange={(visible: boolean) => setIsVisible(visible)}
    >
      <div className="flex w-full items-center justify-center p-4">
        <LoadingSpinner />
      </div>
    </ReactVisibilitySensor>
  );
}
