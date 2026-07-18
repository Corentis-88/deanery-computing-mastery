(function () {
  "use strict";

  const course = window.COURSE = {
    version: "1.0.0",
    passMark: 80,
    units: [],
    phases: [
      { id: "ks3", label: "KS3 foundations", description: "The Deanery's Year 7–9 sequence, taught through open-source equivalents where useful." },
      { id: "ks4", label: "KS4 subject mastery", description: "Every content area in AQA GCSE Computer Science 8525, specification v1.3 for exams from 2027." }
    ],
    sources: [
      {
        title: "AQA GCSE Computer Science 8525 specification, version 1.3",
        url: "https://www.aqa.org.uk/files/d83d2e0a-9266-42c6-9eed-08194ae26a9e/28f4f0d160b28d28dce8fb3b50304bbdbd305b1d.pdf",
        note: "The controlling KS4 curriculum source: teaching from September 2025 and exams from 2027. Sections 3.1–3.8 are mapped across Units 10–18."
      },
      {
        title: "AQA GCSE Computer Science (8525) subject page",
        url: "https://www.aqa.org.uk/subjects/computer-science-and-it/gcse/computer-science-8525",
        note: "The live qualification page should be checked for later specification versions, resources and administrative updates."
      },
      {
        title: "The Deanery High School — Computing KS3",
        url: "https://www.deanery.wigan.sch.uk/curriculum-vision/computing-ks3/",
        note: "Used to map the Year 7–9 sequence: digital literacy, networks, Scratch, spreadsheets, representation, online responsibility, Python, Photopea, App Lab, algorithms, Tkinter, Blender and micro:bit."
      },
      {
        title: "The Deanery High School — Computer Science KS4",
        url: "https://www.deanery.wigan.sch.uk/ks4/computer-science-ks4/",
        note: "Confirms AQA 8525 and the school's emphasis on basic, advanced, robust and secure Python plus SQL."
      },
      {
        title: "AQA switching guide from OCR GCSE Computer Science (May 2026)",
        url: "https://www.aqa.org.uk/files/002e119b-f716-49ab-aaa7-fa31a0c5abcd/a0e149eda403e0fd4f85fbf11988711fd5a4442f.pdf",
        note: "Used to flag likely transition gaps without turning the course into paper-technique coaching."
      },
      {
        title: "National curriculum in England: computing programmes of study",
        url: "https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study",
        note: "The statutory KS3 baseline for algorithms, programming, Boolean logic, hardware/software, digital artefacts and safe/responsible use."
      }
    ],
    toolkit: [
      { name: "Thonny", use: "Python and micro:bit programming", licence: "MIT", installed: true, url: "https://thonny.org/", note: "Simple debugger and variable view; use for every Python practical." },
      { name: "TurboWarp Desktop", use: "Scratch-compatible block programming", licence: "GPL-3.0", installed: true, url: "https://desktop.turbowarp.org/", note: "Open-source Scratch-compatible editor for offline KS3 work." },
      { name: "LibreOffice Calc", use: "Spreadsheets and CSV files", licence: "MPL-2.0", installed: true, url: "https://www.libreoffice.org/", note: "Use Calc rather than relying on a paid office subscription." },
      { name: "Krita", use: "Raster graphics and image representation", licence: "GPL-3.0", installed: true, url: "https://krita.org/", note: "Open-source alternative for transferable Photopea skills." },
      { name: "Blender", use: "3D modelling and animation", licence: "GPL", installed: true, url: "https://www.blender.org/", note: "Matches the Deanery Year 9 animation topic." },
      { name: "DB Browser for SQLite", use: "Relational databases and SQL", licence: "MPL-2.0/GPL-3.0", installed: false, downloaded: true, url: "https://sqlitebrowser.org/", note: "Official hash-verified installer is downloaded locally; run it when ready to use the SQL practical." },
      { name: "diagrams.net Desktop", use: "Flowcharts, networks and system diagrams", licence: "Apache-2.0", installed: false, downloaded: true, url: "https://www.diagrams.net/", note: "Official hash-verified installer is downloaded locally; browser diagrams.net also works immediately." },
      { name: "Wireshark", use: "Inspect your own network traffic", licence: "GPL-2.0", installed: false, url: "https://www.wireshark.org/", note: "Optional. Only capture traffic on systems and networks where you have permission." },
      { name: "micro:bit Python Editor", use: "Physical computing", licence: "Open source / web", installed: false, url: "https://python.microbit.org/", note: "Runs in a browser; hardware is optional because the simulator covers the core ideas." }
    ]
  };

  course.unit = function unit(config) {
    if (!config.quiz || config.quiz.length !== 10) {
      throw new Error(`${config.id} must contain exactly 10 end-of-unit questions.`);
    }
    config.order = course.units.length + 1;
    course.units.push(config);
  };

  course.lesson = function lesson(title, paragraphs, extras = {}) {
    return { title, paragraphs, ...extras };
  };

  course.q = function question(prompt, correct, wrong, explanation, concept) {
    return { prompt, correct, wrong, explanation, concept };
  };
})();
