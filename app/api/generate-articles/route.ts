import { NextResponse } from 'next/server';
import { ARTICLE_PROMPT } from '@/app/prompt-articles';

export async function POST(request: Request) {
  try {
    const { topics, language } = await request.json();

    // Simulate API call to AI service (replace with actual AI service integration)
    const generateArticle = async (topic: string) => {
      const prompt = ARTICLE_PROMPT.replace('[TOPIC]', topic);
      // TODO: Replace with actual AI service call
      return {
        title: `Article about ${topic}`,
        content: `Generated content for ${topic}...`,
      };
    };

    // Generate articles for all topics
    const articles = await Promise.all(
      topics.map(async (topic: string) => {
        const article = await generateArticle(topic);
        return {
          topic,
          ...article,
        };
      })
    );

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error generating articles:', error);
    return NextResponse.json(
      { error: 'Failed to generate articles' },
      { status: 500 }
    );
  }
}
