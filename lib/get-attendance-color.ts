export const getAttendanceColor = (percentage: number | null): string => {
  if (percentage === null) return "text-muted-foreground";

  if (percentage < 75) return "text-red-500";
  if (percentage < 80) return "text-orange-500";
  if (percentage < 85) return "text-yellow-500";
  if (percentage < 90) return "text-lime-500";
  if (percentage < 95) return "text-green-500";

  return "text-emerald-500";
};
