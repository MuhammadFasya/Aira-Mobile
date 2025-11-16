// Netlify Function: generate.js
// Simple proxy to a Generative model endpoint (e.g., Google Gemini)
// Protects your API key by keeping it server-side. Requires these env vars:
// - CLIENT_API_KEY : a shared secret the mobile app includes in X-API-KEY header
// - GEMINI_API_KEY : the API key or bearer token to call the Generative API
// - GEMINI_ENDPOINT: full URL to call (e.g. https://generativeai.googleapis.com/v1/models/YOUR_MODEL:generate)

exports.handler = async function (event, context) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY',
      },
      body: '',
    };
  }

  // Only allow POST from client
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const clientKey = (
      event.headers['x-api-key'] ||
      event.headers['X-API-KEY'] ||
      ''
    ).toString();
    if (
      !process.env.CLIENT_API_KEY ||
      clientKey !== process.env.CLIENT_API_KEY
    ) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    const payload = JSON.parse(event.body || '{}');
    const prompt = payload.prompt;
    if (!prompt)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing prompt' }),
      };

    const endpoint = process.env.GEMINI_ENDPOINT;
    const key = process.env.GEMINI_API_KEY;
    if (!endpoint || !key) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server not configured' }),
      };
    }

    // Forward request to Gemini (or your chosen generative endpoint)
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // many APIs accept Bearer token or API key in Authorization header; adjust if needed
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    };
  } catch (err) {
    console.error('function error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'internal_error' }),
    };
  }
};
