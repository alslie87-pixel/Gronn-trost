const { Resend } = require('resend');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { fornavn, etternavn, epost, telefon, kirkegard, tjeneste, melding } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'post@gronntrost.no',
      to: 'post@gronntrost.no',
      subject: `Ny forespørsel fra ${fornavn} ${etternavn}`,
      html: `
        <h2>Ny kontaktforespørsel</h2>
        <p><strong>Navn:</strong> ${fornavn} ${etternavn}</p>
        <p><strong>E-post:</strong> ${epost}</p>
        <p><strong>Telefon:</strong> ${telefon || 'Ikke oppgitt'}</p>
        <p><strong>Kirkegård:</strong> ${kirkegard}</p>
        <p><strong>Tjeneste:</strong> ${tjeneste}</p>
        <p><strong>Melding:</strong> ${melding || 'Ingen melding'}</p>
      `
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
