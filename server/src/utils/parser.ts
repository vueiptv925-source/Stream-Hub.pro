import { Subtitle } from '../types';
import { fetchWithRetry } from './fetcher';

export function extractM3u8(html: string): string | null {
  const patterns = [
    /https?:\/\/[^\s<>"']+\.m3u8[^\s<>"']*/i,
    /"file"\s*:\s*"([^"]+\.m3u8[^"]*)"/i,
    /"url"\s*:\s*"([^"]+\.m3u8[^"]*)"/i,
    /src\s*:\s*"([^"]+\.m3u8[^"]*)"/i,
    /'file'\s*:\s*'([^']+\.m3u8[^']*)'/i,
    /'src'\s*:\s*'([^']+\.m3u8[^']*)'/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const val = match[1] || match[0];
      if (val.startsWith('http')) return val;
      // Handle protocol-relative URLs
      if (val.startsWith('//')) return 'https:' + val;
      return val;
    }
  }

  // Also check for src in script/data tags
  const srcMatch = html.match(/src\s*[:=]\s*["']([^"']*\.m3u8[^"']*)["']/i);
  if (srcMatch) {
    const val = srcMatch[1];
    if (val.startsWith('http')) return val;
    if (val.startsWith('//')) return 'https:' + val;
    return val;
  }

  return null;
}

export function extractIframeUrls(html: string): string[] {
  const iframes: string[] = [];
  const regex = /<iframe[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    iframes.push(match[1]);
  }
  return iframes;
}

// Resolve relative URLs to absolute
function resolveUrl(base: string, relative: string): string {
  if (relative.startsWith('http://') || relative.startsWith('https://')) return relative;
  if (relative.startsWith('//')) return 'https:' + relative;
  if (relative.startsWith('/')) {
    const urlObj = new URL(base);
    return `${urlObj.protocol}//${urlObj.hostname}${relative}`;
  }
  // Relative path - resolve against base
  try {
    return new URL(relative, base).toString();
  } catch {
    return relative;
  }
}

// Extract src from script tags that contain stream URLs
export function extractScriptSrc(html: string, baseUrl: string): string[] {
  const urls: string[] = [];
  // Look for src patterns in script content
  const scriptSrcMatches = html.matchAll(/src\s*[:=]\s*["']([^"']+)["']/gi);
  for (const match of scriptSrcMatches) {
    const url = resolveUrl(baseUrl, match[1]);
    if (url.includes('.m3u8') || url.includes('stream') || url.includes('embed')) {
      urls.push(url);
    }
  }
  return urls;
}

export async function followIframeToM3u8(
  url: string,
  maxDepth: number = 3,
  currentDepth: number = 0
): Promise<string | null> {
  if (currentDepth >= maxDepth) {
    console.log(`⚠️ Max depth reached (${maxDepth})`);
    return null;
  }

  try {
    console.log(`🔄 [${currentDepth + 1}] Fetching: ${url}`);
    const html = await fetchWithRetry(url);

    // 1. Try to extract m3u8 directly
    let m3u8 = extractM3u8(html);
    if (m3u8) {
      console.log(`✅ Found m3u8 at depth ${currentDepth + 1}`);
      return m3u8;
    }

    // 2. Also check script src patterns
    const scriptUrls = extractScriptSrc(html, url);
    for (const scriptUrl of scriptUrls) {
      const scriptM3u8 = extractM3u8(await fetchWithRetry(scriptUrl));
      if (scriptM3u8) {
        console.log(`✅ Found m3u8 from script at depth ${currentDepth + 1}`);
        return scriptM3u8;
      }
    }

    // 3. Look for iframes
    const iframeUrls = extractIframeUrls(html);
    if (iframeUrls.length === 0) {
      console.log(`ℹ️ No iframe found at depth ${currentDepth + 1}`);
      return null;
    }

    // 4. Follow each iframe (resolve relative URLs)
    for (const iframeUrl of iframeUrls) {
      const resolvedUrl = resolveUrl(url, iframeUrl);
      console.log(`🔗 Following iframe: ${resolvedUrl}`);
      const result = await followIframeToM3u8(resolvedUrl, maxDepth, currentDepth + 1);
      if (result) {
        return result;
      }
    }

    return null;
  } catch (error) {
    console.error(`❌ Error at depth ${currentDepth + 1}:`, error);
    return null;
  }
}

export function extractSubtitles(html: string): Subtitle[] {
  const subtitles: Subtitle[] = [];

  // Check for JSON subtitles
  const jsonMatch = html.match(/"subtitles"\s*:\s*(\[[^\]]*\])/i);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      if (Array.isArray(parsed)) {
        parsed.forEach((sub: any) => {
          if (sub.url && sub.lang) {
            subtitles.push({ lang: sub.lang, url: sub.url });
          }
        });
      }
    } catch {}
  }

  // Check for <track> tags
  const subMatches = html.match(/<track[^>]+src=["']([^"']+)["'][^>]+label=["']([^"']+)["']/gi);
  if (subMatches) {
    subMatches.forEach(match => {
      const srcMatch = match.match(/src=["']([^"']+)["']/i);
      const labelMatch = match.match(/label=["']([^"']+)["']/i);
      if (srcMatch && labelMatch) {
        subtitles.push({ lang: labelMatch[1], url: srcMatch[1] });
      }
    });
  }

  return subtitles;
}
