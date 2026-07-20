import { writeFile } from "node:fs/promises";

const BASE_URL = "https://360.lehigh.edu";
const INDEX_URL = `${BASE_URL}/programs`;
const OUTPUT_PATH = new URL("../lib/program-data.ts", import.meta.url);

function decodeHtml(value = "") {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value = "") {
  return decodeHtml(value.replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
}

function absoluteUrl(url = "") {
  if (!url) {
    return "";
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  if (url.startsWith("http")) {
    return url;
  }

  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function slugFromUrl(url) {
  return url.split("/").filter(Boolean).at(-1) ?? "";
}

function isoDateFromHtml(value = "") {
  const datetime = value.match(/datetime="([^"]+)"/i)?.[1];
  if (datetime) {
    return datetime.slice(0, 10);
  }

  const text = stripTags(value);
  const parsed = Date.parse(`${text} UTC`);
  return Number.isNaN(parsed) ? undefined : new Date(parsed).toISOString().slice(0, 10);
}

function extractTitle(html) {
  return stripTags(html.match(/<h1[^>]*class="[^"]*page-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
}

function extractBody(html) {
  const bodyHtml =
    html.match(/field--name-field-body[\s\S]*?field__item">([\s\S]*?)<\/div>\s*<\/div>/i)?.[1] ??
    "";
  const paragraphs = [...bodyHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) =>
    stripTags(match[1]),
  );
  const descriptionParts = [];
  let website = "";
  let contact = "";
  let timeline = "";
  let costFunding = "";

  for (const paragraph of paragraphs) {
    const normalized = paragraph.replace(/\s+/g, " ").trim();
    if (!normalized) {
      continue;
    }
    if (/^Website:/i.test(normalized)) {
      website = normalized.replace(/^Website:\s*/i, "");
    } else if (/^Contact:/i.test(normalized)) {
      contact = normalized.replace(/^Contact:\s*/i, "");
    } else if (/^Timeline:/i.test(normalized)) {
      timeline = normalized.replace(/^Timeline:\s*/i, "");
    } else if (/^Cost\/Funding:/i.test(normalized)) {
      costFunding = normalized.replace(/^Cost\/Funding:\s*/i, "");
    } else {
      descriptionParts.push(normalized);
    }
  }

  return {
    description: descriptionParts.join(" "),
    website,
    contact,
    timeline,
    costFunding,
  };
}

function extractFieldBlock(html, className) {
  const start = html.search(new RegExp(`<div class="field[^"]*${className}[^"]*"`, "i"));
  if (start === -1) {
    return "";
  }

  const next = html.slice(start + 1).search(/<div class="field field--name-field-ci-/i);
  return next === -1 ? html.slice(start) : html.slice(start, start + 1 + next);
}

function extractFieldItems(html, className) {
  const block = extractFieldBlock(html, className);
  return [...block.matchAll(/<div class="field__item">([\s\S]*?)<\/div>/gi)]
    .map((match) => stripTags(match[1]))
    .filter(Boolean);
}

function extractFieldText(html, className) {
  return extractFieldItems(html, className)[0] ?? "";
}

function extractFieldTextByLabel(html, label) {
  const fieldBlocks = html.match(/<div class="field[\s\S]*?(?=<div class="field|<\/main>|<\/article>|$)/gi) ?? [];
  const labelPattern = new RegExp(`field__label[^>]*>\\s*${label}\\s*<`, "i");
  const block = fieldBlocks.find((fieldBlock) => labelPattern.test(fieldBlock));

  if (!block) {
    return "";
  }

  return [...block.matchAll(/<div class="field__item">([\s\S]*?)<\/div>/gi)]
    .map((match) => stripTags(match[1]))
    .find(Boolean) ?? "";
}

function extractFieldLinkFromBlock(block) {
  const href = block.match(/<a[^>]+href="([^"]+)"/i)?.[1] ?? "";

  return absoluteUrl(decodeHtml(href)) || undefined;
}

function extractFieldLink(html, className) {
  return extractFieldLinkFromBlock(extractFieldBlock(html, className));
}

function extractFieldLinkByLabel(html, label) {
  const fieldBlocks = html.match(/<div class="field[\s\S]*?(?=<div class="field|<\/main>|<\/article>|$)/gi) ?? [];
  const labelPattern = new RegExp(`field__label[^>]*>\\s*${label}\\s*<`, "i");
  const block = fieldBlocks.find((fieldBlock) => labelPattern.test(fieldBlock));

  return block ? extractFieldLinkFromBlock(block) : undefined;
}

function extractDateField(html, className) {
  const block = extractFieldBlock(html, className);
  return isoDateFromHtml(block);
}

function extractPhotos(html) {
  const featuredBlock = extractFieldBlock(html, "field--name-field-ci-featured-image");
  const photoUrls = new Set();

  for (const match of featuredBlock.matchAll(/(?:src|srcset)="([^"]+)"/gi)) {
    const parts = match[1].split(",").map((part) => part.trim().split(/\s+/)[0]);
    for (const part of parts) {
      if (part && !part.includes("favicon") && !part.includes("lehigh-logo")) {
        photoUrls.add(absoluteUrl(part));
      }
    }
  }

  const imageUrl =
    absoluteUrl(featuredBlock.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? "") ??
    [...photoUrls][0] ??
    "";
  const imageAlt = decodeHtml(featuredBlock.match(/<img[^>]+alt="([^"]*)"/i)?.[1] ?? "");

  return {
    imageUrl: imageUrl || [...photoUrls][0] || "",
    imageAlt,
    photoUrls: [...photoUrls],
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
      }

      return response.text();
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        const delay = attempt * 1000;
        console.warn(
          `[scrape] Fetch failed for ${url}. Retrying in ${delay}ms (${attempt}/${attempts})`,
        );
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

function findProgramLinks(html) {
  const links = [...html.matchAll(/<a[^>]+href="([^"#?]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      path: match[1],
      url: absoluteUrl(match[1]),
      title: stripTags(match[2]),
      slug: slugFromUrl(match[1]),
    }))
    .filter(
      (link) =>
        link.slug &&
        link.slug !== "programs" &&
        (link.path.startsWith("/programs/") ||
          link.path.startsWith("/lehigh-360/lehigh-360-high-impact-programs-database/")),
    );

  return [...new Map(links.map((link) => [link.slug, link])).values()];
}

