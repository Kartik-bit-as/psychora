/**
 * backend/scripts/importTopics.ts
 *
 * Universal topic importer for PSYCHORA.
 * Fixes applied:
 *   1. Use CommonJS require syntax to avoid verbatimModuleSyntax + CJS conflict
 *   2. Correct relative path to prisma client (from backend/scripts/ -> root)
 *   3. Self-contained: no external ./topicImporter dependency
 *
 * Usage:
 *   npx tsx backend/scripts/importTopics.ts --file path/to/topic.json [--clean]
 *   npx tsx backend/scripts/importTopics.ts --dir path/to/topics/ [--clean]
 *   npx ts-node -r tsconfig-paths/register backend/scripts/importTopics.ts --file path/to/topic.json
 */

// ─────────────────────────────────────────────────────────────────────────────
// FIX #1 & #3: Use CommonJS require to avoid verbatimModuleSyntax conflict
// and keep everything self-contained (no ./topicImporter import)
// ─────────────────────────────────────────────────────────────────────────────

const fs = require("fs");
const path = require("path");

// FIX #2: Correct path from backend/scripts/ to src/config/db
// From backend/scripts/ -> go up 2 levels to root -> src/config/db
// Alternative: adjust based on your actual db config location
const { prisma } = require("../../src/config/db");

// ─────────────────────────────────────────────────────────────────────────────
// TYPES (using 'export' would conflict with CJS, so we use JSDoc or omit)
// ─────────────────────────────────────────────────────────────────────────────

