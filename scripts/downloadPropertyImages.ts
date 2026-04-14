import fs from "node:fs";
import path from "node:path";
import axios from "axios";
import { properties } from "../src/data/mockData";

const OUTPUT_DIR = path.join(process.cwd(), "public", "properties");
// Keep this as SVG to avoid invalid "jpg" placeholder bytes.
const PLACEHOLDER = path.join(process.cwd(), "public", "images", "property-placeholder.svg");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");

function isRemoteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readFirstBytes(filePath: string, n = 32): Buffer | null {
  try {
    const fd = fs.openSync(filePath, "r");
    const buf = Buffer.alloc(n);
    fs.readSync(fd, buf, 0, n, 0);
    fs.closeSync(fd);
    return buf;
  } catch {
    return null;
  }
}

function isLikelyHtmlOrSvg(buf: Buffer) {
  const s = buf.toString("utf8").trimStart().toLowerCase();
  return s.startsWith("<!doctype html") || s.startsWith("<html") || s.startsWith("<svg");
}

function isLikelyJpeg(buf: Buffer) {
  return buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

function isLikelyPng(buf: Buffer) {
  return (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  );
}

function isLikelyWebp(buf: Buffer) {
  const s = buf.toString("ascii", 0, Math.min(buf.length, 12));
  return s.startsWith("RIFF") && s.includes("WEBP");
}

function isValidImageFile(filePath: string) {
  const buf = readFirstBytes(filePath, 32);
  if (!buf) return false;
  if (isLikelyHtmlOrSvg(buf)) return false;
  return isLikelyJpeg(buf) || isLikelyPng(buf) || isLikelyWebp(buf);
}

function extFromContentType(contentType?: string) {
  const ct = (contentType ?? "").toLowerCase().split(";")[0].trim();
  if (ct === "image/jpeg" || ct === "image/jpg") return ".jpg";
  if (ct === "image/png") return ".png";
  if (ct === "image/webp") return ".webp";
  if (ct === "image/svg+xml") return ".svg";
  return "";
}

function hashToIndex(key: string, modulo: number) {
  const h = Array.from(key).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
  return modulo === 0 ? 0 : h % modulo;
}

function collectLocalFallbackPool(): string[] {
  const roots = [
    // Use only curated "building" renders to avoid posters/cost-sheets.
    path.join(process.cwd(), "public", "Palm beach"),
  ];

  const out: string[] = [];
  for (const root of roots) {
    try {
      if (!fs.existsSync(root)) continue;
      const files = fs
        .readdirSync(root)
        .map((f) => path.join(root, f))
        .filter((p) => fs.statSync(p).isFile())
        .filter((p) => /\.(jpe?g|png|webp)$/i.test(p));
      out.push(...files);
    } catch {
      // ignore
    }
  }
  return out;
}

function tryResolvePublicFileFromUrl(localUrl: string): string | null {
  try {
    const raw = localUrl.trim();
    if (!raw.startsWith("/")) return null;
    // Remove leading slash and decode URL-encoded segments (%20, etc.)
    const rel = decodeURIComponent(raw.slice(1));
    const abs = path.join(process.cwd(), "public", rel);
    return fs.existsSync(abs) && fs.statSync(abs).isFile() ? abs : null;
  } catch {
    return null;
  }
}

const SLUG_OVERRIDES: Record<string, string> = {
  // Force more relevant thumbnails where the default source is an amenity/cost sheet.
  "platinum-the-reserve": "/Palm%20beach/1.jpeg", // exterior building render
  "codename-growth": "/Palm%20beach/6.jpeg", // commercial frontage-looking render
  "cyber-square": "/Palm%20beach/6.jpeg",
  "praksyde-platinum": "/Palm%20beach/2.jpeg", // residential exterior
  "goodwill-wisteria": "/Palm%20beach/4.jpeg", // residential exterior/courtyard
};

function looksLikeAmenityUrl(url: string) {
  const u = url.toLowerCase();
  return u.includes("ameneties") || u.includes("amenities") || u.includes("/amenity") || u.includes("gym");
}

function pickBestImageUrl(property: { slug: string; image?: string; gallery?: string[]; propertyType?: string }) {
  const override = SLUG_OVERRIDES[property.slug];
  if (override) return override;

  const img = (property.image ?? "").trim();
  const g0 = (property.gallery?.[0] ?? "").trim();

  // For commercial, prefer the main image first (usually exterior/hero).
  if ((property.propertyType ?? "").toLowerCase().includes("commercial")) return img || g0;

  // For residential, avoid picking amenity shots as the card thumbnail.
  if (g0 && looksLikeAmenityUrl(g0)) return img || g0;

  return g0 || img;
}

async function downloadImage(url: string, filepath: string) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      timeout: 30000,
      headers: {
        "User-Agent": "Mozilla/5.0 (property-image-downloader)",
        Accept: "image/*,*/*;q=0.8",
        Referer: url,
      },
      validateStatus: () => true,
    });

    if (response.status < 200 || response.status >= 300) {
      console.log("Failed:", response.status, url);
      return false;
    }

    return await new Promise<boolean>((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);
      writer.on("finish", () => resolve(true));
      writer.on("error", reject);
    });
  } catch {
    console.log("Failed:", url);
    return false;
  }
}

