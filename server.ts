
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { FONTS } from './data.js';

/**
 * --- PERSISTENCE LAYER (MOCK) ---
 */
class PersistenceStore {
  private licenses = new Map<string, any>();

  async createLicense(data: any) {
    const id = `LIC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const record = { ...data, id, createdAt: new Date() };
    this.licenses.set(id, record);
    return record;
  }

  async getLicense(id: string) {
    return this.licenses.get(id);
  }
}

const db = new PersistenceStore();
const app = express();
const port = process.env.PORT || 3000;

// Initialize GoogleGenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * --- MIDDLEWARE ---
 */
app.use(cors() as any);
app.use(express.json() as any);

// Serve local fonts directory - This makes the fonts "real"
app.use('/fonts', express.static('fonts') as any);

const requireAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

const rateLimits = new Map<string, { count: number, lastReset: number }>();
const LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 30;

const simpleRateLimiter = (req: any, res: any, next: any) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const userData = rateLimits.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > LIMIT_WINDOW) {
    userData.count = 0;
    userData.lastReset = now;
  }

  userData.count++;
  rateLimits.set(ip, userData);

  if (userData.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  next();
};

app.use(simpleRateLimiter as any);

/**
 * --- ROUTES ---
 */

app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/fonts', (req: any, res: any) => {
  res.json(FONTS);
});

// Generate AI Analysis
app.post('/api/ai/insights', requireAuth as any, async (req: any, res: any) => {
  const { headlineFont, bodyFont } = req.body;
  if (!headlineFont || !bodyFont) return res.status(400).json({ error: 'Missing fonts' });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Typography analysis for pairing: ${headlineFont} & ${bodyFont}`,
      config: {
        systemInstruction: "You are a professional typography consultant. Explain why these two fonts work for Hindi/English content. Focus on x-height, stroke, and mood. 50 words max.",
      },
    });
    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ error: 'AI failed' });
  }
});

// Simulate License Creation
app.post('/api/license/session', requireAuth as any, async (req: any, res: any) => {
  const { fontId, licenseType } = req.body;
  
  // Simulate heavy processing/payment check
  setTimeout(async () => {
    const license = await db.createLicense({ fontId, licenseType });
    res.json({ success: true, license });
  }, 1500);
});

// Simulate Secure Download Link Generation
app.get('/api/download/:fontId', requireAuth as any, (req: any, res: any) => {
  const { fontId } = req.params;
  const font = FONTS.find(f => f.id === fontId);
  
  if (!font) return res.status(404).json({ error: 'Font not found' });

  // Simulate a "Signed URL" that would expire
  const signedUrl = `/fonts/akshara-hind/regular.woff2?token=${Math.random().toString(36).substr(2)}`;
  res.json({ downloadUrl: signedUrl, filename: `${font.id}-regular.woff2` });
});

app.listen(port, () => {
  console.log(`🚀 Akshara Real Font Engine running on port ${port}`);
});
