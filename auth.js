(function () {
  "use strict";

  const AUTH_KEY = "ct-mastery-authenticated";
  const EXPECTED_HASH = "528e59a070bd94b5f40bb2e3797ae00058fa83dc6d77bea9c019f11d0d45231f";
  const COURSE_SCRIPTS = ["data/core.js", "data/ks3.js", "data/ks4.js", "app.js"];
  const root = document.documentElement;
  const gate = document.getElementById("auth-gate");
  const form = document.getElementById("auth-form");
  const input = document.getElementById("auth-password");
  const message = document.getElementById("auth-message");

  function bytesToHex(buffer) {
    return Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, "0")).join("");
  }

  async function hashPassword(value) {
    const bytes = new TextEncoder().encode(value);
    return bytesToHex(await crypto.subtle.digest("SHA-256", bytes));
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Unable to load ${src}`));
      document.body.appendChild(script);
    });
  }

  async function openCourse() {
    sessionStorage.setItem(AUTH_KEY, "yes");
    gate.hidden = true;
    root.classList.remove("auth-pending");
    for (const src of COURSE_SCRIPTS) await loadScript(src);
    document.getElementById("main")?.focus();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    message.hidden = true;
    const submittedHash = await hashPassword(input.value);
    if (submittedHash !== EXPECTED_HASH) {
      input.value = "";
      input.setAttribute("aria-invalid", "true");
      message.hidden = false;
      input.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    await openCourse();
  }

  form.addEventListener("submit", handleSubmit);

  if (sessionStorage.getItem(AUTH_KEY) === "yes") {
    openCourse().catch(() => {
      sessionStorage.removeItem(AUTH_KEY);
      gate.hidden = false;
      root.classList.add("auth-pending");
      message.textContent = "The course could not be loaded. Refresh the page and try again.";
      message.hidden = false;
    });
  } else {
    input.focus();
  }
})();
