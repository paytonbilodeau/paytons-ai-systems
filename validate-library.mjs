import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(root, "manifest.json");
const failures = [];

const canonicalSystems = [
  ["01", 1, "AI Memory and Reflection System", "01 AI Memory and Reflection System", "write_files", [], "public_ready"],
  ["02", 2, "Skill Library and Improvement System", "02 Skill Library and Improvement System", "write_files", ["current_official_information", "run_named_tools"], "public_ready"],
  ["03", 3, "Safe Automation Blueprint", "03 Safe Automation Blueprint", "chat_only", ["run_named_tools"], "public_ready"],
  ["04", 4, "Decision to Action System", "04 Decision to Action System", "chat_only", ["current_official_information"], "public_ready"],
  ["05", 5, "Video Pre-Edit System", "05 Video Pre-Edit System", "run_named_tools", [], "public_ready"],
  ["06", 6, "Visual Style Builder", "06 Visual Style Builder", "chat_only", ["image_understanding", "image_generation", "current_official_information"], "public_ready"],
  ["07", 7, "AI Tool and Subscription Fit System", "07 AI Tool and Subscription Fit System", "chat_only", ["current_official_information"], "public_ready"],
  ["08", 8, "AI Workspace Setup System", "08 AI Workspace Setup System", "chat_only", ["local_inspection", "run_named_tools"], "public_ready"],
  ["09", 9, "Visual Storytelling and Motion System", "09 Visual Storytelling and Motion System", "write_files", ["run_named_tools", "image_generation", "current_official_information"], "public_ready"],
  ["10", 10, "Content Waterfall System", "10 Content Waterfall System", "write_files", ["run_named_tools"], "public_ready"]
];

const requiredRootFiles = [
  "README.md",
  "READ ME FIRST.md",
  "FULL LIBRARY MAP.md",
  "BUNDLE ORCHESTRATOR.md",
  "CONTENT PACK ORCHESTRATOR.md",
  "SKILLS AND AUTOMATION PACK ORCHESTRATOR.md",
  "SETUP GUIDE.md",
  "GLOSSARY.md",
  "CHANGELOG.md",
  "LICENSE AND USE.md",
  "THIRD-PARTY INDEX.md",
  "templates/BUNDLE STATUS.md",
  "templates/SYSTEM HANDOFF.md",
  "templates/TEN-RUN VALUE TRACKER.md",
  "templates/CONTENT ROI TRACKER.md",
  "templates/SYSTEM ROI TRACKER.md",
  "templates/MEASUREMENT DASHBOARD.md",
  "manifest.json",
  "validate-library.mjs"
];

const canonicalBundles = [
  {
    key: "content",
    name: "AI Content Creation Collection",
    systemIds: ["05", "06", "09", "10"],
    orchestrator: "CONTENT PACK ORCHESTRATOR.md",
    tracker: "templates/CONTENT ROI TRACKER.md"
  },
  {
    key: "skills_automation",
    name: "AI Skills and Automation Collection",
    systemIds: ["02", "03"],
    orchestrator: "SKILLS AND AUTOMATION PACK ORCHESTRATOR.md",
    tracker: "templates/SYSTEM ROI TRACKER.md"
  },
  {
    key: "complete",
    name: "Complete AI Systems Library",
    systemIds: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
    orchestrator: "BUNDLE ORCHESTRATOR.md",
    tracker: "templates/MEASUREMENT DASHBOARD.md"
  }
];

const requiredExamples = new Map([
  ["01", "examples/EXAMPLE PROJECT MEMORY.md"],
  ["02", "examples/EXAMPLE SKILL PACKAGE.md"],
  ["03", "examples/EXAMPLE AUTOMATION PILOT.md"],
  ["04", "examples/EXAMPLE DECISION.md"],
  ["05", "examples/EXAMPLE EDIT REPORT.md"],
  ["06", "examples/EXAMPLE STYLE BUILD.md"],
  ["07", "examples/EXAMPLE TOOL DECISION.md"],
  ["08", "examples/EXAMPLE WORKSPACE PLAN.md"],
  ["09", "examples/EXAMPLE MOTION PLAN.md"],
  ["10", "examples/EXAMPLE WATERFALL RUN.md"]
]);

