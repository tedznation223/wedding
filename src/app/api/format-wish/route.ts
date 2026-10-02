import { GoogleGenerativeAI } from '@google/generative-ai';

import { NextRequest, NextResponse } from 'next/server';



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyAL8WgQpa_LfA5OINZi4lurhjmoWTAxylo');



export async function POST(request: NextRequest) {

  try {

    const { name, wish } = await request.json();



    if (!wish || typeof wish !== 'string') {

      return NextResponse.json(

        { success: false, error: 'Wish text is required' },

        { status: 400 }

      );

    }



    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'AIzaSyAL8WgQpa_LfA5OINZi4lurhjmoWTAxylo') {

      return NextResponse.json(

        {

          success: false,

          error: 'Gemini API key not configured',

        },

        { status: 503 }

      );

    }



    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });



    const prompt = `Kamu adalah seorang penulis kreatif yang ahli dalam merangkai kata-kata indah dan puitis.



Tugasmu: Ubah ucapan selamat pernikahan dari tamu berikut menjadi lebih indah, hangat, puitis, dan menyentuh hati.



Pedoman:

Pertahankan makna asli dan ketulusan dari pesan aslinya
Buat menjadi lebih puitis, mengalir, dan menyentuh hati
Gunakan bahasa Indonesia yang halus dan elegan
Panjang sekitar 2-3 kalimat yang padat makna
Jangan tambahkan nama tamu atau salam pembuka/penutup
Langsung tulis ucapan yang sudah diperindah, tanpa penjelasan apapun


Nama tamu: ${name || 'Tamu'}

Ucapan asli: "${wish}"



Ucapan yang diperindah:`;



    const result = await model.generateContent(prompt);

    const response = await result.response;

    const formattedWish = response.text().trim();



    if (!formattedWish) {

      throw new Error('Empty response from Gemini');

    }



    return NextResponse.json({ success: true, formattedWish });

  } catch (error) {

    console.error('Error formatting wish:', error);

    return NextResponse.json(

      {

        success: false,

        error: 'Failed to format wish. Please try again.',

      },

      { status: 500 }

    );

  }

} 