const BOOKMARKS_KEY = "signal-next:bookmarks";
const THEME_KEY = "signal-next:theme";
const SUBSCRIBERS_KEY = "signal-next:subscribers";
const MESSAGES_KEY = "signal-next:messages";

function readList(key: string): string[] {
  const value = localStorage.getItem(key);
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.every((entry) => typeof entry === "string")) return parsed;
    console.warn(`Ignoring invalid saved data for ${key}.`);
    return [];
  } catch (error) {
    console.warn(`Could not read saved data for ${key}.`, error);
    return [];
  }
}

function writeList(key: string, value: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save data for ${key}.`, error);
  }
}

export function getBookmarks() {
  return readList(BOOKMARKS_KEY);
}

export function toggleBookmark(id: string) {
  const current = getBookmarks();
  const updated = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  writeList(BOOKMARKS_KEY, updated);
  return updated;
}

export function getTheme(): "dark" | "light" {
  return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
}

export function saveTheme(theme: "dark" | "light") {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error("Could not save theme preference.", error);
  }
}

export function subscribe(email: string) {
  const current = readList(SUBSCRIBERS_KEY);
  if (current.includes(email.toLowerCase())) return false;
  writeList(SUBSCRIBERS_KEY, [...current, email.toLowerCase()]);
  return true;
}

export function saveMessage(message: string) {
  const current = readList(MESSAGES_KEY);
  writeList(MESSAGES_KEY, [...current, message]);
}
