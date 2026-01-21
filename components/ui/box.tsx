import * as React from "react";
import { cn } from "@/lib/utils";

function CardBox({ children, className }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "border bg-card flex flex-col items-center justify-center rounded-3xl p-6 sm:p-10 shadow-md max-w-2xl min-w-full sm:min-w-2xl relative",
        className,
      )}
    >
      {children}
    </section>
  );
}

export { CardBox };
