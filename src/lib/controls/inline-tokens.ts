type InlineToken = { kind: "text" | "strong" | "em" | "link"; value: string; href?: string };

/** Scan the small inline subset without retrying failed delimiters at every character. */
export function inlineTokens(source: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const positions = new Map<string, number>();
  const whitespace = /\s/g;
  let space = -2, cursor = 0, plainStart = 0;
  // Each lookahead only moves forward. Unmatched delimiters are cached as -1.
  const next = (delimiter: string, from: number) => {
    const cached = positions.get(delimiter) ?? -2;
    if (cached === -1 || cached >= from) return cached;
    const found = source.indexOf(delimiter, from);
    positions.set(delimiter, found);
    return found;
  };
  const nextSpace = (from: number) => {
    if (space === -1 || space >= from) return space;
    whitespace.lastIndex = from;
    space = whitespace.exec(source)?.index ?? -1;
    return space;
  };
  while (cursor < source.length) {
    let token: InlineToken | undefined;
    let end = cursor;
    if (source[cursor] === "*") {
      const strong = source[cursor + 1] === "*";
      const start = cursor + (strong ? 2 : 1);
      const close = next("*", start);
      if (close > start && (!strong || source[close + 1] === "*")) {
        token = { kind: strong ? "strong" : "em", value: source.slice(start, close) };
        end = close + (strong ? 2 : 1);
      }
    } else if (source[cursor] === "[") {
      const labelEnd = next("]", cursor + 1);
      if (labelEnd > cursor + 1 && source[labelEnd + 1] === "(") {
        const start = labelEnd + 2;
        const close = next(")", start);
        const blank = nextSpace(start);
        if (close > start && (blank === -1 || blank > close)) {
          const href = source.slice(start, close);
          end = close + 1;
          token = /^(https?:|mailto:)/i.test(href)
            ? { kind: "link", value: source.slice(cursor + 1, labelEnd), href }
            : { kind: "text", value: source.slice(cursor, end) };
        }
      }
    }
    if (!token) { cursor++; continue; }
    if (cursor > plainStart) tokens.push({ kind: "text", value: source.slice(plainStart, cursor) });
    tokens.push(token);
    cursor = end;
    plainStart = end;
  }
  if (plainStart < source.length) tokens.push({ kind: "text", value: source.slice(plainStart) });
  return tokens;
}
