import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Générer 3 images séquentiellement car DALL-E 3 ne supporte que n=1
    const images = await Promise.all([
      openai.images.generate({
        model: "dall-e-3",
        prompt: prompt + " (Variation 1)",
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural",
      }),
      openai.images.generate({
        model: "dall-e-3",
        prompt: prompt + " (Variation 2)",
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural",
      }),
      openai.images.generate({
        model: "dall-e-3",
        prompt: prompt + " (Variation 3)",
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural",
      })
    ]);

    // Extraire les URLs des images
    const imageUrls = images.map(response => response.data[0]);
    return NextResponse.json({ images: imageUrls });

  } catch (error) {
    console.error('Error generating images:', error);
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    );
  }
}
