
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { FONTS, PAIRINGS } from './data.js';

const app = express();
const port = process.env.PORT || 3000;

// Fix: Initialize Gemini using the environment variable directly as required by the @google/genai guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Use casting to any for middleware to resolve Type mismatch between express and cors/body-parser which causes the "NextHandleFunction not assignable to PathParams" error
app.use(cors() as any);
app.use(express.json() as any); 

// --- API Routes ---

// 1. Get all fonts (Source of Truth)
app.get('/api/fonts', (req, res) => {
  res.json(FONTS);
});

// 2. AI Font Pairing Insights
app.post('/api/ai/insights', async (req, res) => {
  const { headlineFont, bodyFont } = req.body;

  if (!headlineFont || !bodyFont) {
    return res.status(400).json({ error: 'Missing font parameters' });
  }

  try {
    // Fix: Use the recommended gemini-3-flash-preview model for text generation tasks
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain why the typography pairing of "${headlineFont}" and "${bodyFont}" works for a bilingual Hindi-English website. Discuss stroke contrast and readability. Max 80 words.`,
    });
    
    // Fix: Directly access the .text property on the GenerateContentResponse object
    res.json({ text: response.text });
  } catch (error) {
    console.error('Gemini Backend Error:', error);
    res.status(500).json({ error: 'Failed to generate AI insights' });
  }
});

// 3. Mock Payment/License Intent
app.post('/api/license/create', (req, res) => {
  const { fontId, licenseType } = req.body;
  // In a real app, this would create a Stripe/Razorpay session
  res.json({
    orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    status: 'pending',
    message: 'Payment session created'
  });
});

app.listen(port, () => {
  console.log(`Akshara Backend running at http://localhost:${port}`);
});
