import * as React from "react";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

export const mono = localFont({
  src: [
    {
      path: "../fonts/mono-light.woff2",
      weight: "300",
    },
    {
      path: "../fonts/mono-regular.woff2",
      weight: "400",
    },
  ],
  variable: "--font-mono",
});

export const inter = localFont({
  src: [
    {
      path: "../fonts/inter.woff2",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export function FontWrapper({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-inter tracking-wide antialiased font-normal leading-normal ",
        inter.variable,
        mono.variable,
        className
      )}
    >
      {children}
    </div>
  );
}
