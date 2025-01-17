export const validateMonetaryInput = (input: string): boolean => {
  /* digits + decimal seperator dot or comma and only two digits at the end */
  /*     ^\d+[.|,]{1}\d{2}$ */
  const regex = new RegExp("^\\d+[.|,]{1}\\d{2}$");
  return regex.test(input);
};
