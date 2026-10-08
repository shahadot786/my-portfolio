import React from "react";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "code"; text: string }
  | { type: "hr" };

const TABLE_SEPARATOR = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push({ type: "code", text: code.join("\n") });
      continue;
    }

    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
      i++;
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && TABLE_SEPARATOR.test(lines[i + 1])) {
      const header = splitRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) rows.push(splitRow(lines[i++]));
      blocks.push({ type: "table", header, rows });
      continue;
    }

    const listMatch = line.match(/^\s*([-*•]|\d+[.)])\s+(.*)$/);
    if (listMatch) {
      const ordered = /\d/.test(listMatch[1]);
      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].match(/^\s*([-*•]|\d+[.)])\s+(.*)$/);
        if (!m || /\d/.test(m[1]) !== ordered) break;
        items.push(m[2]);
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^\s*([-*•]|\d+[.)])\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("```") &&
      !(lines[i].includes("|") && TABLE_SEPARATOR.test(lines[i + 1] ?? ""))
    ) {
      para.push(lines[i++]);
    }
    blocks.push({ type: "paragraph", text: para.join("\n") });
  }

  return blocks;
}

const INLINE = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*\s][^*]*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|<br\s*\/?>)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(INLINE).filter(Boolean).map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (/^<br\s*\/?>$/.test(part)) return <br key={key} />;
    if (/^(\*\*|__)/.test(part))
      return (
        <strong key={key} className="font-semibold text-foreground">
          {renderInline(part.slice(2, -2), key)}
        </strong>
      );
    if (part.startsWith("`"))
      return (
        <code key={key} className="px-1 py-0.5 rounded bg-background/60 border border-border font-mono text-xs text-primary">
          {part.slice(1, -1)}
        </code>
      );
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2)
      return <em key={key}>{renderInline(part.slice(1, -1), key)}</em>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link)
      return (
        <a key={key} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">
          {link[1]}
        </a>
      );
    return part;
  });
}

export function AssistantMarkdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-2.5 text-xs leading-relaxed break-words">
      {blocks.map((block, b) => {
        const key = `b${b}`;
        switch (block.type) {
          case "heading":
            return (
              <p key={key} className="text-sm font-bold text-foreground pt-1">
                {renderInline(block.text, key)}
              </p>
            );
          case "paragraph":
            return (
              <p key={key} className="whitespace-pre-line">
                {renderInline(block.text, key)}
              </p>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag
                key={key}
                className={`space-y-1 pl-4 marker:text-primary ${block.ordered ? "list-decimal" : "list-disc"}`}
              >
                {block.items.map((item, n) => (
                  <li key={n} className="pl-0.5">
                    {renderInline(item, `${key}-${n}`)}
                  </li>
                ))}
              </Tag>
            );
          }
          case "table":
            return (
              <div key={key} className="overflow-x-auto rounded-xl border border-border bg-background/40">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-primary/10">
                      {block.header.map((cell, c) => (
                        <th key={c} className="px-3 py-2 font-semibold text-foreground border-b border-border whitespace-nowrap">
                          {renderInline(cell, `${key}-h${c}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-border/60 last:border-0 align-top">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={`px-3 py-2 min-w-32 ${c === 0 ? "font-semibold text-primary whitespace-nowrap" : "text-foreground/90"}`}
                          >
                            {renderInline(cell, `${key}-${r}-${c}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "code":
            return (
              <pre key={key} className="overflow-x-auto rounded-xl border border-border bg-background/60 p-3 font-mono text-xs">
                <code>{block.text}</code>
              </pre>
            );
          case "hr":
            return <hr key={key} className="border-border" />;
        }
      })}
    </div>
  );
}
