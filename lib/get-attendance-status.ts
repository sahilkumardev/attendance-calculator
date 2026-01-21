export const getAttendanceStatus = (
  percentage: number | null,
  minAttendance: number = 75,
): string => {
  if (percentage === null) return "";
  if (percentage < minAttendance) return "at risk";
  if (percentage < minAttendance + 10) return "okay";
  return "good";
};
