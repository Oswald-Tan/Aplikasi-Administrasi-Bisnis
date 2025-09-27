// middleware/upload.js (file middleware Anda)
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fungsi untuk membuat middleware upload dinamis
const createUploader = (folderName, fileSizeLimit = 10 * 1024 * 1024, useMemoryStorage = false) => {
  if (useMemoryStorage) {
    // Untuk CSV, gunakan memory storage
    return multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: fileSizeLimit
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || 
            file.mimetype === 'application/vnd.ms-excel' ||
            file.mimetype === 'application/csv' ||
            file.originalname.toLowerCase().endsWith('.csv')) {
          cb(null, true);
        } else {
          cb(new Error('Hanya file CSV yang diperbolehkan'), false);
        }
      }
    });
  }

  // Buat direktori jika belum ada (untuk disk storage)
  const uploadDir = path.join(__dirname, `../uploads/${folderName}`);
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniquePrefix = crypto.randomBytes(8).toString('hex');
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, `${Date.now()}-${uniquePrefix}-${basename}${ext}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'text/csv', // Tambahkan CSV untuk disk storage juga
      'application/vnd.ms-excel',
      'application/csv'
    ];
    
    const allowedExtensions = ['.csv'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(file.mimetype) || 
        allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Jenis file tidak diizinkan. Hanya dokumen, gambar, dan CSV yang diperbolehkan`), false);
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: fileSizeLimit
    }
  });
};

// Buat middleware khusus untuk CSV dengan memory storage
export const csvUpload = createUploader('csv', 5 * 1024 * 1024, true);

// Middleware lainnya tetap sama
export const suratUpload = createUploader('surat');
export const dokumenUpload = createUploader('documents');
export const arsipUpload = createUploader('arsip');

export default createUploader;