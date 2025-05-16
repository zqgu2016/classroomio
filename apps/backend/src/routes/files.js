const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const { existsSync } = require('fs');
const mime = require('mime-types');
const router = express.Router();

// 常量
const UPLOAD_DIR = path.resolve('uploads');
const MAX_FILE_SIZE = 524_288_000; // 500MB

// 工具函数
function genUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-zA-Z0-9.\-_ ]/g, '')
    .split(' ')
    .join('-');
}
function getFileCategory(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.ipynb') return 'ipynb';
  if (ext === '.ppt' || ext === '.pptx') return 'ppt';
  return undefined;
}
function sanitizeCategory(input) {
  return input.replace(/[^a-z]/g, '');
}
function sanitizeFileId(input) {
  return input.replace(/[^a-zA-Z0-9.\-_]/g, '');
}
// 保证目录存在
async function ensureUploadDir(dir) {
  if (!existsSync(dir)) {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Multer设置，保存到内存，后续自己保存到磁盘并做验证
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});

router.get('/:fileCategory/:fileId', async (req, res) => {
  const { fileCategory, fileId } = req.params;
  const safeCategory = sanitizeCategory(fileCategory);
  const safeFileId = sanitizeFileId(fileId);
  const filePath = path.join(UPLOAD_DIR, safeCategory, safeFileId);

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) throw new Error();
  } catch {
    return res.status(404).json({ error: 'File not found' });
  }

  const contentType = mime.lookup(safeFileId) || 'application/octet-stream';
  res.setHeader('Content-Disposition', `attachment; filename="${safeFileId}"`);
  res.setHeader('Content-Type', contentType);

  res.sendFile(filePath);
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalName = file.originalname;
    const sanitized = sanitizeFilename(originalName);
    const fileCategory = getFileCategory(sanitized);
    if (!fileCategory) {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: 'File too large (max 500MB)' });
    }

    const categoryDir = path.join(UPLOAD_DIR, fileCategory);
    await ensureUploadDir(categoryDir);

    const fileName = `${genUniqueId()}-${sanitized}`;
    const filePath = path.join(categoryDir, fileName);

    try {
      await fs.writeFile(filePath, file.buffer);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to save file' });
    }

    return res.status(200).json({
      filename: fileName,
      category: fileCategory,
      url: `/api/files/${fileCategory}/${fileName}`
    });
  } catch (error) {
    console.error('Error', error);
    res.status(400).json({
      success: false,
      error
    });
  }
});

module.exports = router;
