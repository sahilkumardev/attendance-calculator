export const getAttendanceColor = (percentage: number | null): string => {
  if (percentage === null) return "text-muted-foreground";
  if (percentage < 75) return "text-destructive";
  if (percentage < 85) return "text-warning";
  return "text-success";
};
