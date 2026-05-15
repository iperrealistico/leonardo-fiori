import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "public", "media");
const outputRoot = path.join(projectRoot, "public", "media-responsive");

const targetWidths = [480, 768, 1024, 1440, 1920];
const targetFormats = [
  {
    extension: "avif",
    transform(image) {
      return image.avif({ quality: 50, effort: 4 });
    },
  },
  {
    extension: "webp",
    transform(image) {
      return image.webp({ quality: 72 });
    },
  },
  {
    extension: "jpg",
    transform(image) {
      return image.jpeg({ quality: 76, mozjpeg: true });
    },
  },
];

async function collectSourceFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectSourceFiles(entryPath);
      }

      if (!/\.(jpe?g|png)$/i.test(entry.name)) {
        return [];
      }

      return [entryPath];
    }),
  );

  return files.flat();
}

function getWidthsForSource(sourceWidth) {
  const widths = targetWidths.filter((width) => width < sourceWidth);

  if (widths.length === 0 || widths[widths.length - 1] !== sourceWidth) {
    widths.push(sourceWidth);
  }

  return widths;
}

async function ensureDirectoryExists(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function generateVariants(sourceFile) {
  const metadata = await sharp(sourceFile).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read dimensions for "${sourceFile}".`);
  }

  const relativePath = path.relative(sourceRoot, sourceFile);
  const parsedPath = path.parse(relativePath);
  const variantWidths = getWidthsForSource(metadata.width);

  let generated = 0;

  for (const width of variantWidths) {
    for (const format of targetFormats) {
      const outputFile = path.join(
        outputRoot,
        parsedPath.dir,
        `${parsedPath.name}-w${width}.${format.extension}`,
      );

      await ensureDirectoryExists(outputFile);

      const pipeline = sharp(sourceFile)
        .rotate()
        .resize({ width, withoutEnlargement: true });

      await format.transform(pipeline).toFile(outputFile);
      generated += 1;
    }
  }

  return generated;
}

async function main() {
  const sourceFiles = await collectSourceFiles(sourceRoot);
  let generatedFiles = 0;

  for (const sourceFile of sourceFiles) {
    generatedFiles += await generateVariants(sourceFile);
  }

  console.log(
    `Generated ${generatedFiles} responsive image files from ${sourceFiles.length} source images.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
