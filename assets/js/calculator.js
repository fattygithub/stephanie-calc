// ============================================================
// calculator.js — Daniel Stephanie Ugbedeojo (VUG/SEN/22/7155)
// SEN 482: CI/CD Lab — Unique Feature: Euler's Number (e, e^x)
// ============================================================

var currentExpr = "";

function computeExpression(expr) {
  if (typeof expr !== "string" || expr.trim() === "") {
    throw new Error("Empty expression");
  }
  var safe = expr.replace(/__E__/g, String(Math.E));
  if (!/^[\d\s+\-*/.()\w]+$/.test(safe)) {
    throw new Error("Invalid characters in expression");
  }
  var result = eval(safe);
  if (typeof result !== "number" || !isFinite(result)) {
    throw new Error("Result is not a finite number");
  }
  return result;
}

function appendToExpr(expr, value) {
  return expr + String(value);
}

function backspaceExpr(expr) {
  if (expr.endsWith("__E__**")) return expr.slice(0, -7);
  if (expr.endsWith("__E__")) return expr.slice(0, -5);
  return expr.slice(0, -1);
}

function insertEuler(expr) {
  return expr + "__E__";
}

function insertEulerPow(expr) {
  return expr + "__E__**";
}

function formatDisplay(expr) {
  return expr.replace(/__E__\*\*/g, "e\u02e3\xb7").replace(/__E__/g, "e");
}

function updateDisplay() {
  var el = document.getElementById("expr-display");
  if (!el) return;
  var display = formatDisplay(currentExpr) || "0";
  el.textContent = display;
  el.className = "display-expr";
  if (display.length > 16) el.classList.add("xsmall");
  else if (display.length > 10) el.classList.add("small");
}

function showEulerStrip(msg) {
  var strip = document.getElementById("euler-strip");
  var info = document.getElementById("euler-info");
  if (!strip || !info) return;
  info.textContent = msg;
  strip.style.display = "flex";
}

function hideEulerStrip() {
  var strip = document.getElementById("euler-strip");
  if (strip) strip.style.display = "none";
}

function append(value) {
  currentExpr = appendToExpr(currentExpr, value);
  hideEulerStrip();
  updateDisplay();
}

function backspace() {
  currentExpr = backspaceExpr(currentExpr);
  updateDisplay();
}

function clearResult() {
  currentExpr = "";
  hideEulerStrip();
  updateDisplay();
}

function insertE() {
  currentExpr = insertEuler(currentExpr);
  showEulerStrip("Euler's number e \u2248 2.71828  |  base of natural logarithm");
  updateDisplay();
}

function insertEx() {
  currentExpr = insertEulerPow(currentExpr);
  showEulerStrip("e\u02e3 \u2014 type your exponent then press =");
  updateDisplay();
}

function calculate() {
  if (!currentExpr) return;
  try {
    var result = computeExpression(currentExpr);
    var hint = document.getElementById("display-hint");
    if (hint) hint.textContent = formatDisplay(currentExpr) + " =";
    currentExpr = String(result);
    hideEulerStrip();
    updateDisplay();
  } catch(e) {
    currentExpr = "Error";
    updateDisplay();
    setTimeout(function() { currentExpr = ""; updateDisplay(); }, 1200);
  }
}