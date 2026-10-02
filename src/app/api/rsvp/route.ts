import { NextRequest, NextResponse } from 'next/server';
import { addWish, getWishes } from '@/lib/wishStore';
import { WishEntry, RSVPFormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: RSVPFormData & { formattedWish?: string } = await request.json();
    const { name, email, attendance, guestCount, wish, formattedWish } = body;

    if (!name || !email || !attendance) {
      return NextResponse.json(
        { success: false, error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const entry: WishEntry = {
      id: Date.now().toString(),
      name,
      originalWish: wish || '',
      formattedWish: formattedWish || wish || '',
      isFormatted: !!formattedWish && formattedWish !== wish,
      timestamp: new Date().toISOString(),
      attendance,
    };

    if (wish) {
      addWish(entry);
    }

    // In production: send confirmation email, save to DB, etc.
    console.log('RSVP received:', { name, email, attendance, guestCount });

    return NextResponse.json({
      success: true,
      message: `Terima kasih, ${name}! RSVP Anda telah kami terima.`,
      wishId: entry.id,
    });
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process RSVP' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const wishes = getWishes();
  return NextResponse.json({ success: true, wishes });
}
