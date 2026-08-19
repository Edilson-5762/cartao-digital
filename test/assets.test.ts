import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";

const publicDir = path.resolve(__dirname, "../public");

const expectedFiles = [
  "icons/python.png",
  "icons/pyautogui.png",
  "icons/js.png",
  "icons/react.png",
  "icons/nodejs.png",
  "icons/html.png",
  "icons/css.png",
  "icons/tailwind.png",
  "icons/sql.png",
  "icons/powerbi.png",
  "icons/excel.png",
  "icons/N8N.png",
  "icons/claudecode.png",
  "icons/nexts.png",
  "hero/bainer.png",
  "hero/developer.png",
  "story/01-chef-prime.jpg",
  "story/02-chef-acougue.jpg",
  "story/03-bras.jpg",
  "story/04-vig.jpg",
  "story/05-dev-edilson.png",
  "story/06-desenvolvedor.png",
  "logo-aguia-square.png",
  "video/background.mp4",
];

describe("public assets", () => {
  it.each(expectedFiles)("has %s", (file) => {
    expect(existsSync(path.join(publicDir, file))).toBe(true);
  });
});
