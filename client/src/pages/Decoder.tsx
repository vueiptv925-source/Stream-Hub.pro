/* Design: Broadcast Signal — interactive decoder with real-time resolution display
   Signature: Terminal-style output, pulsing status indicators, staggered stream cards
   Functionality: Form-based decoder tester with simulated API responses
*/
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Globe,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Zap,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface StreamResult {
  provider: string;
  label: string;
  url: string;
  m3u8: string;
  quality: string;
  subtitles: { lang: string; label: string; format: string }[];
  status: "success" | "loading" | "error";
  responseTime: number;
}

const allProviders = [
  { id: "vidsrc.pm", label: "VidSrc.pm" },
  { id: "moviesapi", label: "MoviesAPI" },
  { id: "111movies", label: "111Movies" },
  { id: "vidcore", label: "VidCore" },
  { id: "vidsrc.to", label: "VidSrc.to" },
  { id: "vidsrc.me", label: "VidSrc.me" },
  { id: "vidlink.pro", label: "VidLink.pro" },
  { id: "vsembed.ru", label: "VsEmbed.ru" },
  { id: "vidsrc.top", label: "VidSrc.top" },
  { id: "vidspark.to", label: "VidSpark.to" },
  { id: "autoembed.co", label: "AutoEmbed.co" },
  { id: "vidsrc.in", label: "VidSrc.in" },
];

const sampleSubtitles = [
  { lang: "en", label: "English", format: "vtt" },
  { lang: "ar", label: "Arabic", format: "vtt" },
  { lang: "fr", label: "French", format: "vtt" },
  { lang: "es", label: "Spanish", format: "vtt" },
  { lang: "de", label: "German", format: "vtt" },
];

