Netlify function proxy + quick deployment notes

This folder contains a simple Netlify serverless function `generate.js` which acts as a secure proxy to a generative AI endpoint (for example Google Gemini's Generative API).

Why use this proxy

- Keeps your model API key / tokens server-side (not embedded in the mobile app).
- Lets you add rate-limiting, logging, and auth checks before forwarding requests to the model.
- Easy to deploy on Netlify (serverless) and inexpensive for low traffic.

Required environment variables (set these in Netlify Dashboard > Site settings > Build & deploy > Environment):

- CLIENT_API_KEY (string) : a secret that your mobile app will send in `X-API-KEY` header so the function accepts the request.
- GEMINI_API_KEY (string) : the API key / token used when calling the generative model endpoint.
- GEMINI_ENDPOINT (string) : the full URL to the generative endpoint, e.g. `https://generativeai.googleapis.com/v1/models/YOUR_MODEL:generate`

Request format (from the mobile app)

- POST /.netlify/functions/generate
- Headers: { 'Content-Type': 'application/json', 'X-API-KEY': '<CLIENT_API_KEY>' }
- Body: JSON payload suited for your model, e.g. { "prompt": "Say hello" }

Example fetch from React Native (replace <NETLIFY_BASE_URL> with your Netlify site):

fetch('https://<YOUR_NETLIFY_SITE>/.netlify/functions/generate', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'X-API-KEY': '<CLIENT_API_KEY>'
},
body: JSON.stringify({ prompt: 'Hello, Aira' })
})
.then(r => r.json())
.then(data => console.log(data))
.catch(console.error)

Notes about Google Gemini (or other providers)

- The function currently forwards the request with `Authorization: Bearer ${GEMINI_API_KEY}`. If your provider requires a different authentication method, change the function accordingly.
- If you use a Google Service Account, you may prefer to generate access tokens server-side using `google-auth-library` and a service account JSON stored in Netlify env (or better, in a managed secret store). That requires adding the library and slightly different code flow.

Adding a user database and auth (recommended next steps)

- I recommend using Supabase for an integrated, budget-friendly solution:
  - Supabase provides Auth (email/password, OAuth), Postgres DB, and storage.
  - Free tier is generous for prototyping.
- Minimal user table (Postgres SQL):

CREATE TABLE users (
id uuid primary key default gen_random_uuid(),
email text unique not null,
name text,
created_at timestamptz default now(),
role text default 'user'
);

- Supabase + Netlify example flow:
  - Use Supabase Auth on client for sign-up/login. Supabase issues JWTs.
  - Client includes Supabase JWT (Authorization: Bearer <token>) when calling serverless function.
  - Netlify function validates JWT with Supabase's public key (or call Supabase admin endpoint) and extracts user id.
  - Function enforces per-user rate limits, logs usage in DB, and then forwards to Gemini.

Security & cost tips

- Never commit API keys or service-account JSON to the repo.
- Use per-user quotas and rate limits to prevent accidental high usage.
- Monitor billing on the model provider and set alerts.

Want me to scaffold a Netlify + Supabase example (function + sample client usage + SQL migrations)? Reply yes and I will add a serverless function variant that validates Supabase JWT and a sample SQL migration file.
