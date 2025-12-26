
const BACKEND_URL = 'http://localhost:3000/api';
// In a real app, this would be dynamic after login
const MOCK_IDENTITY_TOKEN = 'Bearer USR-AKSHARA-101';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': MOCK_IDENTITY_TOKEN
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
  const response = await fetch(`${BACKEND_URL}/license/provision`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ fontId, licenseType })
  });
  return response.json();
};

export const getSecureDownloadLink = async (fontId: string) => {
  const response = await fetch(`${BACKEND_URL}/delivery/${fontId}`, {
    headers: getHeaders()
  });
  return response.json();
};
