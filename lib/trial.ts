export const FREE_GENERATIONS = 3;
const STORAGE_KEY = "prompt_to_ui_generations";

// localStorage can be unavailable (private windows, blocked site data), so never let it throw.
export function readGenerationCount(): number {
  try {
    const value = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  } catch {
    return 0;
  }
}

export function writeGenerationCount(count: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(count));
  } catch {
    // Ignore: the in-memory count still applies for this visit.
  }
}
