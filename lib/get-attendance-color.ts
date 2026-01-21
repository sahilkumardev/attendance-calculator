export const getAttendanceColor = (
  percentage: number | null,
  minAttendance: number = 75,
): string => {
  if (percentage === null) return "text-muted-foreground";

  if (percentage < minAttendance) return "text-red-500";
  if (percentage < minAttendance + 5) return "text-orange-500";
  if (percentage < minAttendance + 10) return "text-yellow-500";
  if (percentage < minAttendance + 15) return "text-lime-500";
  if (percentage < minAttendance + 20) return "text-green-500";

  return "text-emerald-500";
};
