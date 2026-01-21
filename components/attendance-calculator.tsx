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

export function AttendanceCalculator() {
  const [conductedClasses, setConductedClasses] = React.useState<number>(0);
  const [attendedClasses, setAttendedClasses] = React.useState<number>(0);
  const [totalClasses, setTotalClasses] = React.useState<number>(0);
  const [isPending, startTransition] = React.useTransition();
  const [showAttendanceInfo, setShowAttendanceInfo] =
    React.useState<boolean>(false);
  // const [minimumPercentage, setMinimumPercentage] = React.useState<number>(75);

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

      if (attendedClasses > conductedClasses) {
        toast.error("Classes attended cannot exceed total classes conducted.");
        return;
      }

      setTotalClasses(Math.round((attendedClasses / conductedClasses) * 100));
      setShowAttendanceInfo(true);
    });
  }

  return (
    <>
      <CardBox>
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
              <span className={getAttendanceColor(totalClasses)}>
                {totalClasses}
              </span>

              <Percent size={40} className="text-muted-foreground ml-0.5" />
            </p>
          </div>

          {totalClasses <= 75 && (
            <Link
              href={"/planner"}
              className="mt-5 hover:underline hover:text-muted-foreground underline-offset-5 duration-300"
            >
              Plan Your Attendance
            </Link>
          )}

          <p className="text-sm text-muted-foreground mt-2">
            💡 <strong>Pro tip:</strong>{" "}
            {totalClasses >= 75
              ? "You're doing great! Keep maintaining this attendance."
              : "Try to attend more classes to reach 75% for a safer margin."}
          </p>
        </CardBox>
      )}
    </>
  );
}
