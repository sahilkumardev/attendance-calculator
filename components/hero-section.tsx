"use client";

import { useState } from "react";
import { AttendanceCalculatorForm } from "@/components/attendance-calculator-form";
import AttendanceCalculator from "./attendance-calculator";

export function HeroSection() {
  const [totalConducted, setTotalConducted] = useState<number | null>(null);
  const [totalAttended, setTotalAttended] = useState<number | null>(null);

  const handleCalculate = (conducted: number, attended: number) => {
    setTotalConducted(conducted);
    setTotalAttended(attended);
  };

  return (
    <section className="min-h-[calc(100vh-4.5rem)] flex justify-center items-center flex-col">
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-3xl font-machine mb-2">
          Attendance Percentage Calculator
        </h1>
        <p className="text-muted-foreground">
          Start by entering how many classes have been conducted and how many
          you&apos;ve attended so far
        </p>
      </div>

      <div>
        <AttendanceCalculatorForm onCalculate={handleCalculate} />

        {totalConducted !== null && totalAttended !== null && (
          <AttendanceCalculator
            totalConducted={totalConducted}
            totalAttended={totalAttended}
            mode="planner"
          />
        )}
      </div>
      <div>
        {/* 
        <div>
          {totalConducted !== null && totalAttended !== null ? (
            <AttendanceCalculator
              totalConducted={totalConducted}
              totalAttended={totalAttended}
              mode="results"
            />
          ) : (
            <div className="border border-border rounded-lg p-10 bg-card h-full flex items-center justify-center min-h-100">
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M12 7v6" />
                    <path d="M9 10h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Ready to calculate?
                </h3>
                <p className="text-base text-muted-foreground max-w-sm mx-auto">
                  Enter your attendance details on the left to see your results,
                  future predictions, and quick scenarios here.
                </p>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </section>
  );
}
