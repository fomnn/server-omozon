export function useCategoryNameToSlug(name: string): string {
  return name.replace(/\s+/g, '-');
}