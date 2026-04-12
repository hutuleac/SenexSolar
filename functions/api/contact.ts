import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  billAmount: z.number().min(50).max(10000),
  propertyType: z.enum(['casa', 'firma', 'apartament']),
  turnstileToken: z.string().min(1),
});

interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { success: false, error: 'Date invalide' },
        { status: 400 }
      );
    }

    const { name, phone, billAmount, propertyType, turnstileToken } = result.data;

    // Validate Turnstile token
    if (env.TURNSTILE_SECRET_KEY) {
      const tsRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
            remoteip: request.headers.get('CF-Connecting-IP') ?? undefined,
          }),
        }
      );
      const tsResult = await tsRes.json() as { success: boolean };
      if (!tsResult.success) {
        return Response.json(
          { success: false, error: 'Verificare CAPTCHA eșuată. Reîncercați.' },
          { status: 400 }
        );
      }
    }

    // Send email via Resend if API key is configured
    if (env.RESEND_API_KEY) {
      const propertyLabel = { casa: 'Casă', firma: 'Firmă / Hală', apartament: 'Apartament' }[propertyType];

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Senex Solar Power <onboarding@resend.dev>',
          to: ['Senexest@gmail.com', 'smart7automation@gmail.com'],
          subject: `Cerere ofertă nouă — ${name}`,
          html: `
            <h2>Cerere ofertă nouă de pe site</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nume</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Factură lunară</td><td style="padding:8px;border:1px solid #ddd">${billAmount} RON/lună</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Tip proprietate</td><td style="padding:8px;border:1px solid #ddd">${propertyLabel}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Data</td><td style="padding:8px;border:1px solid #ddd">${new Date().toLocaleString('ro-RO')}</td></tr>
            </table>
            <p style="margin-top:16px;color:#666">Trimis de pe <a href="https://senexsolar.pages.dev">senexsolar.pages.dev</a></p>
          `,
        }),
      });
    }

    return Response.json({
      success: true,
      message: 'Mesajul a fost primit. Vă vom contacta în maxim 24 de ore.',
    });
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return Response.json(
      { success: false, error: 'Eroare internă. Vă rugăm să ne contactați direct.' },
      { status: 500 }
    );
  }
};
