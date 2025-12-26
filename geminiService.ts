
/**
 * Frontend Service for interacting with the Node.js Backend.
 * Note: In development, this assumes the server is running on localhost:3000.
 */

const BACKEND_URL = 'http://localhost:3000/api';

export const getPairingInsights = async (headlineFontName: string, bodyFontName: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/ai/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        headlineFont: headlineFontName, 
        bodyFont: bodyFontName 
      })
    });

    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Backend Insight Error:", error);
    // Fallback logic if backend is unavailable
    return "This pairing provides a harmonious balance between traditional Devanagari forms and modern Latin geometry, ensuring seamless bilingual readability.";
  }
};

export const createLicenseSession = async (fontId: string, licenseType: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/license/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fontId, licenseType })
    });
    return await response.json();
  } catch (error) {
    console.error("License Session Error:", error);
    return null;
  }
};
