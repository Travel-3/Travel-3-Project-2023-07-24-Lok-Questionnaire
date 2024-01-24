import { PropsWithChildren, useState } from "react";
import { GoDeviceMobile, GoDeviceDesktop } from "react-icons/go";
import clsx from "clsx";

export type DebugProps = PropsWithChildren;

export default function Debug({ children }: DebugProps) {
  const [mode, setMode] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="h-full flex flex-col max-h-screen overflow-hidden">
      <div className="w-full border-b p-3">
        <div className="flex justify-end">
          <div
            className="w-8 h-8 p-1.5 hover:bg-gray-100 cursor-pointer"
            onClick={() => setMode("mobile")}
          >
            <GoDeviceMobile className="w-full h-full" />
          </div>
          <div
            className="w-8 h-8 p-1.5 hover:bg-gray-100 cursor-pointer"
            onClick={() => setMode("desktop")}
          >
            <GoDeviceDesktop className="w-full h-full" />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          mode === "desktop" ? "max-w-screen" : "max-w-3xl",
          "mx-auto flex-1 overflow-y-scroll",
        )}
        style={{
          height: "calc(100vh - 57px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
