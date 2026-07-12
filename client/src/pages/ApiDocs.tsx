/* Design: Broadcast Signal — terminal-style API docs with live testing
   Signature: JetBrains Mono code blocks, electric cyan highlights, signal-wave dividers
*/
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Copy,
  Check,
  ArrowRight,
  Zap,
  Server,
  Activity,
  Info,
  Shield,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const endpoints = [
  {
    method: "GET",
    path: "/api/resolve",
    title: "Resolve Streams (Parallel)",
    desc: "Resolve streaming links from all 12 sources simultaneously. Returns M3u8 URLs, subtitles, quality data, and response metrics.",
    params: [
      { name: "type", required: true, type: "string", desc: '"movie" or "tv"' },
      { name: "id", required: true, type: "string", desc: "TMDB ID or IMDB ID (e.g., 278 or tt0111161)" },
      { name: "season", required: false, type: "number", desc: "Season number (TV only)" },
      { name: "episode", required: false, type: "number", desc: "Episode number (TV only)" },
      { name: "provider", required: false, type: "string", desc: "Filter by specific provider ID" },
    ],
    examples: [
      { label: "Movie", cmd: 'curl "http://localhost:8000/api/resolve?type=movie&id=278"' },
      { label: "TV Show", cmd: 'curl "http://localhost:8000/api/resolve?type=tv&id=tt0903747&season=1&episode=1"' },
      { label: "Single Provider", cmd: 'curl "http://localhost:8000/api/resolve?type=movie&id=278&provider=vidsrc.pm"' },
    ],
    response: `{
  "success": true,
  "data": {
    "id": "278",
    "type": "movie",
    "streams": [
      {
        "provider": "vidsrc.pm",
        "label": "VidSrc.pm",
        "url": "https://vidsrc.pm/embed/movie/278",
        "m3u8": "https://...",
        "quality": "1080p",
        "subtitles": [
          {
            "lang": "en",
            "label": "English",
            "url": "https://...",
            "format": "vtt"
          }
        ],
        "status": "success",
        "responseTime": 1200
      }
    ],
    "totalSources": 12,
    "successfulSources": 8,
    "failedSources": 4,
    "averageResponseTime": "1.50s"
  }
}`,
  },
  {
    method: "GET",
    path: "/api/providers",
    title: "List Providers",
    desc: "Get all available streaming providers with their status and priority.",
    params: [],
    examples: [{ label: "List all", cmd: 'curl "http://localhost:8000/api/providers"' }],
    response: `{
  "success": true,
  "data": {
    "providers": [
      { "id": "vidsrc.pm", "label": "VidSrc.pm", "enabled": true, "priority": 1 },
      { "id": "moviesapi", "label": "MoviesAPI", "enabled": true, "priority": 2 }
    ]
  }
}`,
  },
  {
    method: "GET",
    path: "/api/health",
    title: "Health Check",
    desc: "Check server health, uptime, memory usage, and provider status.",
    params: [],
    examples: [{ label: "Health", cmd: 'curl "http://localhost:8000/api/health"' }],
    response: `{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-07-12T00:00:00.000Z",
    "uptime": 3600,
    "memory": { "rss": 52428800 },
    "providers": 12
  }
}`,
  },
  {
    method: "GET",
    path: "/api/info",
    title: "API Info",
    desc: "Get API version, features, and endpoint list.",
    params: [],
    examples: [{ label: "Info", cmd: 'curl "http://localhost:8000/api/info"' }],
    response: `{
  "success": true,
  "data": {
    "name": "Stream-Hub.pro",
    "version": "2.0.0",
    "description": "Professional Streaming Source Decoder & Aggregator",
    "endpoints": ["GET /api/resolve", "GET /api/providers", "GET /api/health", "GET /api/info"],
    "sources": 12,
    "features": ["Parallel source resolution", "M3u8 extraction", "Subtitle extraction", "Quality detection", "Rate limiting", "Request caching"]
  }
}`,
  },
];

