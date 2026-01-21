"use client";

import * as React from "react";

export function AttendancePlanner() {
  const [futureClasses, setFutureClasses] = React.useState("");
  const [futureAttended, setFutureAttended] = React.useState("");
  const totalConducted = 100;
  const totalAttended = 75;

  const currentPercentage = Math.round((totalAttended / totalConducted) * 100);

  // const futurePercentage = futureResult?.percentage ?? null;
  // const futureError = futureResult?.error ?? "";

  return (
    <div className="border border-(--color-border) rounded-lg p-6 sm:p-10 bg-(--color-card)">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <span className="text-sm font-bold text-primary">2</span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-(--color-foreground)">
            Plan your future attendance
          </h2>
        </div>
        <p className="text-sm sm:text-base text-(--color-muted-foreground) leading-relaxed ml-0 sm:ml-10">
          Enter how many classes are coming up and how many you plan to attend
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-3">
          <label
            htmlFor="futureClasses"
            className="text-base font-medium text-(--color-foreground)"
          >
            Upcoming classes
          </label>
          <input
            type="number"
            id="futureClasses"
            value={futureClasses}
            onChange={(e) => setFutureClasses(e.target.value)}
            min="0"
            className="h-12 sm:h-14 w-full rounded border-2 border-(--color-border) bg-(--color-input) px-4 sm:px-5 text-base sm:text-lg text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors"
          />
          <p className="text-xs text-(--color-muted-foreground) mt-1">
            How many more classes will happen?
          </p>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="futureAttended"
            className="text-base font-medium text-(--color-foreground)"
          >
            You&apos;ll attend
          </label>
          <input
            type="number"
            id="futureAttended"
            value={futureAttended}
            onChange={(e) => setFutureAttended(e.target.value)}
            min="0"
            className="h-12 sm:h-14 w-full rounded border-2 border-(--color-border) bg-(--color-input) px-4 sm:px-5 text-base sm:text-lg text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors"
          />
          <p className="text-xs text-(--color-muted-foreground) mt-1">
            How many will you be present for?
          </p>
        </div>
      </div>

      {/* {futureError && (
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
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight ${getAttendanceColor(
                futurePercentage,
              )}`}
            >
              {futurePercentage}%
            </p>
            <div className="flex flex-col gap-1">
              <span
                className={`text-sm font-semibold ${getAttendanceColor(
                  futurePercentage,
                )}`}
              >
                {futurePercentage >= currentPercentage ? "↑" : "↓"}{" "}
                {Math.abs(futurePercentage - currentPercentage)}%{" "}
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
      )} */}
    </div>
  );
}
