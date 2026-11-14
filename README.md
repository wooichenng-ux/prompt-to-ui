# Prompt to UI

Describe a UI component, get React + Tailwind code and a live preview side by side.

## Run

```bash
npm install
```

Add your Anthropic API key to `.env.local` (`ANTHROPIC_API_KEY=...`), then:

```bash
npm run dev
```

## How it works

- `app/(site)/page.tsx` — landing page, prompt input, split code/preview workspace (tabs on mobile).
- `app/api/generate/route.ts` — server route that calls the Anthropic API. The key stays on the server.
- `lib/prompt.ts` — system prompt and cleanup of the model's output.
- `app/(preview)/preview/page.tsx` — renders generated code with `react-live` inside a sandboxed iframe, so it
  cannot reach the host page. Tailwind's browser build compiles the generated class names at runtime.

Set `ANTHROPIC_MODEL` in `.env.local` to use a different model.