const toolTests = new Map([
  ["02", ["python3", "-B", "-m", "unittest", "discover", "-s", "tests", "-p", "test_*.py"]],
  ["03", ["python3", "-B", "-m", "unittest", "discover", "-s", "tests", "-p", "test_*.py"]],
  ["05", ["python3", "-B", "-m", "unittest", "discover", "-s", "tests", "-p", "test_*.py"]],
  ["08", ["python3", "-B", "-m", "unittest", "discover", "-s", "tests", "-p", "test_*.py"]],
  ["09", [process.execPath, "--test", "tests/*.test.mjs"]],
  ["10", ["python3", "-B", "-m", "unittest", "discover", "-s", "tests", "-p", "test_*.py"]]
]);

const allowedExtensions = new Set([".md", ".json", ".mjs", ".py", ".txt", ".ts", ".tsx"]);
const allowedMinimumCapabilities = new Set(["chat_only", "read_files", "write_files", "run_named_tools"]);
const allowedAdditionalCapabilities = new Set([
  "connected_app",
  "image_understanding",
  "image_generation",
  "current_official_information",
  "local_inspection",
  "run_named_tools"
]);

function fail(message) {
  failures.push(message);
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function safeRelativePath(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    fail(`${label} must be a non-empty relative path`);
    return null;
  }
  const normalized = path.posix.normalize(value.replaceAll("\\", "/"));
  if (
    path.posix.isAbsolute(normalized) ||
    normalized === ".." ||
    normalized.startsWith("../") ||
    /^[A-Za-z]:\//.test(normalized)
  ) {
    fail(`${label} must stay inside the library`);
    return null;
  }
  return normalized;
}

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === ".gitignore") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      fail(`Symbolic link is not allowed: ${toPosix(path.relative(root, fullPath))}`);
      continue;
    }
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function lineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function runMutationTests() {
  const testFailures = [];
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-systems-validator-"));

  function updateManifest(caseRoot, update) {
    const caseManifestPath = path.join(caseRoot, "manifest.json");
    const caseManifest = JSON.parse(fs.readFileSync(caseManifestPath, "utf8"));
    update(caseManifest);
    fs.writeFileSync(caseManifestPath, `${JSON.stringify(caseManifest, null, 2)}\n`, "utf8");
  }

  function runCase(name, mutate, expectedMessage, shouldPass = false) {
    const caseRoot = path.join(temporaryRoot, name);
    fs.cpSync(root, caseRoot, {
      recursive: true,
      filter: (source) => path.basename(source) !== ".git"
    });
    mutate(caseRoot);
    const result = spawnSync(process.execPath, [path.join(caseRoot, "validate-library.mjs")], {
      cwd: caseRoot,
      encoding: "utf8",
      env: {
        ...(process.env.PATH ? { PATH: process.env.PATH } : {}),
        AI_MENTORSHIP_VALIDATOR_MUTATION_CHILD: "1"
      },
      timeout: 30000
    });
    const output = `${result.stdout || ""}\n${result.stderr || ""}`;
    if (shouldPass) {
      if (result.status !== 0) testFailures.push(`Mutation ${name} should pass`);
    } else if (result.status === 0 || !output.includes(expectedMessage)) {
      testFailures.push(`Mutation ${name} should report ${expectedMessage}`);
    }
  }

  try {
    runCase("hidden-file", (caseRoot) => {
      fs.writeFileSync(path.join(caseRoot, ".hidden.md"), "hidden\n", "utf8");
      updateManifest(caseRoot, (item) => item.rootFiles.push(".hidden.md"));
    }, "Unexpected hidden file");
    runCase("symbolic-link", (caseRoot) => {
      fs.symlinkSync(path.join(caseRoot, "READ ME FIRST.md"), path.join(caseRoot, "linked.md"));
      updateManifest(caseRoot, (item) => item.rootFiles.push("linked.md"));
    }, "Symbolic link is not allowed");
    runCase("path-traversal", (caseRoot) => {
      updateManifest(caseRoot, (item) => item.rootFiles.push("../outside.md"));
    }, "must stay inside the library");
    runCase("secret-pattern", (caseRoot) => {
      fs.appendFileSync(path.join(caseRoot, "READ ME FIRST.md"), `\nSecret ${"sk-" + "A".repeat(24)}\n`, "utf8");
    }, "OpenAI or Anthropic style secret");
    runCase("template-placeholder", (caseRoot) => {
      fs.appendFileSync(path.join(caseRoot, "templates/BUNDLE STATUS.md"), "\nOwner: [your name]\n", "utf8");
    }, "", true);
    runCase("release-marker", (caseRoot) => {
      fs.appendFileSync(path.join(caseRoot, "READ ME FIRST.md"), "\nTODO before release\n", "utf8");
    }, "unfinished marker");
    runCase("missing-start-here", (caseRoot) => {
      fs.unlinkSync(path.join(caseRoot, "01 AI Memory and Reflection System/START HERE.md"));
      updateManifest(caseRoot, (item) => {
        item.systems[0].requiredFiles = item.systems[0].requiredFiles.filter((file) => file !== "START HERE.md");
      });
    }, "must declare START HERE.md");
    runCase("missing-system", (caseRoot) => {
      fs.unlinkSync(path.join(caseRoot, "01 AI Memory and Reflection System/SYSTEM.md"));
      updateManifest(caseRoot, (item) => {
        item.systems[0].requiredFiles = item.systems[0].requiredFiles.filter((file) => file !== "SYSTEM.md");
      });
    }, "must declare SYSTEM.md");
    runCase("missing-example", (caseRoot) => {
      fs.unlinkSync(path.join(caseRoot, "01 AI Memory and Reflection System/examples/EXAMPLE PROJECT MEMORY.md"));
      updateManifest(caseRoot, (item) => {
        item.systems[0].requiredFiles = item.systems[0].requiredFiles.filter((file) => !file.startsWith("examples/"));
      });
    }, "must declare its canonical filled example");
    runCase("missing-template", (caseRoot) => {
      fs.rmSync(path.join(caseRoot, "01 AI Memory and Reflection System/templates"), { recursive: true });
      updateManifest(caseRoot, (item) => {
        item.systems[0].requiredFiles = item.systems[0].requiredFiles.filter((file) => !file.startsWith("templates/"));
      });
    }, "must declare at least one Markdown template");
    runCase("bundle-leak", (caseRoot) => {
      updateManifest(caseRoot, (item) => item.bundles[0].systemIds.push("01"));
    }, "Bundle content must use exact system membership");
    runCase("missing-measurement", (caseRoot) => {
      updateManifest(caseRoot, (item) => {
        item.systems[0].measurementFile = "templates/MISSING.md";
      });
    }, "measurementFile must be declared");
    runCase("waterfall-status-drift", (caseRoot) => {
      updateManifest(caseRoot, (item) => {
        item.systems[9].status = "experimental";
      });
    }, "System 10 status must be public_ready");
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
  return testFailures;
}

function runPublicToolTests(manifest) {
  const testFailures = [];
  let passed = 0;
  for (const system of manifest.systems) {
    const command = toolTests.get(system.id);
    if (!command) continue;
    const executable = command[0];
    let args = command.slice(1);
    if (system.id === "09") {
      args = ["--test", path.join(root, system.path, "tests", "motion_plan.test.mjs")];
    }
    const result = spawnSync(executable, args, {
      cwd: path.join(root, system.path),
      encoding: "utf8",
      env: {
        ...(process.env.PATH ? { PATH: process.env.PATH } : {}),
        PYTHONDONTWRITEBYTECODE: "1"
      },
      timeout: 180000
    });
    if (result.status !== 0) {
      const detail = `${result.stdout || ""}\n${result.stderr || ""}`.trim();
      testFailures.push(`System ${system.id} tool tests failed${detail ? `: ${detail}` : ""}`);
    } else {
      passed += 1;
    }
  }
  return { failures: testFailures, passed };
}

let manifest = null;
if (!fs.existsSync(manifestPath)) fail("manifest.json is missing");
else {
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    fail("manifest.json is not valid JSON");
  }
}
if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
  if (manifest !== null) fail("manifest.json must contain one object");
  manifest = { rootFiles: [], bundles: [], systems: [] };
}

