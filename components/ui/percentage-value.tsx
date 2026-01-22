import * as React from "react";
import { cn } from "@/lib/utils";
import { Percent } from "lucide-react";
import { getAttendanceColor } from "@/lib/get-attendance-color";

export function PercentageValue({
  requiredAttendance,
  percentage,
  className,
  total,
}: {
  percentage: number;
  requiredAttendance: number;
  total: number;
} & React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-6xl lg:text-7xl font-machine sm:-mb-2 -mb-1 flex items-center justify-center select-none",
        className,
      )}
    >
      <span className={getAttendanceColor(percentage, requiredAttendance)}>
        {total}
      </span>

      <Percent size={40} className="text-muted-foreground ml-0.5" />
    </h1>
  );
}
