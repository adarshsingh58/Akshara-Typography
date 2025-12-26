
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { FONTS } from './data.js';
import { License, User } from './types.js';
import path from 'path';

/**
 * --- ADVANCED ENFORCEMENT & AUDIT LAYER ---
 */
class PersistenceStore {
  private licenses = new Map<string, License>();
  private users = new Map<string, User>();
  private downloads = new Map<string, any[]>(); 
  private webfontLogs = new Map<string, any[]>();

  constructor() {
    this.users.set('USR-AKSHARA-101', {
      id: 'USR-AKSHARA-101',
      email: 'designer@akshara.in',
      name: 'Priya Sharma'
    });
  }

  async getUser(id: string) {
    return this.users.get(id);
  }

  async createLicense(data: Partial<License>): Promise<License> {
    const id = `LIC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const license: License = {
      id,
      userId: data.userId!,
      fontId: data.fontId!,
      licenseType: data.licenseType!,
      scope: (data.licenseType === 'OFL' ? 'all' : 'web') as any,
      domains: ['localhost', 'akshara.in', 'your-project.com'],
      issuedAt: new Date(),
      status: 'active',
      fingerprint: `SHA256-${Math.random().toString(36).substr(2, 12).toUpperCase()}`
    };
    this.licenses.set(id, license);
    return license;
  }

  async findLicenseForUser(userId: string, fontId: string) {
    return Array.from(this.licenses.values()).find(
      l => l.userId === userId && l.fontId === fontId && l.status === 'active'
    );
  }

  async findLicenseByDomain(fontId: string, domain: string) {
    return Array.from(this.licenses.values()).find(
      l => l.fontId === fontId && l.status === 'active' && l.domains.some(d => domain.includes(d))
    );
  }

  async auditDownload(licenseId: string, ip: string, userAgent: string) {
    const history = this.downloads.get(licenseId) || [];
    history.push({ timestamp: new Date(), ip, userAgent });
    this.downloads.set(licenseId, history);
  }

  async logWebfontRequest(fontId: string, origin: string, ip: string) {
    const logs = this.webfontLogs.get(fontId) || [];
    logs.push({ timestamp: new Date(), origin, ip });
    this.webfontLogs.set(fontId, logs);
  }
}

const db = new PersistenceStore();
const app = express();
const port = process.env.PORT || 3000;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * --- MIDDLEWARE ---
 */
app.use(cors() as any);
app.use(express.json() as any);

// Restricted static serving - NO PUBLIC ACCESS to fonts folder
// The folder is only accessible via the /api/webfont or /api/delivery routes

const requireIdentity = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Auth Required' });
  }
  const userId = authHeader.split(' ')[1];
  const user = await db.getUser(userId);
  if (!user) return res.status(403).json({ error: 'Invalid Identity' });
  req.user = user;
  next();
};

/**
 * --- ROUTES ---
 */

app.get('/api/fonts', (req: any, res: any) => res.json(FONTS));

// 1. DOMAIN-BOUND WEBFONT DELIVERY
// Used by @font-face { src: url(...) }
// No token needed, relies on Origin/Referer headers + License check
app.get('/api/webfonts/:fontId/:weight.woff2', async (req: any, res: any) => {
  const { fontId, weight } = req.params;
  const origin = req.headers.origin || req.headers.referer || 'unknown';
  
  // Simulation: Check if domain is authorized
  const license = await db.findLicenseByDomain(fontId, origin);
  const font = FONTS.find(f => f.id === fontId);

  // If font is OFL, always allow. Otherwise, require license.
  if (font?.licenseType !== 'OFL' && !license) {
    console.warn(`[BLOCKED] Webfont request for ${fontId} from unauthorized domain: ${origin}`);
    return res.status(403).end(); // Silent fail for webfonts
  }

  await db.logWebfontRequest(fontId, origin, req.ip);

  // In production, this would stream from a private S3 bucket
  // Here we serve the local file but only through this gated controller
  const filePath = path.join(process.cwd(), 'fonts', 'akshara-hind', `${weight}.woff2`);
  res.sendFile(filePath);
});

// 2. TIMED DOWNLOAD DELIVERY (Signed URL Simulation)
app.get('/api/delivery/:fontId', requireIdentity as any, async (req: any, res: any) => {
  const { fontId } = req.params;
  const user = req.user;
  const font = FONTS.find(f => f.id === fontId);
  
  if (!font) return res.status(404).json({ error: 'Asset not found' });

  const license = await db.findLicenseForUser(user.id, fontId);
  if (!license && font.price > 0) {
    return res.status(403).json({ error: 'License required' });
  }

  const licenseId = license?.id || 'OFL-FREE-TIER';
  await db.auditDownload(licenseId, req.ip, req.headers['user-agent']);

  // Generates a temporary access link (simulating signed URL)
  const tempToken = Math.random().toString(36).substr(2, 10);
  const secureUrl = `/api/download-execute/${fontId}/${tempToken}?lic=${licenseId}`;
  
  res.json({ 
    url: secureUrl, 
    expiresAt: new Date(Date.now() + 60000), // 1 minute expiry
    filename: `${font.id}-package.zip` 
  });
});

// 3. SECURE DOWNLOAD EXECUTION
app.get('/api/download-execute/:fontId/:token', async (req: any, res: any) => {
  // In real systems, validate token against a cache (Redis) with TTL
  const { fontId } = req.params;
  const filePath = path.join(process.cwd(), 'fonts', 'akshara-hind', 'regular.woff2');
  res.download(filePath, `${fontId}-regular.woff2`);
});

app.post('/api/license/provision', requireIdentity as any, async (req: any, res: any) => {
  const { fontId, licenseType } = req.body;
  const user = req.user;
  const existing = await db.findLicenseForUser(user.id, fontId);
  if (existing) return res.json({ success: true, license: existing, restored: true });

  setTimeout(async () => {
    const license = await db.createLicense({ fontId, licenseType, userId: user.id });
    res.json({ success: true, license });
  }, 1000);
});

app.post('/api/ai/insights', requireIdentity as any, async (req: any, res: any) => {
  const { headlineFont, bodyFont } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Why is the pairing of ${headlineFont} and ${bodyFont} suitable for a high-traffic bilingual news site?`,
      config: { systemInstruction: "Act as a typography consultant. Focus on weight balance and vertical rhythm. 50 words max." }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ error: 'AI Error' });
  }
});

app.listen(port, () => {
  console.log(`🔒 Akshara Secure Delivery Engine active on port ${port}`);
});
