export const MAX_PROMPT_LENGTH = 2000;

export const SYSTEM_PROMPT = `You generate a single self-contained React component, styled only with Tailwind CSS utility classes, from a short description.

Your entire reply is fed straight into a live code evaluator, so it must be raw JavaScript/JSX source and nothing else: no markdown fences, no explanation before or after.

The evaluator's constraints:
- There is no module system. Do not write import or export statements.
- React and its hooks (useState, useEffect, useMemo, useRef, useCallback, useReducer) are already in scope as globals.
- No other libraries are available. Draw icons as inline SVG. Do not fetch remote data; use realistic hard-coded sample content.
- Define the component as a function, then finish with a final line that mounts it: render(<Component />);

Design guidance: make it look like polished production UI — considered spacing, type hierarchy, hover and focus states, responsive from mobile up, and accessible markup. Honor any theme the user asks for (for example dark mode) by styling the component's own root element, since it renders on a neutral canvas.`;

/** Defensive cleanup in case the model wraps its answer or adds module syntax. */
export function cleanGeneratedCode(raw: string): string {
  let code = raw.trim();
  const fenced = code.match(/```(?:[a-zA-Z]+)?\n([\s\S]*?)```/);
  if (fenced) code = fenced[1].trim();
  code = code
    .replace(/^\s*import\s[^;\n]*;?\s*$/gm, "")
    .replace(/^\s*export\s+default\s+(?=function|class)/gm, "")
    .replace(/^\s*export\s+default\s+[A-Za-z_$][\w$]*;?\s*$/gm, "")
    .replace(/^\s*export\s+(?=const|function|class)/gm, "")
    .trim();
  if (!/\brender\s*\(/.test(code)) {
    const name = code.match(/(?:function|const)\s+([A-Z][\w$]*)/)?.[1];
    if (name) code += `\n\nrender(<${name} />);`;
  }
  return code;
}
