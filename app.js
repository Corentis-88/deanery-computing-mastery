(function () {
  "use strict";

  const course = window.COURSE;
  const app = document.getElementById("app");
  const STORAGE_KEY = "computing-teacher-mastery-progress-v1";
  const DIAGRAMS = {
    "ks3-data-representation:0": ["assets/diagrams/data-representation.svg", "One bit pattern can have different meanings under different representations."],
    "ks4-data:0": ["assets/diagrams/data-representation.svg", "Encoding rules and context determine how a bit pattern is interpreted."],
    "ks4-architecture:2": ["assets/diagrams/fetch-decode-execute.svg", "The CPU repeatedly fetches, decodes and executes instructions from main memory."],
    "ks4-networks:2": ["assets/diagrams/tcp-ip-layers.svg", "The four TCP/IP layers divide network communication into distinct responsibilities."]
  };
  let deferredInstall;

  const escapeHtml = value => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  function getProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.attempts)) return saved;
    } catch (error) {
      console.warn("Progress could not be read", error);
    }
    return { version: 1, created: new Date().toISOString(), attempts: [], lessonVisits: {} };
  }

  function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function bestAttempt(unitId, progress = getProgress()) {
    const attempts = progress.attempts.filter(item => item.unitId === unitId);
    return attempts.sort((a, b) => b.score - a.score || b.timestamp.localeCompare(a.timestamp))[0] || null;
  }

  function isPassed(unitId, progress = getProgress()) {
    const best = bestAttempt(unitId, progress);
    return Boolean(best && best.score >= course.passMark);
  }

  function isUnlocked(index, progress = getProgress()) {
    return index === 0 || isPassed(course.units[index - 1].id, progress);
  }

  function firstOpenIndex(progress = getProgress()) {
    const firstNotPassed = course.units.findIndex((item, index) => isUnlocked(index, progress) && !isPassed(item.id, progress));
    return firstNotPassed === -1 ? course.units.length - 1 : firstNotPassed;
  }

  function routeParts() {
    return location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  }

  function statusFor(unitItem, index, progress) {
    const best = bestAttempt(unitItem.id, progress);
    if (best?.score >= course.passMark) return { label: `Mastered · ${best.score}%`, cls: "status-pass", icon: "✓" };
    if (!isUnlocked(index, progress)) return { label: "Locked", cls: "status-lock", icon: "🔒" };
    if (best) return { label: `Review · best ${best.score}%`, cls: "status-work", icon: "↻" };
    return { label: "Ready", cls: "status-open", icon: "→" };
  }

  function renderHome() {
    const progress = getProgress();
    const passed = course.units.filter(item => isPassed(item.id, progress)).length;
    const currentIndex = firstOpenIndex(progress);
    const current = course.units[currentIndex];
    const totalQuestions = course.units.reduce((sum, item) => sum + item.quiz.length, 0);
    const phases = course.phases.map(phase => {
      const units = course.units.filter(item => item.phase === phase.id);
      return `
        <section aria-labelledby="phase-${phase.id}">
          <div class="phase-heading"><h2 id="phase-${phase.id}">${escapeHtml(phase.label)}</h2><p>${escapeHtml(phase.description)}</p></div>
          <figure class="phase-banner"><img src="assets/images/${phase.id === "ks3" ? "ks3-computing-studio.png" : "ks4-computer-science.png"}" alt="${phase.id === "ks3" ? "Illustrated KS3 computing studio with blocks, microcontroller, spreadsheet and pixel art" : "Illustrated GCSE computer science concepts including algorithms, CPU, data, networks, security and databases"}" loading="lazy"><figcaption>${phase.id === "ks3" ? "Build broad creative and technical foundations." : "Connect the complete updated AQA subject model."}</figcaption></figure>
          <div class="unit-grid">${units.map(unitCard).join("")}</div>
        </section>`;
    }).join("");

    app.innerHTML = `
      <section class="hero">
        <div>
          <p class="eyebrow">Teacher subject-knowledge course</p>
          <h1>Know it well enough to teach it clearly.</h1>
          <p class="lede">Work from the Deanery KS3 curriculum into every topic in the updated AQA 8525 specification. Explanations start from first principles; practical work builds real fluency; each next unit stays locked until you score at least 80%.</p>
          <div class="button-row">
            <a class="button" href="#/unit/${current.id}">${passed ? "Continue" : "Start"}: Unit ${current.order}</a>
            <a class="button-secondary" href="#/progress">View mastery map</a>
          </div>
          <p class="small muted">Python is the Deanery's practical KS4 language. C# and VB.NET are recognised comparatively because AQA supports all three, but the specification does not require one teacher or learner to master all three.</p>
        </div>
        <picture class="hero-art"><img src="assets/images/teacher-computing-journey.png" alt="An illustrated teacher exploring programming, networks, data and physical computing at a workbench" width="1200" height="900"></picture>
      </section>
      <section class="summary-grid" aria-label="Course summary">
        <div class="card stat"><span>Mastered</span><strong>${passed}/${course.units.length}</strong><span class="muted">units</span></div>
        <div class="card stat"><span>Knowledge checks</span><strong>${totalQuestions}</strong><span class="muted">curated questions</span></div>
        <div class="card stat"><span>Pass requirement</span><strong>${course.passMark}%</strong><span class="muted">8 out of 10</span></div>
      </section>
      <div class="progress-track" role="progressbar" aria-label="Overall course progress" aria-valuemin="0" aria-valuemax="${course.units.length}" aria-valuenow="${passed}"><div class="progress-fill" style="width:${passed / course.units.length * 100}%"></div></div>
      ${phases}`;

    function unitCard(unitItem) {
      const index = course.units.indexOf(unitItem);
      const status = statusFor(unitItem, index, progress);
      const unlocked = isUnlocked(index, progress);
      const target = unlocked ? `#/unit/${unitItem.id}` : `#/locked/${unitItem.id}`;
      return `<article class="card unit-card ${unlocked ? "" : "locked"}">
        <span class="unit-number">Unit ${unitItem.order} · ${escapeHtml(unitItem.year)}</span>
        <h3>${escapeHtml(unitItem.title)}</h3>
        <span class="status-pill ${status.cls}"><span aria-hidden="true">${status.icon}</span>${status.label}</span>
        <p>${escapeHtml(unitItem.summary)}</p>
        <a class="${unlocked ? "button" : "button-secondary"}" href="${target}">${unlocked ? "Open unit" : "Why this is locked"}</a>
      </article>`;
    }
  }

  function renderUnit(id) {
    const index = course.units.findIndex(item => item.id === id);
    if (index < 0) return renderNotFound();
    if (!isUnlocked(index)) return renderLocked(id);
    const unitItem = course.units[index];
    const progress = getProgress();
    progress.lessonVisits[id] = (progress.lessonVisits[id] || 0) + 1;
    saveProgress(progress);
    const best = bestAttempt(id, progress);

    app.innerHTML = `
      <div class="breadcrumbs"><a href="#/">Course</a><span>›</span><span>${escapeHtml(unitItem.phase.toUpperCase())}</span><span>›</span><span>Unit ${unitItem.order}</span></div>
      <section class="unit-header">
        <div><p class="eyebrow">Unit ${unitItem.order} · ${escapeHtml(unitItem.year)}</p><h1>${escapeHtml(unitItem.title)}</h1><p class="lede">${escapeHtml(unitItem.summary)}</p></div>
        <aside class="unit-meta"><p><strong>Curriculum mapping</strong></p><p>${escapeHtml(unitItem.mapping)}</p><p><strong>Mastery gate</strong></p><p>Score 8/10 or better. ${best ? `Current best: ${best.score}%.` : "No attempt yet."}</p></aside>
      </section>
      <section><h2>What you will be able to explain and do</h2><ul class="objectives">${unitItem.objectives.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
      <nav class="lesson-nav" aria-label="Lessons in this unit">${unitItem.lessons.map((item, i) => `<a href="#/unit/${id}/lesson-${i + 1}">${i + 1}. ${escapeHtml(item.title)}</a>`).join("")}<a href="#/unit/${id}/practical-work">Practical work</a></nav>
      ${unitItem.lessons.map(renderLesson).join("")}
      <section id="practical-work"><h2>Practical work</h2><p>Do both tasks. They are not mechanically tracked: the evidence is your finished file and your ability to explain every decision.</p>${unitItem.tasks.map(renderTask).join("")}</section>
      <section class="card"><h2>Ready for the mastery check?</h2><p>Ten questions cover the entire unit. You need at least 8/10. If you miss the threshold, the feedback points you back to named concepts and the next unit remains locked.</p><div class="button-row"><a class="button" href="#/quiz/${unitItem.id}">${best ? "Retake mastery check" : "Take mastery check"}</a><a class="button-secondary" href="#/">Return to course</a></div></section>`;

    function renderLesson(item, lessonIndex) {
      const diagram = DIAGRAMS[`${unitItem.id}:${lessonIndex}`];
      const side = [
        item.bullets ? `<div><h3>Key points</h3><ul>${item.bullets.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul></div>` : "",
        item.misconception ? `<div class="callout warning"><strong>Common misconception</strong><p>${escapeHtml(item.misconception)}</p></div>` : "",
        item.teacher ? `<div class="callout teacher"><strong>Teacher lens</strong><p>${escapeHtml(item.teacher)}</p></div>` : ""
      ].join("");
      return `<article class="lesson" id="lesson-${lessonIndex + 1}"><p class="eyebrow">Lesson ${lessonIndex + 1} of ${unitItem.lessons.length}</p><h2>${escapeHtml(item.title)}</h2><div class="lesson-body"><div>${item.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("")}${diagram ? `<figure class="diagram"><img src="${diagram[0]}" alt=""><figcaption>${escapeHtml(diagram[1])}</figcaption></figure>` : ""}${item.example ? `<div class="worked"><strong>Worked example</strong><p>${escapeHtml(item.example)}</p></div>` : ""}</div><aside>${side}</aside></div></article>`;
    }

    function renderTask(task, taskIndex) {
      return `<article class="card task"><div class="task-meta"><span>Task ${taskIndex + 1}</span><span>${escapeHtml(task.tool)}</span><span>${escapeHtml(task.time)}</span></div><h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.brief)}</p><ol>${task.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol><p><strong>Success looks like:</strong> ${escapeHtml(task.success)}</p>${task.download ? `<p><a class="button-secondary" href="${escapeHtml(task.download)}" download>Download starter</a></p>` : ""}</article>`;
    }
  }

  function seededShuffle(items, seedText) {
    const result = [...items];
    let seed = 2166136261;
    for (const char of seedText) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619) >>> 0;
    for (let i = result.length - 1; i > 0; i--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const j = seed % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function renderQuiz(id) {
    const index = course.units.findIndex(item => item.id === id);
    if (index < 0) return renderNotFound();
    if (!isUnlocked(index)) return renderLocked(id);
    const unitItem = course.units[index];
    const attemptNumber = getProgress().attempts.filter(item => item.unitId === id).length + 1;
    app.innerHTML = `
      <div class="breadcrumbs"><a href="#/">Course</a><span>›</span><a href="#/unit/${id}">Unit ${unitItem.order}</a><span>›</span><span>Mastery check</span></div>
      <section class="quiz-intro"><p class="eyebrow">Unit ${unitItem.order} mastery check</p><h1>${escapeHtml(unitItem.title)}</h1><p class="lede">Answer all ten questions. This is attempt ${attemptNumber}; options are reordered on later attempts. You need 8/10. Your best score and each attempt are retained.</p></section>
      <form id="quiz-form" novalidate>${unitItem.quiz.map((question, questionIndex) => {
        const options = seededShuffle([question.correct, ...question.wrong], `${id}-${attemptNumber}-${questionIndex}`);
        return `<fieldset class="quiz-question"><legend>${questionIndex + 1}. ${escapeHtml(question.prompt)}</legend>${options.map((option, optionIndex) => `<label class="option"><input type="radio" name="q${questionIndex}" value="${escapeHtml(option)}"><span><strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${escapeHtml(option)}</span></label>`).join("")}</fieldset>`;
      }).join("")}<p id="quiz-error" class="text-destructive" role="alert"></p><button class="quiz-submit" type="submit">Mark all answers</button></form>`;
    document.getElementById("quiz-form").addEventListener("submit", event => submitQuiz(event, unitItem, attemptNumber));
  }

  function submitQuiz(event, unitItem, attemptNumber) {
    event.preventDefault();
    const form = event.currentTarget;
    const answers = unitItem.quiz.map((question, index) => form.elements[`q${index}`].value || null);
    const missing = answers.map((value, index) => value ? null : index + 1).filter(Boolean);
    if (missing.length) {
      const error = document.getElementById("quiz-error");
      error.textContent = `Please answer question${missing.length === 1 ? "" : "s"} ${missing.join(", ")} before marking.`;
      form.querySelector(`[name="q${missing[0] - 1}"]`).focus();
      return;
    }
    const reviews = answers.map((answer, index) => ({
      prompt: unitItem.quiz[index].prompt,
      chosen: answer,
      correct: unitItem.quiz[index].correct,
      explanation: unitItem.quiz[index].explanation,
      concept: unitItem.quiz[index].concept,
      right: answer === unitItem.quiz[index].correct
    }));
    const correctCount = reviews.filter(item => item.right).length;
    const score = correctCount * 10;
    const progress = getProgress();
    progress.attempts.push({ unitId: unitItem.id, attempt: attemptNumber, timestamp: new Date().toISOString(), score, correctCount, conceptsToReview: reviews.filter(item => !item.right).map(item => item.concept) });
    saveProgress(progress);
    const passed = score >= course.passMark;
    const index = course.units.findIndex(item => item.id === unitItem.id);
    const next = course.units[index + 1];
    app.innerHTML = `
      <div class="breadcrumbs"><a href="#/">Course</a><span>›</span><a href="#/unit/${unitItem.id}">Unit ${unitItem.order}</a><span>›</span><span>Result</span></div>
      <section class="quiz-result ${passed ? "pass" : "retry"}"><p class="eyebrow">${passed ? "Mastery achieved" : "Review needed"}</p><h1>${score}%</h1><p class="lede">${correctCount}/10 correct. ${passed ? (next ? `Unit ${next.order} is now unlocked.` : "You have mastered the complete course sequence.") : "The next unit remains locked until you reach 80%."}</p><div class="button-row">${passed && next ? `<a class="button" href="#/unit/${next.id}">Open next unit</a>` : `<a class="button" href="#/unit/${unitItem.id}">Review this unit</a>`}<a class="button-secondary" href="#/quiz/${unitItem.id}">Try another attempt</a><a class="button-secondary" href="#/progress">View progress</a></div></section>
      <section><h2>Answer review</h2>${reviews.map((item, i) => `<article class="review-item ${item.right ? "correct" : ""}"><h3>${i + 1}. ${escapeHtml(item.prompt)}</h3><p><strong>Your answer:</strong> ${escapeHtml(item.chosen)} ${item.right ? "✓" : "✗"}</p>${item.right ? "" : `<p><strong>Correct answer:</strong> ${escapeHtml(item.correct)}</p>`}<p>${escapeHtml(item.explanation)}</p><p class="small"><strong>Concept:</strong> ${escapeHtml(item.concept)}</p></article>`).join("")}</section>`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderLocked(id) {
    const index = course.units.findIndex(item => item.id === id);
    if (index < 0) return renderNotFound();
    const unitItem = course.units[index];
    const required = course.units[index - 1];
    const best = required ? bestAttempt(required.id) : null;
    app.innerHTML = `<section class="hero"><div><p class="eyebrow">Mastery gate</p><h1>Unit ${unitItem.order} is locked.</h1><p class="lede">First score at least 80% on Unit ${required.order}: ${escapeHtml(required.title)}. ${best ? `Your current best is ${best.score}%.` : "You have not attempted its check yet."}</p><div class="button-row"><a class="button" href="#/unit/${required.id}">Return to required unit</a><a class="button-secondary" href="#/">Course overview</a></div></div><div class="card"><h2>Why the gate exists</h2><p>Later explanations assume the earlier vocabulary and mental models. The gate records mastery without erasing earlier attempts; it is intentionally not bypassable through navigation.</p></div></section>`;
  }

  function renderProgress() {
    const progress = getProgress();
    const passed = course.units.filter(item => isPassed(item.id, progress)).length;
    const attempts = progress.attempts.length;
    const weakConcepts = progress.attempts.flatMap(item => item.conceptsToReview || []).reduce((map, concept) => map.set(concept, (map.get(concept) || 0) + 1), new Map());
    const ranked = [...weakConcepts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    app.innerHTML = `
      <p class="eyebrow">Your retained learning record</p><h1>Mastery map</h1><p class="lede">This view uses your browser's local storage. Attempts are appended rather than replaced, so improvement remains visible.</p>
      <section class="stats-grid"><div class="card stat"><span>Mastered</span><strong>${passed}</strong><span>of ${course.units.length} units</span></div><div class="card stat"><span>Attempts</span><strong>${attempts}</strong><span>all retained</span></div><div class="card stat"><span>Unlocked</span><strong>${course.units.filter((_, i) => isUnlocked(i, progress)).length}</strong><span>sequentially</span></div><div class="card stat"><span>Completion</span><strong>${Math.round(passed / course.units.length * 100)}%</strong><span>by unit gates</span></div></section>
      <section><h2>Course route</h2><div class="roadmap">${course.units.map((item, index) => {
        const best = bestAttempt(item.id, progress); const passedItem = best?.score >= course.passMark; const current = isUnlocked(index, progress) && !passedItem;
        return `<div class="roadmap-item ${passedItem ? "passed" : current ? "current" : ""}"><span class="roadmap-dot">${passedItem ? "✓" : item.order}</span><span><strong>${escapeHtml(item.title)}</strong><br><span class="small muted">${escapeHtml(item.year)}</span></span><span>${best ? `Best ${best.score}% · ${progress.attempts.filter(a => a.unitId === item.id).length} attempt(s)` : isUnlocked(index, progress) ? "Ready" : "Locked"}</span></div>`;
      }).join("")}</div></section>
      <section class="tool-grid"><div class="card"><h2>Recurring review signals</h2>${ranked.length ? `<ol>${ranked.map(([concept, count]) => `<li>${escapeHtml(concept)} — missed ${count} time${count === 1 ? "" : "s"}</li>`).join("")}</ol>` : "<p>No missed concepts recorded yet. Complete a mastery check to populate this list.</p>"}</div><div class="card"><h2>Keep your own copy</h2><p>Export a timestamped JSON learning record for your future training-course project or personal backup. Exporting does not remove browser progress.</p><button class="button" id="export-progress">Export progress</button></div></section>
      <section><h2>Attempt history</h2>${progress.attempts.length ? `<div class="table-responsive"><table class="table"><thead><tr><th>Date</th><th>Unit</th><th>Score</th><th>Review</th></tr></thead><tbody>${[...progress.attempts].reverse().map(item => `<tr><td>${new Date(item.timestamp).toLocaleString("en-GB")}</td><td>${escapeHtml(course.units.find(unitItem => unitItem.id === item.unitId)?.title || item.unitId)}</td><td>${item.score}%</td><td>${escapeHtml((item.conceptsToReview || []).join(", ") || "None")}</td></tr>`).join("")}</tbody></table></div>` : "<p>No attempts yet.</p>"}</section>`;
    document.getElementById("export-progress").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), courseVersion: course.version, ...progress }, null, 2)], { type: "application/json" });
      const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `computing-mastery-progress-${new Date().toISOString().slice(0, 10)}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    });
  }

  function renderToolkit() {
    app.innerHTML = `<p class="eyebrow">Open-source practical environment</p><h1>Local toolkit</h1><p class="lede">These tools cover the course activities without a paid software dependency. The repository also includes an auditable installer script and starter files; browser tools remain optional.</p><div class="tool-grid">${course.toolkit.map(tool => `<article class="card"><span class="status-pill ${tool.installed ? "status-pass" : "status-open"}">${tool.installed ? "Installed locally" : tool.downloaded ? "Installer downloaded locally" : "Optional / browser"}</span><h2>${escapeHtml(tool.name)}</h2><p><strong>Use:</strong> ${escapeHtml(tool.use)}</p><p>${escapeHtml(tool.note)}</p><p class="small muted">Licence: ${escapeHtml(tool.licence)}</p><a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener">Official project site ↗</a></article>`).join("")}</div><section class="card"><h2>Installation record</h2><p>See <a href="docs/software-toolkit.md">the local software guide</a> for versions, package IDs, activity mapping and safety notes. The PowerShell installer never uninstalls software and skips packages already present.</p><a class="button-secondary" href="install-open-source-tools.ps1" download>Download installer script</a></section>`;
  }

  function renderSources() {
    app.innerHTML = `<p class="eyebrow">Scope and provenance</p><h1>Curriculum sources</h1><p class="lede">The controlling AQA document is version 1.3, dated 16 June 2025, for teaching from September 2025 and exams from 2027. Nothing from the updated 2027 content has been excluded.</p><section class="card"><h2>What this course covers</h2><p>Units 1–11 implement the Deanery's published Year 7–9 sequence through safe, open-source practical routes. Units 12–21 follow AQA sections 3.1–3.8 in specification order. The learning focus is teachable subject knowledge, not paper technique.</p><p><strong>Programming-language position:</strong> AQA supports C#, Python 3 and VB.NET from 2027, and a candidate writes program code in one supported language. The Deanery publishes Python as its KS4 route. Therefore this course develops deep Python fluency, teaches the language-independent constructs, and includes a recognition/translation guide for C# and VB.NET; it does not pretend equal fluency in all three is required.</p></section><ol class="source-list">${course.sources.map(source => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener"><strong>${escapeHtml(source.title)}</strong> ↗</a><br>${escapeHtml(source.note)}</li>`).join("")}</ol><section class="callout warning"><strong>Version discipline</strong><p>AQA says its live subject page contains the most up-to-date specification. Before planning a new teaching year, compare the displayed version/date with this course's stated v1.3 baseline.</p></section>`;
  }

  function renderNotFound() {
    app.innerHTML = `<section class="hero"><div><p class="eyebrow">Not found</p><h1>That page is not in this course.</h1><a class="button" href="#/">Return to course</a></div></section>`;
  }

  function render() {
    const [section, id, anchor] = routeParts();
    if (!section) renderHome();
    else if (section === "unit") renderUnit(id);
    else if (section === "quiz") renderQuiz(id);
    else if (section === "locked") renderLocked(id);
    else if (section === "progress") renderProgress();
    else if (section === "toolkit") renderToolkit();
    else if (section === "sources") renderSources();
    else renderNotFound();
    document.title = `${app.querySelector("h1")?.textContent || "Computing Teacher Mastery"} · CT Mastery`;
    if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    else window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault(); deferredInstall = event; const button = document.getElementById("install-app"); button.hidden = false;
    button.addEventListener("click", async () => { deferredInstall.prompt(); await deferredInstall.userChoice; deferredInstall = null; button.hidden = true; }, { once: true });
  });
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
  render();
})();
