"use client";

import { AttendancePlanner } from "@/components/attendance-planner";
import { redirect, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const conductedClasses = Number(searchParams.get("conducted"));
  const attendedClasses = Number(searchParams.get("attended"));
  const minAttendance = Number(searchParams.get("min")) || 75;

  if (!conductedClasses || !attendedClasses) {
    redirect("/");
  }

  return (
    <>
      <div className="text-center mb-8 max-w-xl pt-20 sm:pt-0">
        <h1 className="text-3xl font-machine mb-2">
          Plan your future attendance
        </h1>
        <p className="text-muted-foreground">
          Enter how many classes are coming up and how many you plan to attend
        </p>
      </div>

      <AttendancePlanner
        conductedClasses={conductedClasses}
        attendedClasses={attendedClasses}
        minAttendance={minAttendance}
      />
    </>
  );
}
