/**
 * Resize olevlogo.png into browser-friendly icons (run: npm run icons).
 * Source: public/olevlogo.png
 *
 * Next.js App Router reads these automatically (tab icon + /favicon.ico):
 *   app/icon.png, app/apple-icon.png, app/favicon.ico
 * Optional copies in public/ for direct linking.
 */
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public", "olevlogo.png");

async function resizePng(size) {
  return sharp(src)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
}

async function main() {
  // Next.js metadata file conventions (root of /app)
  const icon32 = await resizePng(32);
  const icon48 = await resizePng(48);
  const apple180 = await resizePng(180);

  writeFileSync(join(root, "app", "icon.png"), icon48);
  console.log("Wrote app/icon.png (48×48)");

  writeFileSync(join(root, "app", "apple-icon.png"), apple180);
  console.log("Wrote app/apple-icon.png (180×180)");

  const ico16 = await resizePng(16);
  const icoBuf = await pngToIco([ico16, icon32, icon48]);
  writeFileSync(join(root, "app", "favicon.ico"), icoBuf);
  console.log("Wrote app/favicon.ico");

  // Optional: public copies
  writeFileSync(join(root, "public", "favicon-32.png"), icon32);
  writeFileSync(join(root, "public", "favicon-48.png"), icon48);
  writeFileSync(join(root, "public", "apple-touch-icon.png"), apple180);
  console.log("Wrote public/favicon-32.png, favicon-48.png, apple-touch-icon.png");

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
