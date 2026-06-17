#!/usr/bin/env node
/**
 * Smoke test for the deployed harvest-widget GitHub Pages site.
 *
 * Usage:
 *   node scripts/smoke-test.mjs https://<user>.github.io/harvest-widget/
 */

const EXPECTED_TEXT = "Hello from harvest-widget";
const SMOKE_MARKER = 'data-smoke="ok"';

const url = process.argv[2];

if (!url) {
  console.error("Usage: node scripts/smoke-test.mjs <pages-url>");
  process.exit(1);
}

let parsed;
try {
  parsed = new URL(url);
} catch {
  console.error(`Invalid URL: ${url}`);
  process.exit(1);
}

if (parsed.protocol !== "https:") {
  console.error(`Expected HTTPS URL, got: ${parsed.protocol}`);
  process.exit(1);
}

console.log(`Fetching ${url} ...`);

const response = await fetch(url, { redirect: "follow" });

if (response.status !== 200) {
  console.error(`FAIL: expected HTTP 200, got ${response.status}`);
  process.exit(1);
}

const body = await response.text();

if (!body.includes(EXPECTED_TEXT)) {
  console.error(`FAIL: body missing "${EXPECTED_TEXT}"`);
  process.exit(1);
}

if (!body.includes(SMOKE_MARKER)) {
  console.error(`FAIL: body missing ${SMOKE_MARKER}`);
  process.exit(1);
}

console.log("PASS: smoke test succeeded");
console.log(`  status: ${response.status}`);
console.log(`  found: "${EXPECTED_TEXT}"`);
console.log(`  found: ${SMOKE_MARKER}`);
