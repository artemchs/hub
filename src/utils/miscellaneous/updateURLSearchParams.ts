export function updateURLSearchParams(
  updates: Record<string, string>,
  searchParams: URLSearchParams | null,
) {
  const params = new URLSearchParams(searchParams?.toString());
  Object.entries(updates).forEach(([key, value]) => {
    params.set(key, value);
  });
  window.history.pushState(null, "", `?${params.toString()}`);
}
