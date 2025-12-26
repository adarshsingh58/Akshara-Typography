
const BACKEND_URL = 'http://localhost:3000/api';
const MOCK_TOKEN = 'Bearer akshara_demo_token_12345';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': MOCK_TOKEN
});

export const getPairingInsights = async (headlineFontName: string, bodyFontName: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/ai/insights`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ headlineFont: headlineFontName, bodyFont: bodyFontName })
    });
    const data = await response.json();
    return data.text;
  } catch (error) {
    return "This pairing offers great bilingual harmony.";
  }
};

export const createLicenseSession = async (fontId: string, licenseType: string) => {
  const response = await fetch(`${BACKEND_URL}/license/session`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ fontId, licenseType })
  });
  return response.json();
};

export const getDownloadLink = async (fontId: string) => {
  const response = await fetch(`${BACKEND_URL}/download/${fontId}`, {
    headers: getHeaders()
  });
  return response.json();
};