export default function Decoder() {
  const [contentType, setContentType] = useState("movie");
  const [id, setId] = useState("");
  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");
  const [provider, setProvider] = useState("all");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StreamResult[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("results");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) return;

    setLoading(true);
    setResults(null);
    setExpandedId(null);

    // Simulate parallel resolution
    const targets = provider === "all"
      ? allProviders
      : allProviders.filter((p) => p.id === provider);

    const simulated: StreamResult[] = targets.map((p) => ({
      provider: p.id,
      label: p.label,
      url: `https://${p.id.replace(".", "-")}/embed/${contentType}/${id}${contentType === "tv" ? `/${season}/${episode}` : ""}`,
      m3u8: `https://cdn.example.com/stream/${id}/${p.id}/manifest.m3u8`,
      quality: ["1080p", "720p", "480p"][Math.floor(Math.random() * 3)],
      subtitles: Math.random() > 0.3
        ? sampleSubtitles.slice(0, Math.floor(Math.random() * 4) + 1)
        : [],
      status: "loading" as const,
      responseTime: 0,
    }));

    setResults(simulated);

    // Simulate resolution with staggered timing
    for (let i = 0; i < simulated.length; i++) {
      await new Promise((r) => setTimeout(r, 300 + Math.random() * 1200));
      setResults((prev) => {
        if (!prev) return prev;
        const updated = [...prev];
        const success = Math.random() > 0.25;
        updated[i] = {
          ...updated[i],
          status: success ? "success" : "error",
          responseTime: Math.floor(500 + Math.random() * 2000),
          m3u8: success ? updated[i].m3u8 : "",
          quality: success ? updated[i].quality : "-",
          subtitles: success ? updated[i].subtitles : [],
        };
        return updated;
      });
    }

    setLoading(false);
  };

  const copyUrl = (url: string, idx: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const successCount = results?.filter((r) => r.status === "success").length ?? 0;
  const errorCount = results?.filter((r) => r.status === "error").length ?? 0;
  const avgTime = results
    ? Math.round(results.reduce((a, r) => a + r.responseTime, 0) / results.length)
    : 0;

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
              <Play className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Live Stream Decoder</span>
            </div>
            <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-foreground">
              Decode Any Stream
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
              Enter a TMDB or IMDB ID and watch all sources resolve in real-time.
              Get M3u8 links, subtitles, and quality data instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Decoder Form + Results */}
      <div className="container pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="bg-background border-white/8 p-6 sticky top-24">
              <h3 className="font-[var(--font-heading)] text-lg font-semibold text-foreground mb-5">
                Stream Parameters
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Content Type */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="movie">Movie</SelectItem>
                      <SelectItem value="tv">TV Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* ID */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">TMDB / IMDB ID</Label>
                  <Input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="e.g., 278 or tt0111161"
                    className="bg-white/5 border-white/10 font-mono"
                  />
                </div>

                {/* TV fields */}
                <AnimatePresence>
                  {contentType === "tv" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Season</Label>
                        <Input
                          value={season}
                          onChange={(e) => setSeason(e.target.value)}
                          type="number"
                          min="1"
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Episode</Label>
                        <Input
                          value={episode}
                          onChange={(e) => setEpisode(e.target.value)}
                          type="number"
                          min="1"
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Provider filter */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Target Provider</Label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources (Parallel)</SelectItem>
                      {allProviders.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !id.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Resolving...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Resolve Streams
                    </>
                  )}
                </Button>
              </form>

              {/* Quick picks */}
              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="text-xs text-muted-foreground mb-3">Quick test IDs:</p>
                <div className="flex flex-wrap gap-2">
                  {["278", "603", "tt0903747", "tt0944947"].map((quickId) => (
                    <button
                      key={quickId}
                      onClick={() => {
                        if (quickId.startsWith("tt")) {
                          setContentType("tv");
                        }
                        setId(quickId);
                      }}
                      className="px-2.5 py-1 text-xs font-mono bg-white/5 border border-white/5 rounded-md hover:border-primary/30 hover:text-primary transition-colors"
                    >
                      {quickId}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="lg:col-span-3">
            {!results && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-80 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Play className="w-7 h-7 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Enter a TMDB or IMDB ID to start resolving streams
                </p>
                <p className="text-xs text-muted-foreground/60 mt-2">
                  All 12 sources will be queried simultaneously
                </p>
              </motion.div>
            )}

            {loading && results && (
              <div className="space-y-3">
                {results.map((r, i) => (
                  <motion.div
                    key={r.provider}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      {r.status === "loading" ? (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      ) : r.status === "success" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-red-400/60" />
                      )}
                      <span className="text-sm font-mono text-foreground">{r.label}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {r.status === "loading" ? "resolving..." : `${r.responseTime}ms`}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && results && (
              <div className="space-y-4">
                {/* Summary bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel rounded-lg border border-white/8 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="font-[var(--font-heading)] text-xl font-bold text-primary">{successCount}</div>
                      <div className="text-xs text-muted-foreground">Success</div>
                    </div>
                    <div className="text-center">
                      <div className="font-[var(--font-heading)] text-xl font-bold text-destructive">{errorCount}</div>
                      <div className="text-xs text-muted-foreground">Failed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-[var(--font-heading)] text-xl font-bold text-foreground">{avgTime}ms</div>
                      <div className="text-xs text-muted-foreground">Avg Time</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {["results", "json"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          activeTab === tab
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-muted-foreground hover:text-foreground bg-white/5"
                        }`}
                      >
                        {tab === "results" ? "Streams" : "JSON"}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {activeTab === "results" ? (
                  /* Stream Cards */
                  <div className="space-y-3">
                    {results.map((r, i) => (
                      <motion.div
                        key={r.provider}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`rounded-lg border overflow-hidden transition-all ${
                          r.status === "success"
                            ? "border-green-400/20 bg-green-400/3"
                            : r.status === "error"
                            ? "border-red-400/20 bg-red-400/3"
                            : "border-white/5 bg-white/3"
                        }`}
                      >
                        <div
                          className="flex items-center justify-between px-4 py-3 cursor-pointer"
                          onClick={() => setExpandedId(expandedId === r.provider ? null : r.provider)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${
                              r.status === "success" ? "bg-green-400" : "bg-red-400"
                            }`} />
                            <span className="text-sm font-mono text-foreground">{r.label}</span>
                            {r.status === "success" && (
                              <Badge variant="secondary" className="text-xs font-mono bg-primary/10 text-primary">
                                {r.quality}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground">{r.responseTime}ms</span>
                            {expandedId === r.provider ? (
                              <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedId === r.provider && r.status === "success" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 space-y-3"
                            >
                              {/* M3u8 */}
                              <div>
                                <div className="text-xs text-muted-foreground mb-1.5">M3u8 Stream:</div>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 text-xs font-mono text-primary bg-primary/5 px-3 py-2 rounded-md truncate">
                                    {r.m3u8}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 shrink-0"
                                    onClick={() => copyUrl(r.m3u8, i)}
                                  >
                                    {copiedIdx === i ? (
                                      <Check className="w-3.5 h-3.5 text-green-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              {/* Subtitles */}
                              {r.subtitles.length > 0 && (
                                <div>
                                  <div className="text-xs text-muted-foreground mb-2">Subtitles:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {r.subtitles.map((sub) => (
                                      <Badge
                                        key={sub.lang}
                                        variant="outline"
                                        className="text-xs font-mono border-white/10 text-foreground"
                                      >
                                        {sub.label} ({sub.format})
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Embed URL */}
                              <div>
                                <div className="text-xs text-muted-foreground mb-1.5">Embed URL:</div>
                                <a
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {r.url}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* JSON View */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="relative">
                      <pre className="bg-white/3 border border-white/5 rounded-lg p-4 text-xs font-mono text-foreground leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                        <code>{JSON.stringify({
                          success: true,
                          data: {
                            id,
                            type: contentType,
                            streams: results.filter((r) => r.status === "success"),
                            totalSources: results.length,
                            successfulSources: successCount,
                            failedSources: errorCount,
                            averageResponseTime: `${(avgTime / 1000).toFixed(2)}s`,
                          },
                        }, null, 2)}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 w-8 h-8"
                        onClick={() => copyUrl(JSON.stringify({
                          success: true,
                          data: {
                            id,
                            type: contentType,
                            streams: results.filter((r) => r.status === "success"),
                            totalSources: results.length,
                            successfulSources: successCount,
                            failedSources: errorCount,
                            averageResponseTime: `${(avgTime / 1000).toFixed(2)}s`,
                          },
                        }, null, 2), 999)}
                      >
                        {copiedIdx === 999 ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