async function scrapeProgram(link, index) {
  const html = await fetchText(link.url);
  const body = extractBody(html);
  const photos = extractPhotos(html);
  const title = extractTitle(html) || link.title;

  const program = {
    id: link.slug,
    title,
    slug: link.slug,
    sourceUrl: link.url,
    description:
      body.description ||
      `${title} is listed in Lehigh360's high-impact programs database.`,
    website: body.website || undefined,
    contact: body.contact || undefined,
    timeline: body.timeline || undefined,
    costFunding: body.costFunding || undefined,
    deadline: extractDateField(html, "field--name-field-ci-deadline"),
    duration: extractFieldText(html, "field--name-field-ci-duration") || undefined,
    creditAvailable: extractFieldText(html, "field--name-field-ci-credit") === "Yes",
    workStudyOffered:
      extractFieldText(html, "field--name-field-ci-work-study-offered") === "Yes",
    financialAidAvailable: extractFieldText(html, "field--name-field-ci-finaid") === "Yes",
    gpaMinimumRequired:
      extractFieldText(html, "field--name-field-ci-gpa-required") === "Yes",
    gpaRequirement:
      extractFieldText(html, "field--name-field-ci-gpa-min") ||
      extractFieldText(html, "field--name-field-ci-gpa-requirement") ||
      extractFieldTextByLabel(html, "GPA Requirement") ||
      undefined,
    applicationUrl:
      extractFieldLink(html, "field--name-field-ci-application-link") ||
      extractFieldLinkByLabel(html, "Application Link"),
    periods: extractFieldItems(html, "field--name-field-ci-period"),
    colleges: extractFieldItems(html, "field--name-field-ci-college"),
    eligibleClassYears: extractFieldItems(html, "field--name-field-ci-eligibility"),
    opportunityTypes: extractFieldItems(html, "field--name-field-ci-type"),
    fundingTypes: extractFieldItems(html, "field--name-field-ci-compensation"),
    sdgTags: extractFieldItems(html, "field--name-field-ci-sdg"),
    keywords: extractFieldItems(html, "field--name-field-ci-keywords"),
    imageUrl: photos.imageUrl,
    imageAlt: photos.imageAlt,
    photoUrls: photos.photoUrls,
    featured: index < 8,
  };

  return Object.fromEntries(
    Object.entries(program).filter(([, value]) => value !== undefined),
  );
}

function renderTs(programs) {
  return `export type ProgramRecord = {
  id: string;
  title: string;
  slug: string;
  sourceUrl: string;
  description: string;
  website?: string;
  contact?: string;
  timeline?: string;
  costFunding?: string;
  deadline?: string;
  duration?: string;
  creditAvailable: boolean;
  workStudyOffered: boolean;
  financialAidAvailable: boolean;
  gpaMinimumRequired: boolean;
  gpaRequirement?: string;
  applicationUrl?: string;
  periods: string[];
  colleges: string[];
  eligibleClassYears: string[];
  opportunityTypes: string[];
  fundingTypes: string[];
  sdgTags: string[];
  keywords: string[];
  imageUrl: string;
  imageAlt?: string;
  photoUrls: string[];
  featured?: boolean;
};

export const programs: ProgramRecord[] = ${JSON.stringify(programs, null, 2)};

export const classYears = Array.from(
  new Set(programs.flatMap((program) => program.eligibleClassYears)),
);

export const colleges = Array.from(
  new Set(programs.flatMap((program) => program.colleges)),
);

export const opportunityTypes = Array.from(
  new Set(programs.flatMap((program) => program.opportunityTypes)),
);

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}
`;
}

async function main() {
  const indexHtml = await fetchText(INDEX_URL);
  const links = findProgramLinks(indexHtml);

  if (links.length === 0) {
    throw new Error("Expected at least one program, found 0");
  }

  const programs = [];
  for (const [index, link] of links.entries()) {
    console.log(`Scraping ${index + 1}/${links.length}: ${link.title}`);
    programs.push(await scrapeProgram(link, index));
  }

  await writeFile(OUTPUT_PATH, renderTs(programs));
  console.log(`Wrote ${programs.length} programs to ${OUTPUT_PATH.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
