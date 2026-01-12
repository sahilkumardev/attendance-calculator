import * as React from "react";
import { CardBox } from "./ui/box";
import { Button } from "./ui/button";

interface AttendanceCalculatorFormProps {
  onCalculate: (totalConducted: number, totalAttended: number) => void;
}

export function AttendanceCalculatorForm({
  onCalculate,
}: AttendanceCalculatorFormProps) {
  const [totalConducted, setTotalConducted] = React.useState("");
  const [totalAttended, setTotalAttended] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const conducted = parseInt(totalConducted);
    const attended = parseInt(totalAttended);

    if (!totalConducted || !totalAttended) {
      setError("Please fill in both fields");
      return;
    }

    if (isNaN(conducted) || isNaN(attended)) {
      setError("Please enter valid numbers");
      return;
    }

    if (conducted <= 0) {
      setError("Total classes must be greater than 0");
      return;
    }

    if (attended < 0) {
      setError("Classes attended cannot be negative");
      return;
    }

    if (attended > conducted) {
      setError("You can't attend more classes than were conducted!");
      return;
    }

    onCalculate(conducted, attended);
  };

  return (
    <CardBox>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <label
              htmlFor="totalConducted"
              className="text-base font-medium text-foreground flex items-center gap-2"
            >
              Total classes conducted
              <span className="text-xs text-muted-foreground font-normal">
                (till today)
              </span>
            </label>
            <input
              type="number"
              id="totalConducted"
              value={totalConducted}
              onChange={(e) => setTotalConducted(e.target.value)}
              min="0"
              className="h-12 sm:h-14 w-full rounded border-2 border-border bg-input px-4 sm:px-5 text-base sm:text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Total number of classes that happened
            </p>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="totalAttended"
              className="text-base font-medium text-foreground flex items-center gap-2"
            >
              Classes you attended
              <span className="text-xs text-(--color-muted-foreground) font-normal">
                (so far)
              </span>
            </label>
            <input
              type="number"
              id="totalAttended"
              value={totalAttended}
              onChange={(e) => setTotalAttended(e.target.value)}
              min="0"
              className="h-12 sm:h-14 w-full rounded border-2 border-border bg-input px-4 sm:px-5 text-base sm:text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <p className="text-xs text-(--color-muted-foreground) mt-1">
              How many classes you were present for
            </p>
          </div>
        </div>

        {error && (
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
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          </div>
        )}

        <Button type="submit" size="lg" className="mt-8 w-full">
          Calculate My Attendance →
        </Button>
      </form>
    </CardBox>
  );
}
