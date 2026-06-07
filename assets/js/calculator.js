// ============================================================
// calculator.js — Daniel Stephanie Ugbedeojo (VUG/SEN/22/7155)
// SEN 482: CI/CD Lab — Unique Feature: Euler's Number (e, e^x)
// ============================================================

// ---------------------------------------------------------------
// PURE LOGIC — exported for Jest unit tests
// ---------------------------------------------------------------

function computeExpression(expr) {
  if (typeof expr !== "string" || expr.trim() === "") {
    throw new Error("Empty expression");
  }
  const safe = expr.replace(/__E__/g, String(Math.E));
  if (!/^[\d\s+\-*/.()\w]+$/.test(safe)) {
    throw new Error("Invalid characters in expression");
  }
  // eslint-disable-next-line no-eval
  const result = eval(safe);
  if (typeof result !== "number" || !isFinite(result)) {
    throw new Error("Result is not a finite number");
  }
  return result;
}

function appendToExpr(expr, value) {
  return expr + String(value);
}

function backspaceExpr(expr) {
  if (expr.endsWith("__E__")) return expr.slice(0, -5);
  if (expr.endsWith("__E__**")) return expr.slice(0, -7);
  return expr.slice(0, -1);
}

function insertEuler(expr) {
  return expr + "__E__";
}

function insertEulerPow(expr) {
  return expr + "__E__**";
}

function formatDisplay(expr) {
  return expr.replace(/__E__\*\*/g, "eˣ·").replace(/__E__/g, "e");
}

// ---------------------------------------------------------------
// BROWSER UI — only runs in browser
// ---------------------------------------------------------------

/* istanbul ignore next */
if (typeof window !== "undefined") {
  let currentExpr = "";

  function updateDisplay() {
    const el = document.getElementById("expr-display");
    if (!el) return;
    const display = formatDisplay(currentExpr) || "0";
    el.textContent = display;
    el.className = "display-expr";
    if (display.length > 16) el.classList.add("xsmall");
    else if (display.length > 10) el.classList.add("small");
  }

  function showEulerStrip(msg) {
    const strip = document.getElementById("euler-strip");
    const info = document.getElementById("euler-info");
    if (!strip || !info) return;
    info.textContent = msg;
    strip.style.display = "flex";
  }

  function hideEulerStrip() {
    const strip = document.getElementById("euler-strip");
    if (strip) strip.style.display = "none";
  }

  window.append = function (value) {
    currentExpr = appendToExpr(currentExpr, value);
    hideEulerStrip();
    updateDisplay();
  };

  window.backspace = function () {
    currentExpr = backspaceExpr(currentExpr);
    updateDisplay();
  };

  window.clearResult = function () {
    currentExpr = "";
    hideEulerStrip();
    updateDisplay();
  };

  window.insertE = function () {
    currentExpr = insertEuler(currentExpr);
    showEulerStrip("Euler's number e ≈ 2.71828  |  base of natural logarithm");
    updateDisplay();
  };

  window.insertEx = function () {
    currentExpr = insertEulerPow(currentExpr);
    showEulerStrip("eˣ — type your exponent then press =");
    updateDisplay();
  };

  window.calculate = function () {
    if (!currentExpr) return;
    try {
      const result = computeExpression(currentExpr);
      const hint = document.getElementById("display-hint");
      if (hint) hint.textContent = formatDisplay(currentExpr) + " =";
      currentExpr = String(result);
      hideEulerStrip();
      updateDisplay();
    } catch {
      currentExpr = "Error";
      updateDisplay();
      setTimeout(() => {
        currentExpr = "";
        updateDisplay();
      }, 1200);
    }
  };
}

// ---------------------------------------------------------------
// CommonJS export for Jest
// ---------------------------------------------------------------

/* istanbul ignore next */
export {
  computeExpression,
  appendToExpr,
  backspaceExpr,
  insertEuler,
  insertEulerPow,
  formatDisplay,
};
