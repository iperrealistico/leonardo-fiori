import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const baselineRoot = path.join(
  process.cwd(),
  "output/playwright/live-site-audit/screenshots",
);
const candidateRoot = path.join(
  process.cwd(),
  "output/playwright/phase9-local-qa/screenshots",
);
const diffRoot = path.join(
  process.cwd(),
  "output/playwright/phase9-local-qa/diffs",
);
const reportPath = path.join(
  process.cwd(),
  "output/playwright/phase9-local-qa/screenshot-comparison.json",
);

const pairPaths = [
  "desktop-1440x900/home.png",
  "desktop-1440x900/radici.png",
  "desktop-1440x900/radici__after-arrow-right.png",
  "desktop-1440x900/emulsione.png",
  "desktop-1440x900/emulsione__after-next-click.png",
  "desktop-1440x900/about.png",
  "tablet-1024x768/home.png",
  "tablet-1024x768/radici.png",
  "tablet-1024x768/emulsione.png",
  "tablet-1024x768/about.png",
  "breakpoint-768x1024/home.png",
  "breakpoint-768x1024/radici.png",
  "breakpoint-768x1024/emulsione.png",
  "breakpoint-768x1024/about.png",
  "mobile-390x844/home.png",
  "mobile-390x844/home__menu-open.png",
  "mobile-390x844/radici.png",
  "mobile-390x844/emulsione.png",
  "mobile-390x844/about.png",
];

const thresholds = {
  exactChangedPixelRatio: 0.015,
  exactMeanChannelDelta: 4,
  acceptableChangedPixelRatio: 0.08,
  acceptableMeanChannelDelta: 14,
  changedPixelThreshold: 16,
};

function classifyComparison(result) {
  if (result.status === "missing" || result.status === "dimension-mismatch") {
    return "failed";
  }

  if (
    result.changedPixelRatio <= thresholds.exactChangedPixelRatio &&
    result.meanChannelDelta <= thresholds.exactMeanChannelDelta
  ) {
    return "exact";
  }

  if (
    result.changedPixelRatio <= thresholds.acceptableChangedPixelRatio &&
    result.meanChannelDelta <= thresholds.acceptableMeanChannelDelta
  ) {
    return "acceptable";
  }

  return "review-needed";
}

async function comparePair(relativePath) {
  const baselinePath = path.join(baselineRoot, relativePath);
  const candidatePath = path.join(candidateRoot, relativePath);
  const diffPath = path.join(diffRoot, relativePath);

  try {
    const [baselineImage, candidateImage] = await Promise.all([
      sharp(baselinePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
      sharp(candidatePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    ]);

    if (
      baselineImage.info.width !== candidateImage.info.width ||
      baselineImage.info.height !== candidateImage.info.height
    ) {
      return {
        path: relativePath,
        status: "dimension-mismatch",
        baseline: {
          width: baselineImage.info.width,
          height: baselineImage.info.height,
        },
        candidate: {
          width: candidateImage.info.width,
          height: candidateImage.info.height,
        },
      };
    }

    const width = baselineImage.info.width;
    const height = baselineImage.info.height;
    const pixelCount = width * height;
    const diffBuffer = Buffer.alloc(pixelCount * 4);

    let changedPixels = 0;
    let diffSum = 0;
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let index = 0; index < pixelCount; index += 1) {
      const offset = index * 4;
      const rDiff = Math.abs(
        baselineImage.data[offset] - candidateImage.data[offset],
      );
      const gDiff = Math.abs(
        baselineImage.data[offset + 1] - candidateImage.data[offset + 1],
      );
      const bDiff = Math.abs(
        baselineImage.data[offset + 2] - candidateImage.data[offset + 2],
      );
      const aDiff = Math.abs(
        baselineImage.data[offset + 3] - candidateImage.data[offset + 3],
      );
      const maxChannelDiff = Math.max(rDiff, gDiff, bDiff, aDiff);

      diffSum += maxChannelDiff;

      if (maxChannelDiff > thresholds.changedPixelThreshold) {
        changedPixels += 1;
        const x = index % width;
        const y = Math.floor(index / width);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);

        diffBuffer[offset] = 255;
        diffBuffer[offset + 1] = 0;
        diffBuffer[offset + 2] = 0;
        diffBuffer[offset + 3] = 180;
      } else {
        diffBuffer[offset] = candidateImage.data[offset];
        diffBuffer[offset + 1] = candidateImage.data[offset + 1];
        diffBuffer[offset + 2] = candidateImage.data[offset + 2];
        diffBuffer[offset + 3] = 30;
      }
    }

    await mkdir(path.dirname(diffPath), { recursive: true });
    await sharp(diffBuffer, {
      raw: {
        width,
        height,
        channels: 4,
      },
    }).png().toFile(diffPath);

    const result = {
      path: relativePath,
      status: "ok",
      width,
      height,
      changedPixels,
      changedPixelRatio: changedPixels / pixelCount,
      meanChannelDelta: diffSum / pixelCount,
      changedBounds:
        changedPixels === 0
          ? null
          : {
              x: minX,
              y: minY,
              width: maxX - minX + 1,
              height: maxY - minY + 1,
            },
      diffImage: path.relative(process.cwd(), diffPath),
    };

    return {
      ...result,
      classification: classifyComparison(result),
    };
  } catch (error) {
    return {
      path: relativePath,
      status: "missing",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const comparisons = await Promise.all(pairPaths.map(comparePair));
const summary = comparisons.reduce(
  (accumulator, comparison) => {
    if (comparison.classification) {
      accumulator[comparison.classification] += 1;
    } else {
      accumulator.failed += 1;
    }

    return accumulator;
  },
  {
    exact: 0,
    acceptable: 0,
    "review-needed": 0,
    failed: 0,
  },
);

const report = {
  generatedAt: new Date().toISOString(),
  thresholds,
  baselineRoot: path.relative(process.cwd(), baselineRoot),
  candidateRoot: path.relative(process.cwd(), candidateRoot),
  diffRoot: path.relative(process.cwd(), diffRoot),
  summary,
  comparisons,
};

await writeFile(reportPath, JSON.stringify(report, null, 2));
console.log(reportPath);
