const fs = require("fs");
const path = require("path");

const tokensPath = path.join(__dirname, "../global-tokens/tokens.json");
const outputPath = path.join(__dirname, "../converted-token/global-token.css");

const raw = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));

// Build a flat map of all token values for reference resolution
const tokenMap = {};

function buildTokenMap(obj, prefix = "") {
  for (const [key, val] of Object.entries(obj)) {
    if (key === "$value" || key === "$type" || key === "$description") continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && "$value" in val) {
      tokenMap[path] = val;
    } else if (val && typeof val === "object") {
      buildTokenMap(val, path);
    }
  }
}

// Build from raw.core so paths are "dimension.xs" not "core.dimension.xs"
buildTokenMap(raw.core || raw, "");

// Resolve references recursively, returning a pure number/string (no units)
function resolveToNumber(val, depth = 0) {
  if (depth > 20) return val;
  if (typeof val !== "string") return val;

  // Resolve all {ref} placeholders
  let result = val.replace(/\{([^}]+)\}/g, (match, ref) => {
    const token = tokenMap[ref];
    if (token) {
      return String(resolveToNumber(String(token.$value), depth + 1));
    }
    return match;
  });

  // Handle roundTo(expr) - just evaluate the inner expression
  const roundToMatch = result.match(/^roundTo\((.+)\)$/i);
  if (roundToMatch) {
    result = roundToMatch[1];
  }

  // Check if the result looks like a math expression (has operators)
  const hasOperators = /[\^*/+\-]/.test(result);

  if (hasOperators) {
    // Evaluate math: handle ^ as power, * and /
    const mathClean = result.replace(/\s+/g, "").replace(/\^/g, "**");
    if (/^[\d.+\-*/()**]+$/.test(mathClean)) {
      try {
        const computed = Function(`"use strict"; return (${mathClean})`)();
        return Math.round(computed * 100) / 100;
      } catch (e) {}
    }
  }

  return result;
}

// Resolve font weight names to numbers
function resolveFontWeight(val) {
  const map = {
    thin: "100",
    extralight: "200",
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  };
  return map[String(val).toLowerCase()] || String(val);
}

// Format a resolved value based on type
function formatCssValue(resolved, type) {
  if (type === "color") return resolved;
  if (type === "opacity") return resolved;
  if (type === "fontFamilies") return `'${resolved}', sans-serif`;
  if (type === "fontWeights") return resolveFontWeight(resolved);

  if (type === "fontSizes" || type === "dimension") {
    return `${resolved}px`;
  }

  if (type === "borderRadius") {
    const parts = String(resolved).split(/\s+/);
    return parts.map((p) => `${p}px`).join(" ");
  }

  if (type === "spacing") {
    const parts = String(resolved).split(/\s+/);
    return parts.map((p) => `${p}px`).join(" ");
  }

  if (type === "lineHeights") {
    const s = String(resolved);
    if (s.includes("%")) return s;
    return `${resolved}px`;
  }

  if (type === "letterSpacing") {
    const s = String(resolved);
    if (s.includes("%")) return s;
    if (resolved === 0 || resolved === "0") return "0em";
    return `${resolved}em`;
  }

  if (type === "paragraphSpacing") {
    return `${resolved}px`;
  }

  return resolved;
}

// Convert camelCase/PascalCase to kebab-case
function toKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9\-]/gi, "-")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Collect all color tokens recursively
function collectAllColors(obj, prefix = "") {
  const result = {};
  if (!obj) return result;
  for (const [key, val] of Object.entries(obj)) {
    if (key === "$value" || key === "$type" || key === "$description") continue;
    const path = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === "object" && "$value" in val && val.$type === "color") {
      result[toKebab(path)] = String(val.$value);
    } else if (val && typeof val === "object") {
      Object.assign(result, collectAllColors(val, path));
    }
  }
  return result;
}

// Collect nested token groups
function collectNestedGroup(obj, prefix = "") {
  const result = {};
  if (!obj) return result;
  for (const [key, val] of Object.entries(obj)) {
    if (key === "$value" || key === "$type" || key === "$description") continue;
    const path = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === "object" && "$value" in val) {
      const resolved = resolveToNumber(String(val.$value));
      const formatted = formatCssValue(resolved, val.$type);
      result[toKebab(path)] = formatted;
    } else if (val && typeof val === "object") {
      Object.assign(result, collectNestedGroup(val, path));
    }
  }
  return result;
}

// Collect typography composite tokens
function collectTypography(obj, sectionName) {
  const result = {};
  if (!obj) return result;
  for (const [key, val] of Object.entries(obj)) {
    if (key === "$value" || key === "$type" || key === "$description") continue;
    const name = `${sectionName}-${key}`;
    if (val && typeof val === "object" && "$value" in val && val.$type === "typography") {
      const tv = val.$value;
      const resolved = {
        fontFamily: resolveToNumber(String(tv.fontFamily)),
        fontWeight: resolveToNumber(String(tv.fontWeight)),
        lineHeight: resolveToNumber(String(tv.lineHeight)),
        fontSize: resolveToNumber(String(tv.fontSize)),
        letterSpacing: resolveToNumber(String(tv.letterSpacing)),
      };
      result[toKebab(name)] = resolved;
    } else if (val && typeof val === "object") {
      Object.assign(result, collectTypography(val, name));
    }
  }
  return result;
}

// Collect box shadow tokens
function collectBoxShadow(obj, prefix = "") {
  const result = {};
  if (!obj) return result;
  for (const [key, val] of Object.entries(obj)) {
    if (key === "$value" || key === "$type" || key === "$description") continue;
    const path = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === "object" && "$value" in val && val.$type === "boxShadow") {
      const sv = val.$value;
      if (typeof sv === "object") {
        result[toKebab(path)] = `${sv.x}px ${sv.y}px ${sv.blur}px ${sv.spread}px ${sv.color}`;
      }
    } else if (val && typeof val === "object") {
      Object.assign(result, collectBoxShadow(val, path));
    }
  }
  return result;
}

