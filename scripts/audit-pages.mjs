#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const pagesDir = path.join(root, "pages");

const pageDirs = fs
  .readdirSync(pagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(pagesDir, entry.name))
  .sort();

let failures = 0;

function fail(file, message) {
  failures += 1;
  console.log(`FAIL ${path.relative(root, file)} - ${message}`);
}

function pass(file, message) {
  console.log(`OK   ${path.relative(root, file)} - ${message}`);
}

for (const pageDir of pageDirs) {
  const file = path.join(pageDir, "index.html");
  let fileFailures = 0;

  const failFile = (message) => {
    fileFailures += 1;
    fail(file, message);
  };

  if (!fs.existsSync(file)) {
    failFile("missing index.html");
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const checks = [
    ["doctype", /<!doctype html>/i.test(html)],
    ["html lang", /<html[^>]*\slang=/i.test(html)],
    ["viewport meta", /<meta[^>]+name=["']viewport["']/i.test(html)],
    ["title", /<title>[^<]+<\/title>/i.test(html)],
    ["h1", /<h1\b/i.test(html)],
    ["interactive control", /<(button|input|select|textarea)\b/i.test(html)],
    ["inline script", /<script\b[^>]*>[\s\S]*?<\/script>/i.test(html)],
    ["dark mode support", /prefers-color-scheme|data-theme|dark-mode|dark/i.test(html)],
  ];

  for (const [name, ok] of checks) {
    if (!ok) failFile(`missing ${name}`);
  }

  if (/(?:src|href)=["']https?:\/\//i.test(html)) {
    failFile("external src/href dependency");
  }

  if (/(TODO|TBD|Lorem ipsum|\[topic\])/i.test(html)) {
    failFile("placeholder text");
  }

  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  for (let index = 0; index < scripts.length; index += 1) {
    try {
      new vm.Script(scripts[index][1], {
        filename: `${path.relative(root, file)}#script${index + 1}`,
      });
    } catch (error) {
      failFile(`JavaScript syntax error: ${error.message}`);
    }
  }

  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicates.length > 0) {
    failFile(`duplicate ids: ${duplicates.join(", ")}`);
  }

  const inlineHandlers = [...html.matchAll(/\son\w+=["']([^"']+)["']/gi)]
    .map((match) => match[1].match(/^\s*([A-Za-z_$][\w$]*)\s*\(/)?.[1])
    .filter(Boolean);
  const missingHandlers = [...new Set(inlineHandlers)].filter((name) => {
    const declaredFunction = new RegExp(`function\\s+${name}\\s*\\(`).test(html);
    const assignedToWindow = new RegExp(`window\\.${name}\\s*=`).test(html);
    return !declaredFunction && !assignedToWindow;
  });
  if (missingHandlers.length > 0) {
    failFile(`inline handlers not globally defined: ${missingHandlers.join(", ")}`);
  }

  if (fileFailures === 0) {
    pass(file, `${scripts.length} inline script(s), ${ids.length} id(s)`);
  }
}

if (failures > 0) {
  console.log(`\n${failures} audit failure(s).`);
  process.exit(1);
}

console.log(`\nAudited ${pageDirs.length} page(s) with no failures.`);
