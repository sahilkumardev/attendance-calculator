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
import { getAttendancePercentage } from "@/lib/get-attendance-percentage";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { PercentageValue } from "./ui/percentage-value";

export function AttendanceCalculator() {
  const [conductedClasses, setConductedClasses] = React.useState<number>(0);
  const [attendedClasses, setAttendedClasses] = React.useState<number>(0);
  const [requiredAttendance, setRequiredAttendance] =
    React.useState<number>(75);
  const [totalClasses, setTotalClasses] = React.useState<number>(0);
  const [showAttendanceInfo, setShowAttendanceInfo] =
    React.useState<boolean>(false);

  const [isPending, startTransition] = React.useTransition();

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

      if (attendedClasses <= 0) {
        toast.error("Classes attended cannot be a negative value.");
        return;
      }

      if (requiredAttendance < 0 || requiredAttendance > 100) {
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
      <CardBox className="mt-8">
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
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger className="border py-2 px-4 rounded-xl bg-muted flex items-center justify-center hover:cursor-pointer">
                      {requiredAttendance}
                      <Percent
                        size={18}
                        className="text-muted-foreground ml-0.5"
                      />
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{requiredAttendance}% required attendance</p>
                  </TooltipContent>
                </Tooltip>

                <DialogContent className="sm:max-w-xs sm:p-10 ">
                  <Field>
                    <DialogTitle>
                      <FieldLabel htmlFor="required-attendance">
                        Minimum Attendance
                        <span className="text-xs text-muted-foreground -mb-1">
                          Required %
                        </span>
                      </FieldLabel>
                    </DialogTitle>
                    <Input
                      id="required-attendance"
                      type="number"
                      placeholder="75"
                      value={requiredAttendance || ""}
                      onChange={(e) =>
                        setRequiredAttendance(Number(e.target.value))
                      }
                      className="hide-input-number"
                      required
                    />

                    <FieldDescription>
                      The cutoff percentage (default: 75%)
                    </FieldDescription>
                  </Field>
                </DialogContent>
              </Dialog>
            </div>
          </FieldSet>

          <Button
            type="submit"
            size="lg"
            className="mt-8 w-full py-6 rounded-full hover:cursor-pointer"
            disabled={isPending}
          >
            Calculate My Attendance <ArrowRight />
          </Button>
        </form>
      </CardBox>

      {showAttendanceInfo && (
        <CardBox className="mt-4 mb-16 sm:mb-0">
          <div className="flex items-center gap-3 justify-center">
            <div>
              <p className="text-foreground/90 font-machine text-sm">
                Your current attendance
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                {attendedClasses} / {conductedClasses} classes attended
              </p>
            </div>

            <PercentageValue
              percentage={totalClasses}
              requiredAttendance={requiredAttendance}
              total={totalClasses}
            />
          </div>

          <p className="text-sm text-muted-foreground mt-3 text-center">
            💡 <strong>Pro tip:</strong>{" "}
            {totalClasses >= requiredAttendance
              ? "You're doing great! Keep maintaining this attendance."
              : `Try to attend more classes to reach ${requiredAttendance}% for a safer margin.`}
          </p>

          <div className="absolute -bottom-5 flex items-center justify-center left-0 right-0 w-full">
            <Link
              href={`/planner?cond=${conductedClasses}&att=${attendedClasses}&req=${requiredAttendance}`}
              className="mt-5 hover:text-muted-foreground hover:bg-muted/90 underline-offset-5 duration-300 border py-2 px-4 rounded-xl bg-muted"
            >
              Plan Your Attendance
            </Link>
          </div>
        </CardBox>
      )}
    </>
  );
}
