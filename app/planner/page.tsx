import React from "react";
import { AttendancePlanner } from "@/components/attendance-planner";

export default function Page() {
  return (
    <>
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-3xl font-machine mb-2">
          Plan your future attendance
        </h1>
        <p className="text-muted-foreground">
          Enter how many classes are coming up and how many you plan to attend
        </p>
      </div>

      <AttendancePlanner />
    </>
  );
}
