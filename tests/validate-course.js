"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

global.window = global;
require(path.resolve("data/core.js"));
require(path.resolve("data/ks3.js"));
require(path.resolve("data/ks4.js"));

const course = global.COURSE;
assert.equal(course.passMark, 80, "Pass mark must remain 80%");
assert.equal(course.units.length, 21, "Expected 21 course units");
assert.equal(course.units.filter(unit => unit.phase === "ks3").length, 11, "Expected 11 KS3 units");
assert.equal(course.units.filter(unit => unit.phase === "ks4").length, 10, "Expected 10 KS4 units");

const ids = new Set();
const prompts = new Set();
let questionCount = 0;
for (const [index, unit] of course.units.entries()) {
  assert.equal(unit.order, index + 1, `Bad order for ${unit.id}`);
  assert(!ids.has(unit.id), `Duplicate id ${unit.id}`); ids.add(unit.id);
  assert.equal(unit.lessons.length, 4, `${unit.id} must have four guided lessons`);
  assert.equal(unit.tasks.length, 2, `${unit.id} must have two practical tasks`);
  assert.equal(unit.quiz.length, 10, `${unit.id} must have ten questions`);
  assert(unit.objectives.length >= 5, `${unit.id} needs at least five objectives`);
  for (const question of unit.quiz) {
    questionCount += 1;
    assert(!prompts.has(question.prompt), `Duplicate question: ${question.prompt}`); prompts.add(question.prompt);
    assert.equal(question.wrong.length, 3, `Question needs three distractors: ${question.prompt}`);
    assert.equal(new Set([question.correct, ...question.wrong]).size, 4, `Options must be unique: ${question.prompt}`);
    assert(question.explanation.length >= 20, `Explanation too short: ${question.prompt}`);
    assert(question.concept, `Concept missing: ${question.prompt}`);
  }
  for (const task of unit.tasks) {
    if (task.download) assert(fs.existsSync(path.resolve(task.download)), `Missing starter: ${task.download}`);
  }
}
assert.equal(questionCount, 210, "Expected 210 questions");

const ks4Mappings = course.units.filter(unit => unit.phase === "ks4").map(unit => unit.mapping).join(" ");
for (const section of ["3.1", "3.2.1", "3.2.10", "3.3", "3.4.1", "3.4.4", "3.5", "3.6", "3.7", "3.8"]) {
  assert(ks4Mappings.includes(section), `AQA mapping missing ${section}`);
}

for (const asset of [
  "assets/images/teacher-computing-journey.png", "assets/images/ks3-computing-studio.png", "assets/images/ks4-computer-science.png",
  "assets/diagrams/data-representation.svg", "assets/diagrams/fetch-decode-execute.svg", "assets/diagrams/tcp-ip-layers.svg"
]) assert(fs.existsSync(path.resolve(asset)), `Missing asset: ${asset}`);

console.log(`PASS: ${course.units.length} units, ${questionCount} unique questions, all starters/assets present.`);
