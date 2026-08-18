export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");

  return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced) + "...";
};
