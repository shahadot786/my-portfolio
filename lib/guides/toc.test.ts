import assert from "node:assert/strict";
import { estimateReadingTime, extractToc, slugify } from "./toc";

const md = [
  "# Title",
  "## Getting started",
  "text",
  "```bash",
  "## not a heading",
  "```",
  "### **Bold** and `code`",
  "## Getting started",
  "#### too deep",
  "## [Link](https://x.dev) heading ##",
].join("\n");

assert.deepEqual(extractToc(md), [
  { id: "getting-started", text: "Getting started", level: 2 },
  { id: "bold-and-code", text: "Bold and code", level: 3 },
  { id: "getting-started-1", text: "Getting started", level: 2 },
  { id: "link-heading", text: "Link heading", level: 2 },
]);

assert.equal(estimateReadingTime("word ".repeat(450)), 3);
assert.equal(estimateReadingTime(""), 1);
assert.equal(slugify("  Hello, World! 2026 "), "hello-world-2026");

console.log("toc tests passed");