// Build all groups
const core = raw.core || {};

const colors = {
  ...collectAllColors(core.colors, "color"),
  ...collectAllColors(core.Gray, "color-gray"),
  ...collectAllColors(core.Primary, "color-primary"),
  ...collectAllColors(core.Secondary, "color-secondary"),
  ...collectAllColors(core.Success, "color-success"),
  ...collectAllColors(core.Warning, "color-warning"),
  ...collectAllColors(core.Danger, "color-danger"),
};

const spacing = collectNestedGroup(core.spacing, "spacing");
const borderRadius = collectNestedGroup(core.borderRadius, "radius");
const opacity = collectNestedGroup(core.opacity, "opacity");
const fontFamily = collectNestedGroup(core.fontFamilies, "font-family");
const fontWeight = collectNestedGroup(core.fontWeights, "font-weight");
const fontSize = {
  ...collectNestedGroup(core.fontSizes, "text"),
  ...collectNestedGroup(core.fontSize, "text"),
};
const lineHeight = collectNestedGroup(core.lineHeights, "leading");
const letterSpacing = collectNestedGroup(core.letterSpacing, "tracking");
const paragraphSpacing = collectNestedGroup(core.paragraphSpacing, "para-spacing");
const boxShadow = collectBoxShadow(core, "shadow");

// Typography composites
const displayTypo = collectTypography(core.Display, "display");
const headingTypo = collectTypography(core.Heading, "heading");
const labelTypo = collectTypography(core.Label, "label");
const bodyTypo = collectTypography(core.Body, "body");

// Generate CSS
function writeVars(vars, indent = "    ") {
  let out = "";
  for (const [k, v] of Object.entries(vars)) {
    out += `${indent}--${k}: ${v};\n`;
  }
  return out;
}

// ---------- @theme: all design tokens as CSS variables ----------
let css = `@theme {\n`;

css += `  /* Colors */\n`;
css += writeVars(colors);

css += `  /* Spacing */\n`;
css += writeVars(spacing);

css += `  /* Border Radius */\n`;
css += writeVars(borderRadius);

css += `  /* Opacity */\n`;
css += writeVars(opacity);

css += `  /* Font Family */\n`;
css += writeVars(fontFamily);

css += `  /* Font Weight */\n`;
css += writeVars(fontWeight);

css += `  /* Font Size */\n`;
css += writeVars(fontSize);

css += `  /* Line Height */\n`;
css += writeVars(lineHeight);

css += `  /* Letter Spacing */\n`;
css += writeVars(letterSpacing);

css += `  /* Paragraph Spacing */\n`;
css += writeVars(paragraphSpacing);

css += `  /* Box Shadow */\n`;
css += writeVars(boxShadow);

// Typography composite variables
function writeTypographyVars(typoMap, sectionLabel) {
  if (Object.keys(typoMap).length === 0) return "";
  let out = `  /* ${sectionLabel} Typography */\n`;
  for (const [name, tv] of Object.entries(typoMap)) {
    const fw = resolveFontWeight(tv.fontWeight);
    out += `  --${name}-font-family: '${tv.fontFamily}', sans-serif;\n`;
    out += `  --${name}-font-weight: ${fw};\n`;
    out += `  --${name}-font-size: ${tv.fontSize}px;\n`;
    const lh = String(tv.lineHeight).includes("%") ? tv.lineHeight : `${tv.lineHeight}px`;
    out += `  --${name}-line-height: ${lh};\n`;
    out += `  --${name}-letter-spacing: ${tv.letterSpacing};\n`;
  }
  return out;
}

css += writeTypographyVars(displayTypo, "Display");
css += writeTypographyVars(headingTypo, "Heading");
css += writeTypographyVars(labelTypo, "Label");
css += writeTypographyVars(bodyTypo, "Body");

css += `}\n\n`;

// ---------- @layer components: utility classes ----------
css += `@layer components {\n`;

function writeTypographyClasses(typoMap, sectionLabel) {
  if (Object.keys(typoMap).length === 0) return "";
  let out = `  /* ${sectionLabel} Typography */\n`;
  for (const [name, tv] of Object.entries(typoMap)) {
    out += `  .${name} {\n`;
    out += `    font-family: var(--${name}-font-family);\n`;
    out += `    font-weight: var(--${name}-font-weight);\n`;
    out += `    font-size: var(--${name}-font-size);\n`;
    out += `    line-height: var(--${name}-line-height);\n`;
    out += `    letter-spacing: var(--${name}-letter-spacing);\n`;
    out += `  }\n\n`;
  }
  return out;
}

css += writeTypographyClasses(displayTypo, "Display");
css += writeTypographyClasses(headingTypo, "Heading");
css += writeTypographyClasses(labelTypo, "Label");
css += writeTypographyClasses(bodyTypo, "Body");

css += `}\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, css, "utf-8");

console.log(`Generated: ${outputPath}`);

const totalVars =
  Object.keys(colors).length +
  Object.keys(spacing).length +
  Object.keys(borderRadius).length +
  Object.keys(opacity).length +
  Object.keys(fontFamily).length +
  Object.keys(fontWeight).length +
  Object.keys(fontSize).length +
  Object.keys(lineHeight).length +
  Object.keys(letterSpacing).length +
  Object.keys(paragraphSpacing).length +
  Object.keys(boxShadow).length;
console.log(`Total CSS variables: ${totalVars}`);