export default function ApiDocs() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [baseUrl, setBaseUrl] = useState("http://localhost:8000");

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/manus-storage/signal-pattern_acb4f456.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>
        <div className="relative container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">REST API v2.0</span>
            </div>
            <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-foreground">
              API Documentation
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
              Complete reference for Stream-Hub.pro endpoints. Parallel stream resolution,
              M3u8 extraction, subtitle detection — all accessible through clean REST endpoints.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Base URL + Rate Limits */}
      <div className="container mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Info,
              title: "Base URL",
              value: <input
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-mono text-primary w-full"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />,
            },
            {
              icon: Shield,
              title: "Rate Limit",
              value: <span className="text-sm font-mono text-foreground">60 requests / min per IP</span>,
            },
            {
              icon: Clock,
              title: "Cache Duration",
              value: <span className="text-sm font-mono text-foreground">1 hour per query</span>,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="bg-background border-white/8 p-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{item.title}</div>
                  <div className="mt-1">{item.value}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Endpoints */}
      <div className="container pb-20 space-y-6">
        {endpoints.map((ep, idx) => (
          <motion.div
            key={ep.path}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card className="bg-background border-white/8 overflow-hidden">
              {/* Endpoint header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                <span className="px-2.5 py-1 rounded text-xs font-bold font-mono bg-primary/20 text-primary">
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-foreground">{ep.path}</code>
              </div>

              <div className="p-6">
                <h3 className="font-[var(--font-heading)] text-lg font-semibold text-foreground mb-2">
                  {ep.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">{ep.desc}</p>

                <Tabs defaultValue="examples" className="w-full">
                  <TabsList className="bg-white/5 border border-white/5">
                    {ep.params.length > 0 && (
                      <TabsTrigger value="params" className="text-xs">
                        Parameters
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="examples" className="text-xs">
                      Examples
                    </TabsTrigger>
                    <TabsTrigger value="response" className="text-xs">
                      Response
                    </TabsTrigger>
                  </TabsList>

                  {/* Params */}
                  {ep.params.length > 0 && (
                    <TabsContent value="params" className="mt-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/5">
                              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Parameter</th>
                              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Required</th>
                              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Type</th>
                              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ep.params.map((p) => (
                              <tr key={p.name} className="border-b border-white/3">
                                <td className="py-2.5 px-3 font-mono text-primary">{p.name}</td>
                                <td className="py-2.5 px-3">
                                  {p.required ? (
                                    <span className="text-xs text-red-400 font-medium">Yes</span>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">No</span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground">{p.type}</td>
                                <td className="py-2.5 px-3 text-sm text-foreground">{p.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  )}

                  {/* Examples */}
                  <TabsContent value="examples" className="mt-4">
                    <div className="space-y-2">
                      {ep.examples.map((ex, i) => {
                        const fullCmd = ex.cmd.replace("http://localhost:8000", baseUrl);
                        return (
                          <div key={i} className="flex items-center gap-3 group">
                            <span className="text-xs text-muted-foreground w-24 shrink-0">{ex.label}</span>
                            <code className="flex-1 text-xs font-mono text-foreground bg-white/3 px-3 py-2 rounded-md truncate">
                              {fullCmd}
                            </code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => copyToClipboard(fullCmd, idx * 10 + i)}
                            >
                              {copiedIdx === idx * 10 + i ? (
                                <Check className="w-3.5 h-3.5 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>

                  {/* Response */}
                  <TabsContent value="response" className="mt-4">
                    <div className="relative">
                      <pre className="bg-white/3 border border-white/5 rounded-lg p-4 text-xs font-mono text-foreground leading-relaxed overflow-x-auto">
                        <code>{ep.response}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(ep.response, idx * 10 + 100)}
                      >
                        {copiedIdx === idx * 10 + 100 ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Error Response */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-background border-white/8 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
              <span className="px-2.5 py-1 rounded text-xs font-bold font-mono bg-destructive/20 text-destructive-foreground">
                ERROR
              </span>
              <span className="text-sm text-muted-foreground">Error Response Format</span>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                All endpoints return structured error responses with <code className="text-xs font-mono text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">success: false</code>.
              </p>
              <pre className="bg-white/3 border border-white/5 rounded-lg p-4 text-xs font-mono text-foreground">
                <code>{`{
  "success": false,
  "error": "Error message description"
}`}</code>
              </pre>
            </div>
          </Card>
        </motion.div>

        {/* Source Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-background border-white/8 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground font-medium">All Supported Sources</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">#</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Provider</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">URL Pattern</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1", "VidSrc.pm", "https://vidsrc.pm/embed/{type}/{id}[/season/episode]", "All"],
                    ["2", "MoviesAPI", "https://moviesapi.to/{type}/{id}[/season/episode]", "All"],
                    ["3", "111Movies", "https://111movies.net/{type}/{id}[/season/episode]", "All"],
                    ["4", "VidCore", "https://vidcore.org/embed/{type}/{id}[/season/episode]", "All"],
                    ["5", "VidSrc.to", "https://vidsrc.to/embed/{type}/{id}[/season/episode]", "All"],
                    ["6", "VidSrc.me", "https://vidsrc.me/embed/{type}/{id}[/season/episode]", "All"],
                    ["7", "VidLink.pro", "https://vidlink.pro/{type}/{id}[/season/episode]", "All"],
                    ["8", "VsEmbed.ru", "https://vsembed.ru/embed/{type}/{id}[/season]", "All"],
                    ["9", "VidSrc.top", "https://vid-src.top/embed/{type}/{id}[/season/episode]", "All"],
                    ["10", "VidSpark.to", "https://vidspark.to/{type}/{id}[/season/episode]", "All"],
                    ["11", "AutoEmbed.co", "https://autoembed.co/{type}/{provider}/{id}[-season-episode]", "All"],
                    ["12", "VidSrc.in", "https://vidsrc.in/embed/{type}/{id}[/season/episode]", "All"],
                  ].map(([num, name, url, type]) => (
                    <tr key={num} className="border-b border-white/3">
                      <td className="py-2.5 px-3 text-xs font-mono text-muted-foreground">{num}</td>
                      <td className="py-2.5 px-3 font-mono text-primary text-xs">{name}</td>
                      <td className="py-2.5 px-3 font-mono text-xs text-foreground">{url}</td>
                      <td className="py-2.5 px-3 text-xs text-muted-foreground">{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* GitHub link */}
        <div className="flex items-center justify-center gap-3 py-8">
          <a
            href="https://github.com/vueiptv925-source/Stream-Hub.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View source code on GitHub
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
