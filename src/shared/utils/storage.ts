/**
 * Typed localStorage wrapper.
 *
 * Reasoning for the wrapper:
 *   1. localStorage's get/set/JSON.parse trio leaks throwable cases
 *      (parse errors, quota exceeded, disabled storage in private-mode
 *      browsers). Each call site shouldn't have to repeat the
 *      try/catch.
 *   2. Returning a fallback on parse error means a corrupted entry
 *      resets to empty rather than crashing the app. For a pantry
 *      that's worse than a clean reset is far worse than no data.
 *   3. The generic `<T>` lets capabilities own their own schema types
 *      while still routing through one wrapper.
 *
 * Schema migration plumbing is deliberately omitted (see plan §
 * "Deferred from shared utilities") — a `version` field is captured
 * by callers, but only as a forward-compatibility marker for now.
 */

export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full, disabled, or private-mode-restricted. Swallowing
    // here is intentional — the UI must not break if the user is on a
    // device that won't persist. A toast at the capability layer is
    // a better recovery path than a thrown exception bubbling to React.
  }
}

export function removeStored(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* same rationale as writeStored */
  }
}
