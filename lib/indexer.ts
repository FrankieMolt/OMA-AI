import fs from "fs";
import path from "path";
import {
  indexFile,
  searchFiles,
  getIndexedFiles,
  clearFileIndex,
} from "./db/queries";

// File extensions to index
const INDEXABLE_EXTENSIONS = [
  ".md",
  ".txt",
  ".json",
  ".js",
  ".ts",
  ".tsx",
  ".jsx",
  ".css",
  ".html",
  ".py",
  ".rs",
  ".go",
  ".yaml",
  ".yml",
  ".toml",
];

// Directories to skip
const SKIP_DIRECTORIES = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "coverage",
  ".vercel",
  ".clawhub",
];

// Maximum file size to index (in bytes)
const MAX_FILE_SIZE = 1024 * 1024; // 1MB

/**
 * Recursively index all files in a directory
 */
export async function indexDirectory(dirPath: string, maxFiles: number = 1000) {
  let indexedCount = 0;

  function walkDirectory(currentPath: string) {
    if (indexedCount >= maxFiles) return;

    try {
      const items = fs.readdirSync(currentPath);

      for (const item of items) {
        if (indexedCount >= maxFiles) break;

        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        // Skip directories in the skip list
        if (stat.isDirectory() && SKIP_DIRECTORIES.includes(item)) {
          continue;
        }

        if (stat.isDirectory()) {
          walkDirectory(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();

          // Check if file is indexable
          if (
            INDEXABLE_EXTENSIONS.includes(ext) &&
            stat.size <= MAX_FILE_SIZE
          ) {
            try {
              const content = fs.readFileSync(fullPath, "utf-8");
              const relativePath = path.relative(process.cwd(), fullPath);

              indexFile({
                path: relativePath,
                filename: item,
                content: content.substring(0, 50000), // Limit content to 50k chars
                last_modified: stat.mtime.toISOString(),
                file_type: ext.substring(1),
                size: stat.size,
              });

              indexedCount++;
            } catch (err) {
              console.error(`Failed to index file: ${fullPath}`, err);
            }
          }
        }
      }
    } catch (err) {
      console.error(`Failed to read directory: ${currentPath}`, err);
    }
  }

  walkDirectory(dirPath);
  return indexedCount;
}

/**
 * Index the workspace
 */
export async function indexWorkspace(workspacePath: string = process.cwd()) {
  console.log(`Starting workspace indexing: ${workspacePath}`);
  const count = await indexDirectory(workspacePath);
  console.log(`Indexed ${count} files`);
  return count;
}

/**
 * Rebuild the entire file index
 */
export async function rebuildIndex() {
  clearFileIndex();
  return await indexWorkspace();
}

/**
 * Search the file index
 */
export function search(query: string, limit: number = 20) {
  if (!query || query.trim().length < 2) {
    return [];
  }
  return searchFiles(query.trim(), limit);
}
