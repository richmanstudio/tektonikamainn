import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("src/assets");
const PUBLIC = path.resolve("public");
const REPORT = path.resolve("IMAGE_OPTIMIZATION_REPORT.md");
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const MIN_BYTES = 120 * 1024;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function safeSvgText(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function createPublicBrandAssets() {
  await fs.mkdir(PUBLIC, { recursive: true });

  const logoCandidates = [path.join(ROOT, "logo.png"), path.join(ROOT, "logo.jpg"), path.join(ROOT, "logo.jpeg"), path.join(ROOT, "logo.webp")];
  const logo = (await Promise.all(
    logoCandidates.map(async (candidate) => {
      try {
        await fs.access(candidate);
        return candidate;
      } catch {
        return null;
      }
    })
  )).find(Boolean);

  if (logo) {
    await sharp(logo)
      .rotate()
      .resize(512, 512, { fit: "contain", withoutEnlargement: true, background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 90, alphaQuality: 95, effort: 6 })
      .toFile(path.join(PUBLIC, "logo.webp"));

    await sharp(logo)
      .rotate()
      .resize(192, 192, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(path.join(PUBLIC, "favicon.png"));

    await sharp(logo)
      .rotate()
      .resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(path.join(PUBLIC, "apple-touch-icon.png"));
  }

  const heroCandidates = [
    path.join(ROOT, "presentation", "image5.png"),
    path.join(ROOT, "presentation", "image14.jpeg"),
    path.join(ROOT, "presentation", "image5.webp"),
    path.join(ROOT, "presentation", "image14.webp"),
    path.join(ROOT, "abouthero-bg.jpg"),
    path.join(ROOT, "abouthero-bg.webp"),
  ];
  let hero = null;
  for (const candidate of heroCandidates) {
    try {
      await fs.access(candidate);
      hero = candidate;
      break;
    } catch {
      // Try the next candidate.
    }
  }

  if (hero) {
    const overlay = Buffer.from(`
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="rgba(2,8,23,0.58)"/>
        <rect x="72" y="86" width="8" height="458" fill="#0b4fa3"/>
        <text x="112" y="270" fill="#ffffff" font-size="72" font-weight="800" font-family="Arial, DejaVu Sans, sans-serif">${safeSvgText("ТЕКТОНИКА")}</text>
        <text x="112" y="340" fill="#dbeafe" font-size="32" font-weight="600" font-family="Arial, DejaVu Sans, sans-serif">${safeSvgText("Геолого-геофизические исследования")}</text>
        <text x="112" y="392" fill="#ffffff" font-size="26" font-weight="400" font-family="Arial, DejaVu Sans, sans-serif">${safeSvgText("Дальний Восток · Россия")}</text>
      </svg>
    `);

    await sharp(hero)
      .rotate()
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 87, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(path.join(PUBLIC, "og-cover.jpg"));
  }
}

async function optimize() {
  await createPublicBrandAssets();

  const files = await walk(ROOT);
  const conversions = [];
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!RASTER_EXTENSIONS.has(ext)) continue;

    const stat = await fs.stat(file);
    const isMediaPhoto = file.includes(`${path.sep}photos${path.sep}`);
    const isPresentation = file.includes(`${path.sep}presentation${path.sep}`);
    const isLogo = path.basename(file).toLowerCase().startsWith("logo.");
    const shouldConvert = stat.size >= MIN_BYTES || isMediaPhoto || isPresentation || isLogo;
    if (!shouldConvert) continue;

    const target = file.replace(/\.(png|jpe?g)$/i, ".webp");
    const maxWidth = isLogo ? 512 : isMediaPhoto ? 1920 : 2560;
    const quality = isLogo ? 90 : isMediaPhoto ? 80 : 82;

    const pipeline = sharp(file, { failOn: "none" })
      .rotate()
      .resize({ width: maxWidth, height: maxWidth, fit: "inside", withoutEnlargement: true });

    await pipeline.webp({ quality, alphaQuality: 92, effort: 6, smartSubsample: true }).toFile(target);
    const targetStat = await fs.stat(target);

    // Keep the source when conversion does not produce a meaningful saving.
    if (targetStat.size >= stat.size * 0.98 && !isLogo) {
      await fs.unlink(target);
      continue;
    }

    beforeTotal += stat.size;
    afterTotal += targetStat.size;
    conversions.push({
      source: file,
      target,
      sourceName: path.basename(file),
      targetName: path.basename(target),
      before: stat.size,
      after: targetStat.size,
    });
  }

  const textCandidates = [
    ...(await walk(path.resolve("src"))),
    path.resolve("index.html"),
  ].filter((file) => [".ts", ".tsx", ".css", ".html"].includes(path.extname(file).toLowerCase()));

  for (const textFile of textCandidates) {
    let content = await fs.readFile(textFile, "utf8");
    const original = content;

    for (const conversion of conversions) {
      content = content.replaceAll(conversion.sourceName, conversion.targetName);
    }

    // Media gallery can contain a mix of converted and already-small originals.
    content = content.replace("*.{jpg,JPG,png,PNG}", "*.{jpg,JPG,png,PNG,webp}");

    if (content !== original) await fs.writeFile(textFile, content, "utf8");
  }

  for (const conversion of conversions) {
    await fs.unlink(conversion.source);
  }

  const saved = beforeTotal - afterTotal;
  const percent = beforeTotal ? ((saved / beforeTotal) * 100).toFixed(1) : "0.0";
  const rows = conversions
    .sort((a, b) => b.before - a.before)
    .map((item) => `| \`${path.relative(process.cwd(), item.source)}\` | ${kb(item.before)} | ${kb(item.after)} | ${(((item.before - item.after) / item.before) * 100).toFixed(1)}% |`)
    .join("\n");

  const report = `# Image optimization report\n\nGenerated automatically by \`scripts/optimize-images.mjs\`.\n\n- Converted files: **${conversions.length}**\n- Original payload: **${kb(beforeTotal)}**\n- Optimized payload: **${kb(afterTotal)}**\n- Saved: **${kb(saved)} (${percent}%)**\n- Format: **WebP**\n- Maximum raster width: **2560 px** (media gallery: 1920 px, logo: 512 px)\n\n| Source | Before | After | Saved |\n|---|---:|---:|---:|\n${rows || "| No conversions required | — | — | — |"}\n`;
  await fs.writeFile(REPORT, report, "utf8");

  console.log(`Converted ${conversions.length} images. Saved ${kb(saved)} (${percent}%).`);
}

optimize().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
