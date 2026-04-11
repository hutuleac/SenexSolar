import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  billAmount: z.number().min(50).max(10000),
  propertyType: z.enum(['casa', 'firma', 'apartament']),
});

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { success: false, error: 'Date invalide' },
        { status: 400 }
      );
    }

    // Phase 1: Log and return success (no email yet)
    console.log('[Contact Form Submission]', {
      name: result.data.name,
      phone: result.data.phone,
      billAmount: result.data.billAmount,
      propertyType: result.data.propertyType,
      timestamp: new Date().toISOString(),
    });

    // Phase 2: Add Resend email delivery here
    // const resendApiKey = env.RESEND_API_KEY;
    // await fetch('https://api.resend.com/emails', { ... });

    return Response.json({
      success: true,
      message: 'Mesajul a fost primit. Vă vom contacta în maxim 24 de ore.',
    });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Eroare internă. Vă rugăm să ne contactați direct.' },
      { status: 500 }
    );
  }
};
