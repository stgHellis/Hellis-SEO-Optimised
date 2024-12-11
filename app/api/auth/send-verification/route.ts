import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { userId, email } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.emailVerified) {
      return NextResponse.json(
        { success: false, message: 'Invalid request' },
        { status: 400 }
      );
    }

    // Créer le lien de vérification
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${user.verificationToken}`;

    // Envoyer l'email
    await resend.emails.send({
      from: 'Hellis SEO <noreply@hellisseo.com>',
      to: email,
      subject: 'Verify your email address',
      html: `
        <h1>Welcome to Hellis SEO!</h1>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>If you didn't create this account, you can safely ignore this email.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification email sent',
    });
  } catch (error) {
    console.error('Send verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}