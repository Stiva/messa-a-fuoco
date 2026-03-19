import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { createClient } from '@sanity/client';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// Multer: store in memory for streaming to Sanity
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo file immagine sono consentiti'), false);
    }
    cb(null, true);
  },
});

// Sanity client with server-side token (never exposed to browser)
const sanityClient = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET || process.env.SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/api/upload', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File troppo grande (max 10MB)' });
      }
      return res.status(400).json({ error: err.message || 'File non valido' });
    }
    next();
  });
}, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nessun file ricevuto' });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN;
  if (!token) {
    console.error('SANITY_TOKEN non configurato');
    return res.status(500).json({ error: 'Configurazione server incompleta' });
  }

  try {
    const name = (req.body?.name || '').trim();
    const lastName = (req.body?.lastName || '').trim();
    const email = (req.body?.email || '').trim();
    const scoutGroup = (req.body?.scoutGroup || '').trim();

    if (!name || !lastName || !email || !scoutGroup) {
      return res.status(400).json({
        error: 'Compila tutti i campi: Nome, Cognome, Email, Gruppo Scout',
      });
    }

    const imageAsset = await sanityClient.assets.upload('image', req.file.buffer, {
      filename: req.file.originalname,
    });

    await sanityClient.create({
      _type: 'mappaPacePhoto',
      title: `${name} ${lastName} · ${scoutGroup}`,
      uploaderName: name,
      uploaderLastName: lastName,
      uploaderEmail: email,
      scoutGroup,
      uploadedAt: new Date().toISOString(),
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Errore upload Sanity:', err);
    const message = err?.message?.includes('Insufficient permissions')
      ? 'Permessi Sanity insufficienti. Verifica che il token abbia permessi Editor.'
      : 'Errore durante il caricamento. Riprova.';
    res.status(500).json({ error: message });
  }
});

// In production, serve static files from dist
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
