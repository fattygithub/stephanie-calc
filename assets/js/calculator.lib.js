// Pure logic — used by Jest tests only, not loaded in browser

export function computeExpression(expr) {
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

export function appendToExpr(expr, value) {
  return expr + String(value);
}

export function backspaceExpr(expr) {
  if (expr.endsWith("__E__**")) return expr.slice(0, -7);
  if (expr.endsWith("__E__")) return expr.slice(0, -5);
  return expr.slice(0, -1);
}

export function insertEuler(expr) {
  return expr + "__E__";
}

export function insertEulerPow(expr) {
  return expr + "__E__**";
}

export function formatDisplay(expr) {
  return expr.replace(/__E__\*\*/g, "eˣ·").replace(/__E__/g, "e");
}