import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, attendance, guestCount } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email tidak ditemukan' }, { status: 400 });
    }

    const isHadir = attendance === 'hadir';
    const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Juan';
    const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Indri';
    const venueName = process.env.NEXT_PUBLIC_VENUE_NAME || 'GKPB Jemaat Hosana, Kwanji';
    const venueAddress = process.env.NEXT_PUBLIC_VENUE_ADDRESS || '';

    // Subjek dan isi email berdasarkan kehadiran
    const subject = isHadir 
      ? `Konfirmasi Kehadiran - Pernikahan ${groomName} & ${brideName}` 
      : `Terima Kasih atas Konfirmasinya - Pernikahan ${groomName} & ${brideName}`;

    const htmlContent = isHadir ? `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #795548; text-align: center;">Terima Kasih, ${name}!</h2>
        <p>Kami sangat bersyukur dan bahagia atas konfirmasi kehadiran Anda (${guestCount} orang) pada hari spesial kami.</p>
        <div style="background-color: #f9f6f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>📅 Acara:</strong> Pernikahan ${groomName} & ${brideName}</p>
          <p><strong>📍 Lokasi:</strong> ${venueName}</p>
          <p><strong>🗺️ Alamat:</strong> ${venueAddress}</p>
        </div>
        <p>Kehadiran serta doa restu Anda adalah hadiah terindah bagi kami.</p>
        <p style="text-align: center; margin-top: 30px; color: #888; font-size: 12px;">Pesan otomatis dari Undangan Pernikahan ${groomName} & ${brideName}</p>
      </div>
    ` : `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #795548; text-align: center;">Terima Kasih, ${name}!</h2>
        <p>Kami telah menerima konfirmasi Anda. Meskipun Anda berhalangan hadir, doa dan restu yang Anda berikan sangat berarti bagi kami.</p>
        <p>Semoga kebaikan senantiasa menyertai Anda.</p>
        <p style="text-align: center; margin-top: 30px; color: #888; font-size: 12px;">Pesan otomatis dari Undangan Pernikahan ${groomName} & ${brideName}</p>
      </div>
    `;

    // Kirim email menggunakan Resend
    // Catatan: Gunakan onboarding@resend.dev jika belum mendaftarkan domain sendiri di Resend
    const data = await resend.emails.send({
      from: 'Wedding Invitation <onboarding@resend.dev>',
      to: [email],
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Gagal mengirim email' }, { status: 500 });
  }
}