import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { keywords, language } = await req.json();

    const prompt = `Please ignore all previous instructions. You are an expert copywriter who writes catchy titles for articles. You have a Informative tone of voice. You have a Persuasive writing style. Write 10 catchy article titles with a hook for the topic "${keywords.join(', ')}". The titles should be in the ${language}. Do not self reference. Do not explain what you are doing.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const titles = completion.choices[0].message.content?.split('\n').filter(title => title.trim()) || [];

    return NextResponse.json({ titles });
  } catch (error) {
    console.error('Error generating titles:', error);
    return NextResponse.json({ error: 'Failed to generate titles' }, { status: 500 });
  }
}