if (!Array.isArray(manifest.rootFiles)) {
  fail("manifest.rootFiles must be an array");
  manifest.rootFiles = [];
}
if (!Array.isArray(manifest.bundles)) {
  fail("manifest.bundles must be an array");
  manifest.bundles = [];
}
if (!Array.isArray(manifest.systems)) {
  fail("manifest.systems must be an array");
  manifest.systems = [];
}
if (!/^\d+\.\d+\.\d+$/.test(manifest.version || "")) fail("manifest.version must use major.minor.patch");
if (manifest.releaseStatus !== "public_release") {
  fail("manifest.releaseStatus must be public_release");
}
if (!sameJson(manifest.rootFiles, requiredRootFiles)) fail("manifest.rootFiles must use the canonical public root file list");

if (manifest.bundles.length !== canonicalBundles.length) {
  fail(`Expected ${canonicalBundles.length} bundles, found ${manifest.bundles.length}`);
}
for (const [index, expected] of canonicalBundles.entries()) {
  const bundle = manifest.bundles[index];
  if (!bundle || typeof bundle !== "object" || Array.isArray(bundle)) continue;
  for (const field of ["key", "name", "orchestrator", "tracker"]) {
    if (bundle[field] !== expected[field]) fail(`Bundle ${expected.key} ${field} is invalid`);
  }
  if (!sameJson(bundle.systemIds, expected.systemIds)) {
    fail(`Bundle ${expected.key} must use exact system membership ${expected.systemIds.join(",")}`);
  }
}

