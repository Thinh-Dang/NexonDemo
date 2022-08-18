export const calculateAge = (date: Date): number => {
  const now = new Date();

  return now.getFullYear() - date.getFullYear();
};
