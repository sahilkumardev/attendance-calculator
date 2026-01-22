import * as React from "react";
import { AttendancePlanner } from "@/components/attendance-planner";

export default function Page() {
  return (
    <React.Suspense fallback={<div>Loading planner...</div>}>
      <div className="text-center mb-8 max-w-xl pt-20 sm:pt-0">
        <h1 className="text-3xl font-machine mb-2">
          Plan your future attendance
        </h1>
        <p className="text-muted-foreground">
          Enter how many classes are coming up and how many you plan to attend
        </p>
      </div>
      <AttendancePlanner />
    </React.Suspense>
  );
}
