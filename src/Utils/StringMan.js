export function trimStringTo(limit, string) {
  if (!limit) {
    console.error("Why not just remove the string?");
    return "null";
  }
  if (string.length <= limit) {
    return string;
  }
  return string.substring(0, limit) + "...";
}
