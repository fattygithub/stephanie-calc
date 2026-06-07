import {
  computeExpression,
  appendToExpr,
  backspaceExpr,
  insertEuler,
  insertEulerPow,
  formatDisplay,
} from "../assets/js/calculator.js";

// ── Basic arithmetic ──────────────────────────────────────────

test("adds two numbers", () => {
  expect(computeExpression("2+3")).toBe(5);
});

test("subtracts two numbers", () => {
  expect(computeExpression("10-4")).toBe(6);
});

test("multiplies two numbers", () => {
  expect(computeExpression("6*7")).toBe(42);
});

test("divides two numbers", () => {
  expect(computeExpression("20/4")).toBe(5);
});

test("handles decimal arithmetic", () => {
  expect(computeExpression("0.1+0.2")).toBeCloseTo(0.3);
});

test("throws on empty expression", () => {
  expect(() => computeExpression("")).toThrow("Empty expression");
});

test("throws on division by zero (returns Infinity)", () => {
  expect(() => computeExpression("1/0")).toThrow();
});

// ── appendToExpr ──────────────────────────────────────────────

test("appends a digit to empty expression", () => {
  expect(appendToExpr("", "5")).toBe("5");
});

test("appends operator to expression", () => {
  expect(appendToExpr("5", "+")).toBe("5+");
});

// ── backspaceExpr ─────────────────────────────────────────────

test("removes last character", () => {
  expect(backspaceExpr("123")).toBe("12");
});

test("removes full __E__ token on backspace", () => {
  expect(backspaceExpr("2+__E__")).toBe("2+");
});

test("removes full __E__** token on backspace", () => {
  expect(backspaceExpr("__E__**")).toBe("");
});

// ── Euler unique feature ──────────────────────────────────────

test("insertEuler appends __E__ token", () => {
  expect(insertEuler("2*")).toBe("2*__E__");
});

test("insertEulerPow appends __E__** token", () => {
  expect(insertEulerPow("")).toBe("__E__**");
});

test("computeExpression evaluates e correctly", () => {
  expect(computeExpression("__E__")).toBeCloseTo(Math.E);
});

test("computeExpression evaluates e+1 correctly", () => {
  expect(computeExpression("__E__+1")).toBeCloseTo(Math.E + 1);
});

test("computeExpression evaluates e**2 correctly", () => {
  expect(computeExpression("__E__**2")).toBeCloseTo(Math.E ** 2);
});

test("computeExpression evaluates e**0 equals 1", () => {
  expect(computeExpression("__E__**0")).toBe(1);
});

// ── formatDisplay ─────────────────────────────────────────────

test("formatDisplay replaces __E__ with e", () => {
  expect(formatDisplay("2+__E__")).toBe("2+e");
});

test("formatDisplay replaces __E__** with eˣ·", () => {
  expect(formatDisplay("__E__**3")).toBe("eˣ·3");
});

test("formatDisplay returns plain expression unchanged", () => {
  expect(formatDisplay("123+456")).toBe("123+456");
});