interface TopicJson {
  topicName: string;
  subject: string;
  module: string;
  bookMode: {
    introduction: string;
    coreConcepts: string[];
    importantTheories: Array<{
      theoryName: string;
      proponent: string;
      corePropositions: string;
      strengths: string;
      limitations: string;
    }>;
    summary: string;
  };
  easyMode: {
    simpleExplanation: string;
    realLifeExample: string;
    story: string;
  };
  visualUnderstanding: {
    flowSteps: string[];
    mindMapPoints: string[];
    diagramDescription: string;
  };
  flashcards: Array<{ question: string; answer: string }>;
  quiz: Array<{
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
  commonMistakes: Array<{ misconception: string; correction: string }>;
  realLifeApplications: Array<{
    application: string;
    howItWorks: string;
  }>;
  keyTerms: Array<{ term: string; definition: string }>;
  quickSummary: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

function validateTopicJson(data: unknown): data is TopicJson {
  const d = data as Record<string, unknown>;

  const requiredTopLevel = [
    "topicName", "subject", "module", "bookMode", "easyMode",
    "visualUnderstanding", "flashcards", "quiz", "commonMistakes",
    "realLifeApplications", "keyTerms", "quickSummary",
  ];

  for (const key of requiredTopLevel) {
    if (!(key in d)) {
      throw new Error(`Missing required top-level field: "${key}"`);
    }
  }

  const bm = d.bookMode as Record<string, unknown>;
  if (!bm || typeof bm !== "object") {
    throw new Error("bookMode must be an object");
  }
  if (!Array.isArray(bm.coreConcepts)) {
    throw new Error("bookMode.coreConcepts must be an array");
  }
  if (!Array.isArray(bm.importantTheories)) {
    throw new Error("bookMode.importantTheories must be an array");
  }

  const arrays = [
    "flashcards", "quiz", "commonMistakes",
    "realLifeApplications", "keyTerms", "quickSummary",
  ];
  for (const arr of arrays) {
    if (!Array.isArray(d[arr])) {
      throw new Error(`"${arr}" must be an array`);
    }
  }

  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// FILE LOADING
// ─────────────────────────────────────────────────────────────────────────────

function loadTopicFile(filePath: string): TopicJson {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${resolved}`);
  }

  const raw = fs.readFileSync(resolved, "utf-8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${resolved}: ${(e as Error).message}`);
  }

  validateTopicJson(parsed);
  return parsed as TopicJson;
}

function loadTopicDirectory(dirPath: string): TopicJson[] {
  const resolved = path.resolve(dirPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Directory not found: ${resolved}`);
  }

  const files = fs
    .readdirSync(resolved)
    .filter((f: string) => f.endsWith(".json"))
    .map((f: string) => path.join(resolved, f));

  console.log(`Found ${files.length} JSON file(s) in ${resolved}`);

  const topics: TopicJson[] = [];
  for (const file of files) {
    try {
      topics.push(loadTopicFile(file));
    } catch (e) {
      console.error(`Failed to load ${file}: ${(e as Error).message}`);
    }
  }

  return topics;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATABASE OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

async function clearAllTopics(): Promise<void> {
  console.log("Clearing all existing topic data...");
  // Order matters due to foreign key constraints
  await prisma.quickSummary.deleteMany({});
  await prisma.keyTerm.deleteMany({});
  await prisma.realLifeApplication.deleteMany({});
  await prisma.commonMistake.deleteMany({});
  await prisma.quizQuestion.deleteMany({});
  await prisma.flashcard.deleteMany({});
  await prisma.importantTheory.deleteMany({});
  await prisma.visualUnderstanding.deleteMany({});
  await prisma.easyMode.deleteMany({});
  await prisma.bookMode.deleteMany({});
  await prisma.topic.deleteMany({});
  console.log("All topic data cleared");
}

async function importTopic(data: TopicJson): Promise<string> {
  const startTime = Date.now();
  console.log(`\nImporting topic: "${data.topicName}" (${data.module})`);

  // 1. Upsert Topic
  const topic = await prisma.topic.upsert({
    where: {
      topicName_module: {
        topicName: data.topicName,
        module: data.module,
      },
    },
    update: {
      subject: data.subject,
      updatedAt: new Date(),
    },
    create: {
      topicName: data.topicName,
      subject: data.subject,
      module: data.module,
    },
  });

  // 2. Upsert BookMode
  await prisma.bookMode.upsert({
    where: { topicId: topic.id },
    update: {
      introduction: data.bookMode.introduction,
      coreConcepts: data.bookMode.coreConcepts,
      summary: data.bookMode.summary,
    },
    create: {
      topicId: topic.id,
      introduction: data.bookMode.introduction,
      coreConcepts: data.bookMode.coreConcepts,
      summary: data.bookMode.summary,
    },
  });

  // 3. Recreate ImportantTheories
  await prisma.importantTheory.deleteMany({
    where: { bookMode: { topicId: topic.id } },
  });
  await prisma.importantTheory.createMany({
    data: data.bookMode.importantTheories.map((t) => ({
      bookModeTopicId: topic.id,
      theoryName: t.theoryName,
      proponent: t.proponent,
      corePropositions: t.corePropositions,
      strengths: t.strengths,
      limitations: t.limitations,
    })),
  });

  // 4. Upsert EasyMode
  await prisma.easyMode.upsert({
    where: { topicId: topic.id },
    update: {
      simpleExplanation: data.easyMode.simpleExplanation,
      realLifeExample: data.easyMode.realLifeExample,
      story: data.easyMode.story,
    },
    create: {
      topicId: topic.id,
      simpleExplanation: data.easyMode.simpleExplanation,
      realLifeExample: data.easyMode.realLifeExample,
      story: data.easyMode.story,
    },
  });

  // 5. Upsert VisualUnderstanding
  await prisma.visualUnderstanding.upsert({
    where: { topicId: topic.id },
    update: {
      flowSteps: data.visualUnderstanding.flowSteps,
      mindMapPoints: data.visualUnderstanding.mindMapPoints,
      diagramDescription: data.visualUnderstanding.diagramDescription,
    },
    create: {
      topicId: topic.id,
      flowSteps: data.visualUnderstanding.flowSteps,
      mindMapPoints: data.visualUnderstanding.mindMapPoints,
      diagramDescription: data.visualUnderstanding.diagramDescription,
    },
  });

  // 6. Recreate Flashcards
  await prisma.flashcard.deleteMany({ where: { topicId: topic.id } });
  await prisma.flashcard.createMany({
    data: data.flashcards.map((f, idx) => ({
      topicId: topic.id,
      order: idx,
      question: f.question,
      answer: f.answer,
    })),
  });

  // 7. Recreate Quiz
  await prisma.quizQuestion.deleteMany({ where: { topicId: topic.id } });
  await prisma.quizQuestion.createMany({
    data: data.quiz.map((q, idx) => ({
      topicId: topic.id,
      order: idx,
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
    })),
  });

  // 8. Recreate CommonMistakes
  await prisma.commonMistake.deleteMany({ where: { topicId: topic.id } });
  await prisma.commonMistake.createMany({
    data: data.commonMistakes.map((m) => ({
      topicId: topic.id,
      misconception: m.misconception,
      correction: m.correction,
    })),
  });

  // 9. Recreate RealLifeApplications
  await prisma.realLifeApplication.deleteMany({ where: { topicId: topic.id } });
  await prisma.realLifeApplication.createMany({
    data: data.realLifeApplications.map((a) => ({
      topicId: topic.id,
      application: a.application,
      howItWorks: a.howItWorks,
    })),
  });

  // 10. Recreate KeyTerms
  await prisma.keyTerm.deleteMany({ where: { topicId: topic.id } });
  await prisma.keyTerm.createMany({
    data: data.keyTerms.map((k) => ({
      topicId: topic.id,
      term: k.term,
      definition: k.definition,
    })),
  });

  // 11. Recreate QuickSummary
  await prisma.quickSummary.deleteMany({ where: { topicId: topic.id } });
  await prisma.quickSummary.createMany({
    data: data.quickSummary.map((s, idx) => ({
      topicId: topic.id,
      order: idx,
      content: s,
    })),
  });

  const duration = Date.now() - startTime;
  console.log(`Imported "${data.topicName}" in ${duration}ms (ID: ${topic.id})`);
  return topic.id;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const fileFlag = args.indexOf("--file");
  const dirFlag = args.indexOf("--dir");
  const cleanFlag = args.includes("--clean");

  if (fileFlag === -1 && dirFlag === -1) {
    console.log(`
Usage:
  npx tsx backend/scripts/importTopics.ts --file <path/to/topic.json> [--clean]
  npx tsx backend/scripts/importTopics.ts --dir  <path/to/topics/>   [--clean]

Options:
  --file    Path to a single topic JSON file
  --dir     Path to a directory containing multiple topic JSON files
  --clean   Clear all existing topics before importing
    `);
    process.exit(0);
  }

  try {
    if (cleanFlag) {
      await clearAllTopics();
    }

    let topics: TopicJson[] = [];

   const filePath = fileFlag !== -1 ? args[fileFlag + 1] : undefined;
if (filePath) topics.push(loadTopicFile(filePath));

const dirPath = dirFlag !== -1 ? args[dirFlag + 1] : undefined;
if (dirPath) topics.push(...loadTopicDirectory(dirPath));

    console.log(`\nImporting ${topics.length} topic(s)...`);

    const results: string[] = [];
    for (const topic of topics) {
      const id = await importTopic(topic);
      results.push(id);
    }

    console.log(`\nSuccessfully imported ${results.length} topic(s)`);
  } catch (error) {
    console.error("\nImport failed:", (error as Error).message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
