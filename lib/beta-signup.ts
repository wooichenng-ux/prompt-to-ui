// Formspree form endpoints are meant to be public, so NEXT_PUBLIC_ is fine here.
// Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in .env.local, e.g. https://formspree.io/f/abcdwxyz
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

/** Sends a beta signup. Throws if the endpoint rejects it or can't be reached. */
export async function submitBetaSignup(email: string, source: string) {
  if (!ENDPOINT) {
    console.warn("[beta] NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set, so this signup was only logged.");
    console.log("[beta] signup:", email, `(${source})`);
    return;
  }
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, source }),
  });
  if (!response.ok) throw new Error(`Signup failed (${response.status})`);
}
