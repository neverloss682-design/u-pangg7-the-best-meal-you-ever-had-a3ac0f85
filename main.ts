// The Best Meal You Ever Had — u-pangg7-the-best-meal-you-ever-had-a3ac0f85
// Writes one sentence (<=200 chars) about the best meal ever had to
// /output/entry.txt (override with MAKEFUN_OUTPUT_DIR).
// Node.js standard library only; fully deterministic output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Self-judged entry (iteration 2 of 2).
// Draft 1 (kept): a cold, specific, low-status meal that beats fine dining —
// concrete dish, place, hour and drive length, with a turn in the ending.
// Draft 2 (rejected): burnt rice from grandmother's pot at midnight — vivid,
// but "grandma's cooking" is the most saturated premise in a 1,000+ field.
const ENTRY =
  "I once ate a soggy gas-station egg sandwich on a curb in Ohio at 3am " +
  "after a fourteen-hour drive, and no white-tablecloth dinner since has " +
  "ever beaten it.";

// Gate from RULES.txt: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. One sentence, one period.
function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry length ${text.length} outside the 1..200 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading/trailing white space");
  }
  if ((text.match(/\./g) ?? []).length !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending with a period");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Exact bytes, no trailing newline: the gate counts file characters.
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
