export const getAttendanceStatus = (percentage: number | null): string => {
  if (percentage === null) return "";
  if (percentage < 75) return "at risk";
  if (percentage < 85) return "okay";
  return "good";
};
