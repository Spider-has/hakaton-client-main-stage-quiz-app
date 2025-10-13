export const formatDate = (dateString?: string): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
