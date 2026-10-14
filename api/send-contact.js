// Kontaktskjemaet på gronntrost.no -> e-post til post@gronntrost.no.
// Herdet etter RAPPORT-T50 funn 7: validering med presise norske
// feilmeldinger, maks-lengder, honningfelt mot roboter (avvises stille),
// enkel per-IP rate-limit (samme mønster som CRM-ens api/_lib/ratelimit.mjs)
// og CORS låst til https://gronntrost.no. Mottakeren er alltid
// post@gronntrost.no; Resend kalles direkte (RESEND_API_BASE er test-overstyring).

const ALLOWED_ORIGIN = 'https://gronntrost.no';
const MAX = { fornavn: 100, etternavn: 100, epost: 200, telefon: 30, kirkegard: 200, emne: 100, melding: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Per-IP teller i minnet (per serverless-instans — bevisst enkelt, som i CRM-en).
const WINDOW_MS = 10 * 60_000;
const LIMIT = 5;
const hits = new Map();
function allowed(ip) {
  const now = Date.now();
  const entry = hits.get(ip) || { start: now, count: 0 };
  if (now - entry.start > WINDOW_MS) { entry.start = now; entry.count = 0; }
  entry.count += 1;
  hits.set(ip, entry);
  if (hits.size > 5000) hits.clear(); // never grow without bound
  return entry.count <= LIMIT;
}

function clientIp(req) {
  const header = req.headers['x-forwarded-for'];
  return (typeof header === 'string' && header.split(',')[0].trim()) || req.socket?.remoteAddress || 'unknown';
}

const clamp = (value, max) => String(value ?? '').trim().slice(0, max);

// Everything the visitor typed is escaped before it goes into the HTML mail.
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async (req, res) => {
  // CORS: bare nettsiden selv (requests uten Origin er same-origin/servere).
  const origin = req.headers.origin;
  if (!origin || origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Metoden støttes ikke.' });

  if (!allowed(clientIp(req))) {
    return res.status(429).json({ success: false, error: 'For mange meldinger på kort tid. Vent noen minutter og prøv igjen.' });
  }

  try {
    const b = req.body && typeof req.body === 'object' ? req.body : {};

    // Honningfelt: mennesker ser det ikke; en robot som fyller det ut får
    // et stille «ok» uten at noe sendes.
    if (clamp(b.nettside, 200)) return res.status(200).json({ success: true });

    const fornavn = clamp(b.fornavn, MAX.fornavn);
    const etternavn = clamp(b.etternavn, MAX.etternavn);
    const epost = clamp(b.epost, MAX.epost);
    const telefon = clamp(b.telefon, MAX.telefon);
    const kirkegard = clamp(b.kirkegard, MAX.kirkegard);
    const emne = clamp(b.emne || b.tjeneste, MAX.emne) || 'Annet'; // «tjeneste» = old form field
    const melding = clamp(b.melding, MAX.melding);

    if (!fornavn) return res.status(400).json({ success: false, error: 'Skriv navnet ditt.' });
    if (!EMAIL_RE.test(epost)) return res.status(400).json({ success: false, error: 'Skriv inn en gyldig e-postadresse.' });
    if (!melding) return res.status(400).json({ success: false, error: 'Skriv en liten melding, så vet vi hva det gjelder.' });

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error('send-contact: RESEND_API_KEY is missing');
      return res.status(500).json({ success: false, error: 'Noe gikk galt ved sending. Prøv igjen.' });
    }
    const base = process.env.RESEND_API_BASE || 'https://api.resend.com';
    const mail = await fetch(`${base}/emails`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'post@gronntrost.no',
        to: ['post@gronntrost.no'],
        reply_to: epost, // «Svar» in the mail program answers the visitor directly
        subject: `${emne} – melding fra ${fornavn} ${etternavn}`.trim(),
        html: `
          <h2>Ny melding fra kontaktskjemaet</h2>
          <p><strong>Emne:</strong> ${esc(emne)}</p>
          <p><strong>Navn:</strong> ${esc(fornavn)} ${esc(etternavn)}</p>
          <p><strong>E-post:</strong> ${esc(epost)}</p>
          <p><strong>Telefon:</strong> ${esc(telefon) || 'Ikke oppgitt'}</p>
          <p><strong>Kirkegård / sted:</strong> ${esc(kirkegard) || 'Ikke oppgitt'}</p>
          <p><strong>Melding:</strong><br>${esc(melding).replace(/\n/g, '<br>')}</p>
        `,
      }),
    });
    if (!mail.ok) {
      console.error('send-contact: Resend', mail.status, await mail.text().catch(() => ''));
      return res.status(502).json({ success: false, error: 'Noe gikk galt ved sending. Prøv igjen.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Noe gikk galt ved sending. Prøv igjen.' });
  }
};
