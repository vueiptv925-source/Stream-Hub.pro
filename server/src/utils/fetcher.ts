import axios, { AxiosRequestConfig } from 'axios';

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function getConfig(): AxiosRequestConfig {
  return {
    headers: {
      'User-Agent': getRandomUserAgent(),
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Referer': 'https://www.google.com/'
    },
    timeout: 15000,
    maxRedirects: 5,
    validateStatus: (status) => status < 500
  };
}

export async function fetchWithRetry(url: string, retries = 3): Promise<string> {
  const config = getConfig();

  for (let i = 0; i < retries; i++) {
    try {
      // First attempt: direct fetch (works on server environment)
      const response = await axios.get(url, config);

      if (response.status === 200) {
        const data = response.data;
        if (typeof data === 'string') {
          return data;
        }
        return JSON.stringify(data);
      }

      if (response.status === 403 || response.status === 429) {
        console.log(`⚠️ HTTP ${response.status} for ${url}, retry ${i + 1}...`);
        await new Promise(r => setTimeout(r, (i + 1) * 2000));
        continue;
      }

      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.log(`⚠️ Direct fetch failed for ${url}: ${error instanceof Error ? error.message : 'unknown'}`);

      // Second attempt: try proxy
      try {
        const PROXY_URL = 'https://api.allorigins.win/raw?url=';
        const proxyUrl = `${PROXY_URL}${encodeURIComponent(url)}`;
        const response = await axios.get(proxyUrl, config);
        if (response.status === 200) {
          const data = response.data;
          if (typeof data === 'string') return data;
          return JSON.stringify(data);
        }
      } catch (proxyError) {
        console.log(`⚠️ Proxy fetch also failed for ${url}`);
      }

      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1500));
    }
  }
  throw new Error(`فشل جلب ${url} بعد ${retries} محاولات`);
}
