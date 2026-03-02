// src/index.ts
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function chunk(arr, size) {
  if (size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function isDefined(value) {
  return value !== null && value !== void 0;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { capitalize, chunk, clamp, isDefined, sleep };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map