// Utility functions to generate PKCE code verifier and code challenge

// Generates a random string of specified length
function generateRandomString(length) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

// Encodes the string in base64 and replaces URL-unfriendly characters
async function sha256(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Generate PKCE code verifier and code challenge
export async function generatePkcePair() {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await sha256(codeVerifier);
  return { codeVerifier, codeChallenge };
}
