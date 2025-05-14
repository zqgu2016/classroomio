import fs from 'fs/promises';
import path from 'path';
const UPLOAD_DIR = path.resolve('uploads');
const MAX_FILE_SIZE = 524_288_000; // 500MB

function genUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.\-_ ]/g, '')
    .split(' ')
    .join('-');
}

// 返回 'ppt' | 'ipynb' | undefined
function getFileCategory(filename: string): 'ppt' | 'ipynb' | undefined {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.ipynb') return 'ipynb';
  if (ext === '.ppt' || ext === '.pptx') return 'ppt';
  return undefined;
}

async function ensureUploadDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

export const POST = async ({ request }) => {
  const form = await request.formData();
  const file = form.get('file');
  if (!file || typeof file !== 'object' || !('name' in file)) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // @ts-ignore
  const originalName: string = file.name;
  const sanitized = sanitizeFilename(originalName);
  const fileCategory = getFileCategory(sanitized);

  if (!fileCategory) {
    return new Response(JSON.stringify({ error: 'Unsupported file type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const categoryDir = path.join(UPLOAD_DIR, fileCategory);
  await ensureUploadDir(categoryDir);

  const fileName = `${genUniqueId()}-${sanitized}`;
  const filePath = path.join(categoryDir, fileName);

  // @ts-ignore
  const fileSize = file.size;
  if (typeof fileSize === 'number' && fileSize > MAX_FILE_SIZE) {
    return new Response(JSON.stringify({ error: 'File too large (max 500MB)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // @ts-ignore
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to save file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 下载链接建议带上 category
  return new Response(
    JSON.stringify({
      filename: fileName,
      category: fileCategory,
      url: `/api/files/${fileCategory}/${fileName}`
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
