export function safeToString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return value.toString();
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(safeToString).join(",");
  if (typeof value === "object") {
    throw new Error("Cannot convert object to string");
  }
  return JSON.stringify(value);
}
