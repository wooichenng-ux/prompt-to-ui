import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { MAX_PROMPT_LENGTH, SYSTEM_PROMPT, cleanGeneratedCode } from "@/lib/prompt";

export const runtime = "nodejs";
export const maxDuration = 120;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  let prompt: unknown;
  try {
    ({ prompt } = await request.json());
  } catch {
    return fail("Request body must be JSON.", 400);
  }
  if (typeof prompt !== "string" || !prompt.trim()) {
    return fail("Describe the component you want to generate.", 400);
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return fail(`Keep the description under ${MAX_PROMPT_LENGTH} characters.`, 400);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return fail("ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the server.", 500);
  }

  // The key is read from the environment on the server and never reaches the browser.
  const client = new Anthropic();

  try {
    const message = await client.beta.messages
      .stream(
        {
          model: MODEL,
          max_tokens: 32000,
          system: SYSTEM_PROMPT,
          output_config: { effort: "medium" },
          // If a safety classifier declines, let the API retry on a fallback model.
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          messages: [{ role: "user", content: prompt.trim() }],
        },
        { signal: request.signal },
      )
      .finalMessage();

    if (message.stop_reason === "refusal") {
      return fail("The model declined this request. Try rephrasing it.", 422);
    }

    const text = message.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("");
    const code = cleanGeneratedCode(text);
    if (!code) return fail("The model returned no code. Try again.", 502);

    return NextResponse.json({
      code,
      truncated: message.stop_reason === "max_tokens",
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return fail("The Anthropic API key was rejected. Check ANTHROPIC_API_KEY in .env.local.", 401);
    }
    if (error instanceof Anthropic.RateLimitError) {
      return fail("Rate limited by the Anthropic API. Wait a moment and try again.", 429);
    }
    if (error instanceof Anthropic.APIUserAbortError) {
      return fail("Request cancelled.", 499);
    }
    if (error instanceof Anthropic.APIConnectionError) {
      return fail("Could not reach the Anthropic API.", 503);
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic API error", error.status, error.message);
      return fail(`Anthropic API error (${error.status ?? "unknown"}).`, 502);
    }
    console.error(error);
    return fail("Unexpected server error.", 500);
  }
}
