const { Resend } = require('resend');

// Everything the visitor typed is escaped before it goes into the HTML mail.
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { fornavn, etternavn, epost, telefon, kirkegard, melding } = req.body;
    const emne = req.body.emne || req.body.tjeneste || 'Annet'; // «tjeneste» = old form field

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'post@gronntrost.no',
      to: 'post@gronntrost.no',
      reply_to: epost, // «Svar» in the mail program answers the visitor directly
      subject: `${emne} – melding fra ${fornavn} ${etternavn}`,
      html: `
        <h2>Ny melding fra kontaktskjemaet</h2>
        <p><strong>Emne:</strong> ${esc(emne)}</p>
        <p><strong>Navn:</strong> ${esc(fornavn)} ${esc(etternavn)}</p>
        <p><strong>E-post:</strong> ${esc(epost)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon) || 'Ikke oppgitt'}</p>
        <p><strong>Kirkegård / sted:</strong> ${esc(kirkegard) || 'Ikke oppgitt'}</p>
        <p><strong>Melding:</strong><br>${esc(melding).replace(/\n/g, '<br>') || 'Ingen melding'}</p>
      `
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
