import * as React from "react";

export function MaxWidthWrapper({ children }: React.ComponentProps<"main">) {
  return (
    <main className="mx-auto relative max-h-dvh lg:max-h-screen lg:min-h-screen overflow-hidden">
      {children}
    </main>
  );
}
