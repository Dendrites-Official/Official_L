// Mailgun REST API — no SDK needed
// Required env vars (set in Vercel dashboard):
//   MAILGUN_API_KEY   — your Mailgun API key (starts with key-...)
//   MAILGUN_DOMAIN    — your sending domain   (e.g. mg.dendrites.ai or dendrites.ai)
//   MAILGUN_REGION    — 'us' or 'eu'  (default: 'us')

const TO_EMAIL = 'careers@dendrites.ai';
const FROM_ADDRESS = 'Dendrites Careers <careers@dendrites.ai>';

function row(label: string, value: string) {
  if (!value || value === 'Not provided') {
    return `<tr>
      <td style="padding:8px 12px;font-weight:600;color:#9ca3af;white-space:nowrap;vertical-align:top;border-bottom:1px solid #1f2937;">${label}</td>
      <td style="padding:8px 12px;color:#6b7280;border-bottom:1px solid #1f2937;font-style:italic;">Not provided</td>
    </tr>`;
  }
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;color:#d1d5db;white-space:nowrap;vertical-align:top;border-bottom:1px solid #1f2937;">${label}</td>
    <td style="padding:8px 12px;color:#f3f4f6;border-bottom:1px solid #1f2937;">${value.replace(/\n/g, '<br/>')}</td>
  </tr>`;
}

function section(title: string, rows: string) {
  return `
    <tr><td colspan="2" style="padding:16px 12px 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#6b7280;font-weight:700;">${title}</td></tr>
    ${rows}
  `;
}

function buildHtml(data: Record<string, string>) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#030712;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#030712;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:12px;overflow:hidden;border:1px solid #1e293b;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e3a8a,#1d4ed8);padding:28px 32px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#93c5fd;">New Internship Application</p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">${data['Role'] || 'Unknown Role'}</h1>
            <p style="margin:8px 0 0;font-size:14px;color:#bfdbfe;">${data['Full Name']} &bull; ${data['Email']}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:8px 20px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

            ${section('Basic Information',
              row('Full Name', data['Full Name']) +
              row('Email', data['Email']) +
              row('Phone', data['Phone']) +
              row('Location / Timezone', data['Location / Timezone'])
            )}

            ${section('Online Profiles',
              row('LinkedIn', data['LinkedIn']) +
              row('GitHub', data['GitHub']) +
              row('Portfolio', data['Portfolio'])
            )}

            ${section('Experience & Skills',
              row('Experience Level', data['Experience Level']) +
              row('Skills', data['Skills'])
            )}

            ${section('Application Questions',
              row('Why Dendrites', data['Why Dendrites']) +
              row('Proud Project', data['Proud Project']) +
              row('Role-Specific Answer', data['Role-Specific Answer'])
            )}

            ${section('Logistics',
              row('Start Date', data['Start Date']) +
              row('Salary Expectation', data['Salary Expectation']) +
              row('How They Heard', data['How They Heard'])
            )}

            ${section('Documents',
              row('Resume', data['Resume File'] || 'See attachment') +
              row('Additional Doc', data['Additional Doc'] || 'Not provided')
            )}

          </table>
        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;background:#020617;border-top:1px solid #1e293b;">
            <p style="margin:0;font-size:12px;color:#4b5563;">
              Sent via Dendrites Careers &bull; Reply to this email to contact the applicant directly.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    res.status(500).json({ error: 'MAILGUN_API_KEY or MAILGUN_DOMAIN is not configured.' });
    return;
  }

  let body: any;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const { fields = {}, resumeBase64, resumeName, additionalDocBase64, additionalDocName } = body;

  if (!fields['Full Name'] || !fields['Email']) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  try {
    const apiKey = process.env.MAILGUN_API_KEY || '';
    const domain = process.env.MAILGUN_DOMAIN || '';
    const region = (process.env.MAILGUN_REGION || 'us').toLowerCase();

    if (!apiKey || !domain) {
      res.status(500).json({ error: 'MAILGUN_API_KEY or MAILGUN_DOMAIN is not configured.' });
      return;
    }

    const baseUrl = region === 'eu'
      ? `https://api.eu.mailgun.net/v3/${domain}/messages`
      : `https://api.mailgun.net/v3/${domain}/messages`;

    const auth = Buffer.from(`api:${apiKey}`).toString('base64');

    // Build multipart form — required for file attachments
    const form = new FormData();
    form.append('from', FROM_ADDRESS);
    form.append('to', TO_EMAIL);
    form.append('h:Reply-To', `${fields['Full Name']} <${fields['Email']}>`);
    form.append('subject', `New Application: ${fields['Role'] || 'Internship'} — ${fields['Full Name']}`);
    form.append('html', buildHtml(fields));

    // Attach actual files
    if (resumeBase64 && resumeName) {
      const buf = Buffer.from(resumeBase64, 'base64');
      form.append('attachment', new Blob([buf]), resumeName);
    }
    if (additionalDocBase64 && additionalDocName) {
      const buf = Buffer.from(additionalDocBase64, 'base64');
      form.append('attachment', new Blob([buf]), additionalDocName);
    }

    const mgRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}` },
      body: form,
    });

    if (!mgRes.ok) {
      const detail = await mgRes.text();
      throw new Error(`Mailgun error ${mgRes.status}: ${detail}`);
    }

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Mailgun error:', err);
    res.status(500).json({ error: 'Failed to send email.', detail: err?.message });
  }
}
