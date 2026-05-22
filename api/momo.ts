const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

function parseBody(body: unknown) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body as Record<string, unknown> | null;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY || '';
  const openaiOrg = process.env.OPENAI_ORG || '';
  const openaiProject = process.env.OPENAI_PROJECT || '';
  if (!apiKey) {
    res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
    return;
  }

  const payload = parseBody(req.body);
  if (!payload) {
    res.status(400).json({ error: 'Invalid JSON payload' });
    return;
  }

  const messages = Array.isArray((payload as any).messages) ? (payload as any).messages : null;
  if (!messages) {
    res.status(400).json({ error: 'Payload must include messages[]' });
    return;
  }

  const model = (payload as any).model || process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const temperature = typeof (payload as any).temperature === 'number' ? (payload as any).temperature : 0.7;
  const topP = typeof (payload as any).top_p === 'number' ? (payload as any).top_p : 0.95;
  const maxTokens = typeof (payload as any).max_tokens === 'number' ? (payload as any).max_tokens : 350;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    if (openaiOrg) {
      headers['OpenAI-Organization'] = openaiOrg;
    }

    if (openaiProject) {
      headers['OpenAI-Project'] = openaiProject;
    }

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages,
        temperature,
        top_p: topP,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({ error: errorText });
      return;
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      res.status(502).json({ error: 'OpenAI returned empty response' });
      return;
    }

    res.status(200).json({ reply, finish_reason: data?.choices?.[0]?.finish_reason ?? null });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Server error' });
  }
}
