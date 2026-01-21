"use client";

import * as React from "react";

import {
  Field,
  FieldSet,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { CardBox } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import { getAttendanceColor } from "@/lib/get-attendance-color";
import { getAttendancePercentage } from "@/lib/get-attendance-percentage";
import { ArrowDown, ArrowUp, Percent } from "lucide-react";

interface AttendancePlannerProps {
  conductedClasses: number;
  attendedClasses: number;
  minAttendance?: number;
}

export function AttendancePlanner({
  conductedClasses,
  attendedClasses,
  minAttendance = 75,
}: AttendancePlannerProps) {
  const [upcomingClasses, setUpcomingClasses] = React.useState<number>(0);
  const [attendedUpcomingClasses, setAttendedUpcomingClasses] =
    React.useState<number>(0);

  const currentPercentage = getAttendancePercentage(
    conductedClasses,
    attendedClasses,
  );

  const result = React.useMemo(() => {
    if (upcomingClasses < 0 || attendedUpcomingClasses < 0) {
      return {
        percentage: null,
        validation: "Class numbers cannot be negative",
      };
    }

    if (attendedUpcomingClasses > upcomingClasses) {
      return {
        percentage: null,
        validation: "You cannot attend more classes than are scheduled",
      };
    }

    const renewClasses = conductedClasses + upcomingClasses;
    const renewAttendedClasses = attendedClasses + attendedUpcomingClasses;
    const renewPercentage = getAttendancePercentage(
      renewClasses,
      renewAttendedClasses,
    );

    return { percentage: renewPercentage, validation: null };
  }, [
    attendedUpcomingClasses,
    conductedClasses,
    upcomingClasses,
    attendedClasses,
  ]);

  return (
    <CardBox className="mb-10 sm:mb-0">
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

      <section>
        <div
          className={cn(
            "h-px w-full bg-size-[var(--height)_var(--width)] dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
            "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mt-4 mb-6",
          )}
          style={
            {
              "--height": "5px",
              "--width": "1px",
              "--background": "#ffffff",
              "--fade-stop": "90%",
              "--color-dark": "rgba(255, 255, 255, 0.2)",
              WebkitMaskComposite: "exclude",
              maskComposite: "exclude",
            } as React.CSSProperties
          }
        />

        {result.validation && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2">
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
              {result.validation}
            </p>
          </div>
        )}

        {result.percentage && (
          <div>
            <p className="text-muted-foreground font-machine text-center">
              Your future attendance will be
            </p>

            <div className="flex items-center gap-3 justify-center mt-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-machine -mb-4 flex items-center justify-center select-none">
                <span
                  className={getAttendanceColor(
                    result.percentage,
                    minAttendance,
                  )}
                >
                  {result.percentage}
                </span>

                <Percent size={40} className="text-muted-foreground ml-0.5" />
              </h1>
              <div className="flex flex-col items-center justify-center px-2 sm:px-4">
                <div
                  className={cn(
                    "text-lg sm:text-base font-bold flex items-center gap-1",
                    getAttendanceColor(result.percentage, minAttendance),
                  )}
                >
                  {result.percentage >= currentPercentage ? (
                    <ArrowUp size={18} />
                  ) : (
                    <ArrowDown size={18} />
                  )}
                  <span>
                    {Math.abs(result.percentage - currentPercentage)}%
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    getAttendanceColor(result.percentage, minAttendance),
                  )}
                >
                  {result.percentage >= currentPercentage
                    ? "Increase"
                    : "Decrease"}
                </span>
                <span className="text-muted-foreground font-machine tracking-wide mt-0.5">
                  from current
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-machine -mb-4 flex items-center justify-center select-none">
                <span
                  className={getAttendanceColor(
                    currentPercentage,
                    minAttendance,
                  )}
                >
                  {currentPercentage}
                </span>

                <Percent size={40} className="text-muted-foreground ml-0.5" />
              </h1>
            </div>
          </div>
        )}
      </section>
    </CardBox>
  );
}
