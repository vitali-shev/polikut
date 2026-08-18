export const getFirstFormError = (errors: unknown): string | null => {
  if (!errors) return null;

  if (typeof errors === "string") return errors;

  if (typeof errors === "object") {
    for (const key of Object.keys(errors)) {
      const nestedError = getFirstFormError(
        (errors as Record<string, unknown>)[key],
      );
      if (nestedError) return nestedError;
    }
  }

  return null;
};
