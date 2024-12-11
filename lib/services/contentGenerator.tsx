import OpenAI from 'openai';

interface ContentGenerationParams {
  topic: string;
  keywords: string[];
  wordCount: number;
  tone?: 'professional' | 'casual' | 'academic';
}

interface GeneratedContent {
  title: string;
  content: string;
  metaDescription: string;
}

export class ContentGenerator {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateBulkContent(params: ContentGenerationParams[]): Promise<GeneratedContent[]> {
    const results: GeneratedContent[] = [];
    
    for (const param of params) {
      try {
        const result = await this.generateSingleContent(param);
        results.push(result);
      } catch (error) {
        console.error(`Error generating content for topic: ${param.topic}`, error);
      }
    }

    return results;
  }

  private async generateSingleContent(params: ContentGenerationParams): Promise<GeneratedContent> {
    const prompt = this.buildPrompt(params);
    
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    // Parse the response and format it
    const response = completion.choices[0].message.content;
    // Add parsing logic here

    return {
      title: '', // Parse from response
      content: '', // Parse from response
      metaDescription: '', // Parse from response
    };
  }

  private buildPrompt(params: ContentGenerationParams): string {
    return `Write an article about ${params.topic} with the following specifications:
    - Include these keywords: ${params.keywords.join(', ')}
    - Word count: ${params.wordCount}
    - Tone: ${params.tone || 'professional'}
    - Format: Include a title, main content, and meta description
    - Optimize for SEO`;
  }
}