export const getAttendancePercentage = (
  conductedClasses: number,
  attendedClasses: number,
): number => {
  const percentage = Math.round((attendedClasses / conductedClasses) * 100);

  return percentage;
};