if (manifest.systems.length !== canonicalSystems.length) {
  fail(`Expected ${canonicalSystems.length} systems, found ${manifest.systems.length}`);
}
for (const [index, expected] of canonicalSystems.entries()) {
  const system = manifest.systems[index];
  if (!system || typeof system !== "object" || Array.isArray(system)) {
    fail(`System ${index + 1} must be an object`);
    continue;
  }
  const [id, order, name, systemPath, minimum, additional, status] = expected;
  if (system.id !== id || system.order !== order || system.name !== name || system.path !== systemPath) {
    fail(`System ${order} must be ${id}: ${name} at ${systemPath}`);
  }
  if (!allowedMinimumCapabilities.has(system.minimumCapability) || system.minimumCapability !== minimum) {
    fail(`System ${id} minimumCapability must be ${minimum}`);
  }
  if (!Array.isArray(system.additionalCapabilities) || system.additionalCapabilities.some((item) => !allowedAdditionalCapabilities.has(item)) || !sameJson(system.additionalCapabilities, additional)) {
    fail(`System ${id} additionalCapabilities must be ${JSON.stringify(additional)}`);
  }
  if (system.status !== status) fail(`System ${id} status must be ${status}`);
  if (!Array.isArray(system.requiredFiles) || !system.requiredFiles.length) {
    fail(`System ${id} must declare requiredFiles`);
    continue;
  }
  for (const required of ["START HERE.md", "SYSTEM.md"]) {
    if (!system.requiredFiles.includes(required)) fail(`System ${id} must declare ${required}`);
  }
  if (!system.requiredFiles.includes(requiredExamples.get(id))) {
    fail(`System ${id} must declare its canonical filled example`);
  }
  if (!system.requiredFiles.some((item) => typeof item === "string" && item.startsWith("templates/") && item.endsWith(".md"))) {
    fail(`System ${id} must declare at least one Markdown template`);
  }
  if (!system.requiredFiles.includes(system.measurementFile)) fail(`System ${id} measurementFile must be declared`);
  if (!system.requiredFiles.includes(system.maintenanceFile)) fail(`System ${id} maintenanceFile must be declared`);
  if (toolTests.has(id) && typeof system.testCommand !== "string") fail(`System ${id} must declare testCommand`);
}