function copyPlaceholder(targetPath: string) {
  try {
    // Do not write placeholder bytes into a ".jpg" file. Let the UI fallback handle it.
    // If we previously wrote an invalid file, clean it up.
    if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
    return false;
  } catch {
    return false;
  }
}

async function run() {
  ensureDir(OUTPUT_DIR);
  const localFallbackPool = collectLocalFallbackPool();
  const usedFallbacks = new Set<string>();

  let ok = 0;
  let failed = 0;
  let skipped = 0;
  const manifest: Record<string, string> = {};

  for (const property of properties) {
    const candidate = pickBestImageUrl(property) || "";
    const url = typeof candidate === "string" ? candidate.trim() : "";
    const baseOutPath = path.join(OUTPUT_DIR, property.slug);

    // Clean up any previously cached invalid files for this slug.
    for (const ext of [".jpg", ".jpeg", ".png", ".webp", ".svg"]) {
      const p = `${baseOutPath}${ext}`;
      if (fs.existsSync(p) && !isValidImageFile(p)) {
        try {
          fs.unlinkSync(p);
        } catch {
          // ignore
        }
      }
    }

    // If a local file already exists, skip.
    const existing = [".jpg", ".jpeg", ".png", ".webp", ".svg"]
      .map((ext) => `${baseOutPath}${ext}`)
      .find((p) => fs.existsSync(p) && fs.statSync(p).size > 0 && isValidImageFile(p));
    if (existing) {
      manifest[property.slug] = path.extname(existing).slice(1);
      skipped += 1;
      continue;
    }

    if (!url) {
      const didCopy = copyPlaceholder(`${baseOutPath}.jpg`);
      failed += 1;
      console.log(didCopy ? "Missing image, used placeholder:" : "Missing image:", property.slug);
      continue;
    }

    // If the data points to local /public assets, copy them into /public/properties/{slug}.{ext}
    // so the UI can always use a single consistent path via manifest.
    if (!isRemoteUrl(url)) {
      const resolved = tryResolvePublicFileFromUrl(url);
      if (resolved) {
        const ext = path.extname(resolved).toLowerCase() || ".jpg";
        const outPath = `${baseOutPath}${ext}`;
        try {
          fs.copyFileSync(resolved, outPath);
          if (isValidImageFile(outPath)) {
            ok += 1;
            manifest[property.slug] = ext.replace(".", "");
            console.log("Copied local:", property.slug, path.basename(resolved));
            continue;
          }
          try {
            if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
          } catch {
            // ignore
          }
        } catch {
          // ignore
        }
      }

      // If local URL can't be resolved, fall back to pool.
      skipped += 1;
      // continue to fallback logic below
    } else {
      // Remote URL download attempt.
      // Decide extension from content-type (download headers) by doing the request once.
      let ext = "";
      try {
        const head = await axios({
          url,
          method: "GET",
          responseType: "stream",
          timeout: 30000,
          headers: {
            "User-Agent": "Mozilla/5.0 (property-image-downloader)",
            Accept: "image/*,*/*;q=0.8",
            Referer: url,
          },
          validateStatus: () => true,
        });
        ext = extFromContentType(head.headers?.["content-type"]);
        // If unknown, default to .jpg to keep path simple.
        if (!ext) ext = ".jpg";
        // We already have the stream, write it.
        const outPath = `${baseOutPath}${ext}`;
        if (head.status < 200 || head.status >= 300) {
          console.log("Failed:", head.status, url);
          throw new Error("bad status");
        }
        const success = await new Promise<boolean>((resolve, reject) => {
          const writer = fs.createWriteStream(outPath);
          head.data.pipe(writer);
          writer.on("finish", () => resolve(true));
          writer.on("error", reject);
        });
        if (success && isValidImageFile(outPath)) {
          ok += 1;
          manifest[property.slug] = path.extname(outPath).slice(1);
          console.log("Downloaded:", property.slug, path.basename(outPath));
          continue;
        }
        // If download succeeded but file isn't a valid image, remove it.
        try {
          if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
        } catch {
          // ignore
        }
        throw new Error("invalid image bytes");
      } catch {
        // fallthrough to fallback logic below
      }
    }

    // Primary failed → copy a local stock building photo from /public as a fallback.
    try {
      if (localFallbackPool.length > 0) {
        // Try to avoid repeats across slugs when possible.
        let idx = hashToIndex(property.slug, localFallbackPool.length);
        let pick = localFallbackPool[idx];
        for (let tries = 0; tries < localFallbackPool.length; tries += 1) {
          const candidatePick = localFallbackPool[(idx + tries) % localFallbackPool.length];
          if (!usedFallbacks.has(candidatePick)) {
            pick = candidatePick;
            break;
          }
        }
        const outPath = `${baseOutPath}.jpg`;
        fs.copyFileSync(pick, outPath);
        if (isValidImageFile(outPath)) {
          ok += 1;
          manifest[property.slug] = "jpg";
          usedFallbacks.add(pick);
          console.log("Local fallback image:", property.slug, path.basename(pick));
          continue;
        }
        try {
          if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }

    copyPlaceholder(`${baseOutPath}.jpg`);
    failed += 1;
    console.log("Failed:", property.slug);
  }

  // Write manifest for UI lookup (slug -> extension).
  try {
    const payload = {
      __v: Date.now(),
      images: manifest,
    };
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(payload, null, 2), "utf8");
  } catch {
    // ignore
  }

  console.log("Done.", { ok, failed, skipped });
}

run();

