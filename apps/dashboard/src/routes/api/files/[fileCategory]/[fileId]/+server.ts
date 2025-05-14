import { error } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
// import mime-types 只在返回时需要多类型兼容时用

const UPLOAD_DIR = path.resolve('uploads');

function sanitizeCategory(input: string): string {
  // 只允许小写字母，防止路径穿越
  return input.replace(/[^a-z]/g, '');
}
function sanitizeFileId(input: string): string {
  // 保持和文件名生成策略一致，严格过滤
  return input.replace(/[^a-zA-Z0-9.\-_]/g, '');
}

export const GET = async ({ params }) => {
  const { fileCategory, fileId } = params as { fileCategory: string; fileId: string };

  const safeCategory = sanitizeCategory(fileCategory);
  const safeFileId = sanitizeFileId(fileId);

  const filePath = path.join(UPLOAD_DIR, safeCategory, safeFileId);

  let stat;
  try {
    stat = await fs.stat(filePath);
    if (!stat.isFile()) throw error(404, 'File not found');
  } catch {
    throw error(404, 'File not found');
  }

  // 可以判断 Content-Type, 这里只做简单处理，推荐根据自己业务需要选择
  let mime = 'application/octet-stream';
  try {
    const { lookup } = await import('mime-types');
    mime = lookup(safeFileId) || mime;
  } catch {}

  // fs.createReadStream 仅在原生node端可用
  const fileStream = (await import('fs')).createReadStream(filePath);
  // SvelteKit Node 环境下推荐 Readable.toWeb
  // @ts-ignore
  const webStream = fileStream.readableWebStream ? fileStream.readableWebStream() : fileStream;

  return new Response(webStream as any, {
    headers: {
      'Content-Disposition': `attachment; filename="${safeFileId}"`,
      'Content-Type': mime
    }
  });
};