const declaredFiles = new Set();
function declare(relativePath, label) {
  const normalized = safeRelativePath(relativePath, label);
  if (!normalized) return;
  if (declaredFiles.has(normalized)) fail(`Duplicate declared file: ${normalized}`);
  else declaredFiles.add(normalized);
}
manifest.rootFiles.forEach((item, index) => declare(item, `rootFiles[${index}]`));
manifest.systems.forEach((system, systemIndex) => {
  if (!system || typeof system !== "object" || !Array.isArray(system.requiredFiles)) return;
  const systemRoot = safeRelativePath(system.path, `systems[${systemIndex}].path`);
  if (!systemRoot) return;
  system.requiredFiles.forEach((item, fileIndex) => {
    const child = safeRelativePath(item, `systems[${systemIndex}].requiredFiles[${fileIndex}]`);
    if (child) declare(path.posix.join(systemRoot, child), "system file");
  });
});

const actualFilePaths = walk(root);
const actualFiles = new Set(actualFilePaths.map((item) => toPosix(path.relative(root, item))));
for (const relativePath of declaredFiles) {
  if (!actualFiles.has(relativePath)) fail(`Missing declared file: ${relativePath}`);
}
for (const relativePath of actualFiles) {
  if (!declaredFiles.has(relativePath)) fail(`Undeclared file: ${relativePath}`);
}

