import axios from 'axios';
import * as cheerio from 'cheerio';

interface MetaData {
  title?: string;
  excerpt?: string;
  thumbnail?: string;
}

export const scrapeMediumMeta = async (url: string): Promise<MetaData> => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);

    const title = $('meta[property="og:title"]').attr('content') || $('title').text();
    const excerpt = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
    const thumbnail = $('meta[property="og:image"]').attr('content');

    return {
      title: title?.trim(),
      excerpt: excerpt?.trim(),
      thumbnail: thumbnail
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {};
  }
};
