interface WordPressConfig {
    siteUrl: string;
    username: string;
    password: string;
  }
  
  interface PostData {
    title: string;
    content: string;
    excerpt?: string;
    status?: 'publish' | 'draft' | 'private';
    categories?: number[];
    tags?: number[];
  }
  
  export class WordPressIntegration {
    private config: WordPressConfig;
    private baseUrl: string;
  
    constructor(config: WordPressConfig) {
      this.config = config;
      this.baseUrl = `${config.siteUrl}/wp-json/wp/v2`;
    }
  
    async publishPost(postData: PostData): Promise<any> {
      const auth = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');
  
      try {
        const response = await fetch(`${this.baseUrl}/posts`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: postData.title,
            content: postData.content,
            excerpt: postData.excerpt,
            status: postData.status || 'draft',
            categories: postData.categories,
            tags: postData.tags,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`WordPress API error: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error publishing to WordPress:', error);
        throw error;
      }
    }
  
    async publishBulkPosts(posts: PostData[]): Promise<any[]> {
      const results = [];
      
      for (const post of posts) {
        try {
          const result = await this.publishPost(post);
          results.push(result);
        } catch (error) {
          console.error(`Error publishing post: ${post.title}`, error);
          results.push({ error, title: post.title });
        }
      }
  
      return results;
    }
  }