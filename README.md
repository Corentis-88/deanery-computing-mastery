# Computing Teacher Mastery

A complete, sequential subject-knowledge course for a teacher moving from OCR to The Deanery High School's computing curriculum:

- The Deanery's published KS3 sequence across Years 7–9.
- AQA GCSE Computer Science 8525 specification version 1.3, teaching from September 2025 and exams from 2027.
- Python as the deep practical language used by the school, with C# and VB.NET concept/syntax recognition because AQA supports all three.
- 21 units, 84 guided lessons, 42 practical tasks and 210 original mastery questions.
- A strict 80% gate: the next unit unlocks only after 8/10.
- Local browser progress, complete attempt history, recurring-gap analysis and JSON export.
- Original generated illustrations, accessible SVG diagrams and an offline-capable PWA.
- Open-source local tools and downloadable fictional starter files.

This is a learning course and subject-knowledge mastery system, not a paper-technique or exam-cramming guide.

## Run locally

The simplest route is to open `index.html`. For full offline/PWA behaviour, run a local server:

```powershell
python -m http.server 8080
```

Then open http://localhost:8080/.

On Windows, `START_COURSE.bat` performs those two steps for you and does not modify or remove any file.

## Validate

```powershell
node tests/validate-course.js
node --check app.js
node --check data/core.js
node --check data/ks3.js
node --check data/ks4.js
```

## Progress and privacy

Progress remains in the current browser's `localStorage`. The site has no analytics, account, server database or third-party runtime dependency. The export control downloads a copy without removing the stored record. There is intentionally no reset/delete control.

## Curriculum sources

The Sources page links the controlling AQA specification, live qualification page, Deanery KS3/KS4 pages, national curriculum and AQA OCR switching guide. Before planning a later teaching year, compare AQA's live version/date with the course baseline.

See `docs/coverage-map.md` for a section-by-section audit of all Deanery and AQA content.

## Licence

Original code, written course material and diagrams are available under the MIT licence in `LICENSE`. Generated illustrations are included as project assets under the same repository licence to the extent permitted by applicable terms. Third-party applications retain their own licences and are not redistributed in this repository.
