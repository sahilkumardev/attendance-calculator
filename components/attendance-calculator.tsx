"use client";

import * as React from "react";

import {
  Field,
  FieldSet,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { toast } from "sonner";
import { CardBox } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Percent } from "lucide-react";
import Link from "next/link";
import { getAttendanceColor } from "@/lib/get-attendance-color";
import { getAttendancePercentage } from "@/lib/get-attendance-percentage";

export function AttendanceCalculator() {
  const [conductedClasses, setConductedClasses] = React.useState<number>(0);
  const [attendedClasses, setAttendedClasses] = React.useState<number>(0);
  const [minAttendance, setMinAttendance] = React.useState<number>(75);
  const [totalClasses, setTotalClasses] = React.useState<number>(0);
  const [isPending, startTransition] = React.useTransition();
  const [showAttendanceInfo, setShowAttendanceInfo] =
    React.useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(() => {
      if (!conductedClasses || !attendedClasses) {
        toast.error(
          "Please provide both total classes conducted and classes attended.",
        );
        return;
      }

      if (conductedClasses <= 0) {
        toast.error("Total classes conducted must be greater than zero.");
        return;
      }

      if (attendedClasses < 0) {
        toast.error("Classes attended cannot be a negative value.");
        return;
      }

      if (minAttendance < 0 || minAttendance > 100) {
        toast.error("Minimum attendance must be between 0 and 100.");
        return;
      }

      if (attendedClasses > conductedClasses) {
        toast.error("Classes attended cannot exceed total classes conducted.");
        return;
      }

      setTotalClasses(
        getAttendancePercentage(conductedClasses, attendedClasses),
      );

      setShowAttendanceInfo(true);
    });
  }

  return (
    <>
      <CardBox className="relative">
        <form onSubmit={handleSubmit}>
          <FieldSet className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="total-conducted">
                Total classes conducted
                <span className="text-xs text-muted-foreground -mb-1">
                  till today
                </span>
              </FieldLabel>
              <Input
                id="total-conducted"
                type="number"
                placeholder="0"
                value={conductedClasses || ""}
                onChange={(e) => setConductedClasses(Number(e.target.value))}
                className="hide-input-number"
                required
              />
              <FieldDescription>
                Total number of classes that happened
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="attend-classes">
                Classes you attended
                <span className="text-xs text-muted-foreground -mb-1">
                  so far
                </span>
              </FieldLabel>
              <Input
                id="attend-classes"
                type="number"
                placeholder="0"
                value={attendedClasses || ""}
                onChange={(e) => setAttendedClasses(Number(e.target.value))}
                className="hide-input-number"
                required
              />
              <FieldDescription>
                How many classes you were present for
              </FieldDescription>
            </Field>

            <div className="absolute -top-5.5 flex items-center justify-center left-0 right-0 w-full">
              <h1 className="border p-2 size-10 rounded-full bg-muted">75</h1>

              <div>
                <Field>
                  <FieldLabel htmlFor="min-attendance">
                    Minimum Attendance
                    <span className="text-xs text-muted-foreground -mb-1">
                      Required %
                    </span>
                  </FieldLabel>
                  <Input
                    id="min-attendance"
                    type="number"
                    placeholder="75"
                    value={minAttendance || ""}
                    onChange={(e) => setMinAttendance(Number(e.target.value))}
                    className="hide-input-number"
                    required
                  />
                  <FieldDescription>
                    The cutoff percentage (default: 75%)
                  </FieldDescription>
                </Field>
              </div>
            </div>
          </FieldSet>

          <Button
            type="submit"
            size="lg"
            className="mt-8 w-full"
            disabled={isPending}
          >
            Calculate My Attendance <ArrowRight />
          </Button>
        </form>
      </CardBox>

      {showAttendanceInfo && (
        <CardBox className="mt-4">
          <div className="flex items-center gap-3 justify-center">
            <div>
              <p className="text-foreground/90 font-machine">
                Your current attendance
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                {attendedClasses} / {conductedClasses} classes attended
              </p>
            </div>
            <p className="text-4xl sm:text-6xl lg:text-7xl font-machine -mb-4 flex items-center justify-center select-none">
              <span className={getAttendanceColor(totalClasses, minAttendance)}>
                {totalClasses}
              </span>

              <Percent size={40} className="text-muted-foreground ml-0.5" />
            </p>
          </div>

          {totalClasses <= minAttendance && (
            <Link
              href={`/planner?conducted=${conductedClasses}&attended=${attendedClasses}&min=${minAttendance}`}
              className="mt-5 hover:underline hover:text-muted-foreground underline-offset-5 duration-300"
            >
              Plan Your Attendance
            </Link>
          )}

          <p className="text-sm text-muted-foreground mt-2">
            💡 <strong>Pro tip:</strong>{" "}
            {totalClasses >= minAttendance
              ? "You're doing great! Keep maintaining this attendance."
              : `Try to attend more classes to reach ${minAttendance}% for a safer margin.`}
          </p>
        </CardBox>
      )}
    </>
  );
}