const scanRules = [
  ["macOS private user path", /\/Users\/[^/\s`"'<>]+/g],
  ["Linux private user path", /\/home\/[^/\s`"'<>]+/g],
  ["home-folder shorthand", /(?:^|[\s`"'(])~\/[^\s`"'<>]+/gm],
  ["Windows private user path", /[A-Za-z]:[\\/]+Users[\\/]+[^\\/\s`"'<>]+/g],
  ["local file URL", /\bfile:\/\/[^\s`"'<>]+/gi],
  ["non-example email address", /\b[A-Z0-9._%+-]+@(?!example\.com\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/gi],
  ["phone number", /(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]\d{3}[-.\s]\d{4}\b/g],
  ["private Google sharing URL", /https?:\/\/(?:drive|docs)\.google\.com\/[^\s`"'<>]+/gi],
  ["credential inside URL", /https?:\/\/[^/\s:@]+:[^@\s/]+@[^\s]+/gi],
  ["private key block", /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY(?: BLOCK)?-----/g],
  ["OpenAI or Anthropic style secret", /\bsk-[A-Za-z0-9_-]{20,}\b/g],
  ["Stripe secret", /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ["Stripe webhook secret", /\bwhsec_[A-Za-z0-9]{16,}\b/g],
  ["GitHub secret", /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g],
  ["Slack secret", /\bxox[baprs]-[A-Za-z0-9-]{16,}\b/g],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{30,}\b/g],
  ["Google OAuth secret", /\b(?:GOCSPX-|ya29\.)[A-Za-z0-9_-]{20,}\b/g],
  ["AWS access key", /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g],
  ["npm token", /\bnpm_[A-Za-z0-9]{20,}\b/g],
  ["JWT-like token", /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\b/g],
  ["assigned secret-like value", /\b(?:api[_-]?key|client[_-]?secret|access[_-]?token|refresh[_-]?token|password)\b\s*[:=]\s*["']?[A-Za-z0-9+/_=-]{16,}/gi],
  ["private workspace marker", /\b(?:Business Vibe Coding|Today in AI|Hermes Agent|Jarvis ecosystem)\b/gi]
];
const unresolvedRules = [
  ["unfinished marker", /\b(?:TODO|TBD|FIXME|CHANGEME|REPLACE_ME)\b/g],
  ["unresolved square placeholder", /\[(?:placeholder|fill(?: this)? in|insert [^\]\n]+|your [^\]\n]+)\]/gi],
  ["unresolved angle placeholder", /<(?:placeholder|fill(?: this)? in|insert [^>\n]+|your [^>\n]+)>/gi],
  ["unresolved mustache placeholder", /\{\{[^{}\n]+\}\}/g]
];

for (const filePath of actualFilePaths) {
  const relativePath = toPosix(path.relative(root, filePath));
  if (relativePath.split("/").some((segment) => segment.startsWith("."))) {
    fail(`Unexpected hidden file: ${relativePath}`);
    continue;
  }
  if (!allowedExtensions.has(path.extname(filePath))) {
    fail(`Unexpected file type: ${relativePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.trim()) {
    fail(`Empty file: ${relativePath}`);
    continue;
  }
  const containsValidatorFixtures = relativePath === "validate-library.mjs";
  if (!containsValidatorFixtures) {
    for (const [label, pattern] of scanRules) {
      pattern.lastIndex = 0;
      const match = pattern.exec(content);
      if (match) fail(`${label} found in ${relativePath} at line ${lineNumber(content, match.index)}`);
    }
  }
  const isEditableTemplate = relativePath.split("/").includes("templates");
  if (!isEditableTemplate && !containsValidatorFixtures) {
    for (const [label, pattern] of unresolvedRules) {
      if (label === "unresolved mustache placeholder" && [".ts", ".tsx", ".mjs", ".py"].includes(path.extname(filePath))) {
        continue;
      }
      pattern.lastIndex = 0;
      const match = pattern.exec(content);
      if (match) fail(`${label} found in ${relativePath} at line ${lineNumber(content, match.index)}`);
    }
  }
}

for (const [, , , systemPath] of canonicalSystems) {
  const startPath = path.join(root, systemPath, "START HERE.md");
  const systemPathFile = path.join(root, systemPath, "SYSTEM.md");
  if (fs.existsSync(startPath)) {
    const start = fs.readFileSync(startPath, "utf8");
    if (!start.includes("## Minimum AI capability")) fail(`${systemPath}/START HERE.md must name its minimum AI capability`);
  }
  if (fs.existsSync(systemPathFile)) {
    const instructions = fs.readFileSync(systemPathFile, "utf8");
    for (const heading of ["## Test and evidence", "## Ten-run measurement", "## Maintenance loop", "## Safety and human review"]) {
      if (!instructions.includes(heading)) fail(`${systemPath}/SYSTEM.md must include ${heading}`);
    }
  }
}

const motionPackagePath = path.join(root, "09 Visual Storytelling and Motion System/starter/package.json");
if (fs.existsSync(motionPackagePath)) {
  const motionPackage = JSON.parse(fs.readFileSync(motionPackagePath, "utf8"));
  if (motionPackage.private !== true) fail("System 09 starter package must be private");
  for (const [dependency, version] of Object.entries({
    "@remotion/cli": "4.0.499",
    react: "18.3.1",
    "react-dom": "18.3.1",
    remotion: "4.0.499"
  })) {
    if (motionPackage.dependencies?.[dependency] !== version) fail(`System 09 must pin ${dependency} to ${version}`);
  }
  for (const version of Object.values({ ...motionPackage.dependencies, ...motionPackage.devDependencies })) {
    if (/^(?:latest|[~^*])/.test(String(version))) fail("System 09 dependencies must use exact versions");
  }
}

if (failures.length === 0 && process.env.AI_MENTORSHIP_VALIDATOR_MUTATION_CHILD !== "1") {
  failures.push(...runMutationTests());
}
let passedToolSuites = 0;
if (failures.length === 0 && process.env.AI_MENTORSHIP_VALIDATOR_MUTATION_CHILD !== "1") {
  const result = runPublicToolTests(manifest);
  failures.push(...result.failures);
  passedToolSuites = result.passed;
}

if (failures.length) {
  console.error(`Library validation failed with ${new Set(failures).size} issue(s):`);
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Library validation passed: 10 canonical systems, 3 public collections, ${actualFiles.size} exactly declared non-empty files, 13 mutation checks, and ${passedToolSuites} runnable tool suites. System 10 keeps its documented first-production proof boundary.`
);
