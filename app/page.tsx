import { AttendanceCalculator } from "@/components/attendance-calculator";

export default function Home() {
  return (
    <>
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-3xl font-machine mb-2">
          Attendance Percentage Calculator
        </h1>
        <p className="text-muted-foreground">
          Start by entering how many classes have been conducted and how many
          you&apos;ve attended so far
        </p>
      </div>

      <AttendanceCalculator />
    </>
  );
}
