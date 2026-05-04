#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const chromeCandidates = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium",
  "chromium-browser",
].filter(Boolean);

const chrome = chromeCandidates.find((candidate) => {
  if (candidate.includes(path.sep)) return fs.existsSync(candidate);
  const result = spawnSync("which", [candidate], { encoding: "utf8" });
  return result.status === 0;
});

if (!chrome) {
  console.error("No Chrome-compatible browser found. Set CHROME_BIN to run browser smoke checks.");
  process.exit(1);
}

const pageFiles = fs
  .readdirSync(path.join(root, "pages"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(root, "pages", entry.name, "index.html"))
  .filter((file) => fs.existsSync(file))
  .sort();

let failures = 0;
const profileDir = path.join(os.tmpdir(), `offline-pages-chrome-${process.pid}`);

for (const file of pageFiles) {
  const result = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      `--user-data-dir=${profileDir}`,
      "--dump-dom",
      pathToFileURL(file).href,
    ],
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024, timeout: 10_000 },
  );

  const rel = path.relative(root, file);
  const seriousStderr = result.stderr
    .split("\n")
    .filter((line) => /Uncaught|SyntaxError|ReferenceError|TypeError/.test(line));

  if (result.status !== 0 || !result.stdout.includes("<html") || seriousStderr.length > 0) {
    failures += 1;
    console.log(`FAIL ${rel}`);
    if (result.error) console.log(`  error: ${result.error.message}`);
    if (result.status !== 0) console.log(`  exit: ${result.status}`);
    if (seriousStderr.length > 0) console.log(`  stderr: ${seriousStderr.join(" | ")}`);
    continue;
  }

  const title = result.stdout.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "untitled";
  console.log(`OK   ${rel} - ${title}`);
}

fs.rmSync(profileDir, { recursive: true, force: true });

if (failures > 0) {
  console.log(`\n${failures} browser smoke failure(s).`);
  process.exit(1);
}

console.log(`\nBrowser-smoked ${pageFiles.length} page(s) with ${path.basename(chrome)}.`);
