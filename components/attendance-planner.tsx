"use client";

import * as React from "react";

import {
  Field,
  FieldSet,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { CardBox } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import { getAttendanceColor } from "@/lib/get-attendance-color";
import { cn } from "@/lib/utils";

export function AttendancePlanner() {
  const [upcomingClasses, setUpcomingClasses] = React.useState<number>(0);
  const [attendedUpcomingClasses, setAttendedUpcomingClasses] =
    React.useState<number>(0);

  // const [isPending, startTransition] = React.useTransition();

  const totalConducted = 100;
  const totalAttended = 75;

  const currentPercentage = Math.round((totalAttended / totalConducted) * 100);

  const futureResult = React.useMemo(() => {
    if (!upcomingClasses || !attendedUpcomingClasses) {
      return { percentage: null, error: "" };
    }

    if (upcomingClasses < 0 || attendedUpcomingClasses < 0) {
      return { percentage: null, error: "Values cannot be negative" };
    }

    if (attendedUpcomingClasses > upcomingClasses) {
      return {
        percentage: null,
        error: "You cannot attend more classes than are scheduled",
      };
    }

    const newTotal = totalConducted + upcomingClasses;
    const newAttended = totalAttended + attendedUpcomingClasses;
    const percentage = Math.round((newAttended / newTotal) * 100);

    return { percentage, error: "" };
  }, [upcomingClasses, attendedUpcomingClasses]);

  const futurePercentage = futureResult?.percentage ?? null;
  const futureError = futureResult?.error ?? "";

  return (
    <CardBox>
      <FieldSet className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="upcoming-classes">
            Upcoming classes
            <span className="text-xs text-muted-foreground -mb-1">
              till today
            </span>
          </FieldLabel>
          <Input
            id="upcoming-classes"
            type="number"
            placeholder="0"
            value={upcomingClasses || ""}
            onChange={(e) => setUpcomingClasses(Number(e.target.value))}
            className="hide-input-number"
            required
          />
          <FieldDescription>
            How many more classes will happen?
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="attended-upcoming-classes">
            Classes you attended
            <span className="text-xs text-muted-foreground -mb-1">so far</span>
          </FieldLabel>
          <Input
            id="attended-upcoming-classes"
            type="number"
            placeholder="0"
            value={attendedUpcomingClasses || ""}
            onChange={(e) => setAttendedUpcomingClasses(Number(e.target.value))}
            className="hide-input-number"
            required
          />
          <FieldDescription>How many will you be present for?</FieldDescription>
        </Field>
      </FieldSet>

      {futureError && (
        <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-destructive shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm font-medium text-destructive">
              {futureError}
            </p>
          </div>
        </div>
      )}

      {futurePercentage !== null && (
        <div className="pt-8 border-t border-(--color-border)">
          <p className="text-base text-(--color-muted-foreground) mb-3 uppercase tracking-wide">
            Your projected attendance will be
          </p>
          <div className="flex items-baseline gap-4">
            <p
              className={cn("text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight", getAttendanceColor(
                futurePercentage,
              ))}
            >
              {futurePercentage}%
            </p>
            <div className="flex flex-col gap-1">
              <span
                className={cn("text-sm font-semibold", getAttendanceColor(
                  futurePercentage,
                ))}
              >
                {futurePercentage >= currentPercentage ? "↑" : "↓"}{" "}
                {Math.abs(futurePercentage - currentPercentage)}%
                {futurePercentage >= currentPercentage
                  ? "increase"
                  : "decrease"}
              </span>
              <span className="text-xs text-(--color-muted-foreground)">
                compared to current
              </span>
            </div>
          </div>
        </div>
      )}
    </CardBox>
  );
}
