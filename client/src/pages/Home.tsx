/* Design: Broadcast Signal — cinematic dark hero with signal wave aesthetics
   Signature: Electric cyan glow, oscilloscope wave dividers, staggered card reveals
   Typography: Space Grotesk headings, Inter body, JetBrains Mono for code
*/
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Zap,
  Play,
  Server,
  Globe,
  Shield,
  Clock,
  ArrowRight,
  Code,
  Layers,
  Cpu,
  Terminal,
  BarChart3,
  BookOpen,
} from "lucide-react";

const providers = [
  "VidSrc.pm", "MoviesAPI", "111Movies", "VidCore",
  "VidSrc.to", "VidSrc.me", "VidLink.pro", "VsEmbed.ru",
  "VidSrc.top", "VidSpark.to", "AutoEmbed.co", "VidSrc.in",
];

const features = [
  {
    icon: Cpu,
    title: "Parallel Resolution",
    desc: "All 12 sources resolve simultaneously. No sequential waiting — every provider is queried at the same time for maximum speed.",
  },
  {
    icon: Layers,
    title: "M3u8 Extraction",
    desc: "Automatically extracts M3u8 stream URLs from embed pages. Ready-to-play links returned directly to your application.",
  },
  {
    icon: Globe,
    title: "Subtitle Detection",
    desc: "Finds and extracts available subtitles in multiple languages with proper formatting for VTT and SRT delivery.",
  },
  {
    icon: BarChart3,
    title: "Quality Analysis",
    desc: "Detects available stream qualities automatically — from 480p to 1080p — and reports resolution alongside each source.",
  },
  {
    icon: Shield,
    title: "Rate Limiting & Cache",
    desc: "Built-in protection with 60 req/min per IP and intelligent caching. Resolved streams cached for 1 hour to reduce latency.",
  },
  {
    icon: Terminal,
    title: "Clean API",
    desc: "RESTful JSON endpoints with clear error responses, status codes, and comprehensive documentation for quick integration.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/manus-storage/hero-bg_8aced299.png"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        <div className="relative container pt-24 pb-32 md:pt-32 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <ActivityBadge />
              <span className="text-sm font-medium text-primary">
                12 Sources — All Operational
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="font-[var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight"
          >
            Decode Streams.
            <br />
            <span className="text-primary text-glow">All Sources.</span>
            <br />
            One Resolution.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Professional streaming source decoder that resolves any TMDB or IMDB ID
            across all free sources simultaneously. Extract M3u8 streams, subtitles,
            and quality data in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/decoder">
              <Button size="lg" className="text-base px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan">
                <Play className="w-4 h-4 mr-2" />
                Try the Decoder
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/api-docs">
              <Button variant="outline" size="lg" className="text-base px-8 h-12 border-white/15 text-foreground hover:bg-white/5">
                <Code className="w-4 h-4 mr-2" />
                API Docs
              </Button>
            </Link>
          </motion.div>

          {/* Provider ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-3"
          >
            {providers.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.03 }}
                className="px-3 py-1.5 rounded-md text-xs font-mono text-muted-foreground bg-white/5 border border-white/5"
              >
                {p}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="relative -mt-1">
          <svg viewBox="0 0 1440 80" className="w-full h-20 block" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,40 1440,40 L1440,80 L0,80 Z"
              fill="oklch(0.18 0.02 260)"
            />
          </svg>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground">
              Engineered for Speed
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Every feature designed around one goal: resolving streams as fast and reliably as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Card className="h-full bg-background border-white/8 p-6 hover:border-primary/30 transition-all duration-300 group">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-[var(--font-heading)] text-lg font-semibold text-foreground mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== LIVE RESOLUTION DEMO ===== */}
      <section className="py-20 md:py-28 relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground">
                Live Resolution
                <br />
                <span className="text-primary">in Action</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Enter any TMDB ID and watch all 12 providers resolve simultaneously.
                Success, failure, response time — everything displayed in real-time.
              </p>
              <Link href="/decoder" className="mt-8 inline-flex">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Zap className="w-4 h-4 mr-2" />
                  Launch Decoder
                </Button>
              </Link>
            </motion.div>

            {/* Right — mock resolution panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="glass-panel rounded-xl border border-white/8 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-white/3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    GET /api/resolve?type=movie&id=278
                  </span>
                </div>
                <div className="p-5 space-y-2.5">
                  {providers.slice(0, 6).map((p, i) => {
                    const success = i < 4;
                    const time = Math.floor(Math.random() * 2000) + 500;
                    return (
                      <motion.div
                        key={p}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/3 border border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${success ? "bg-green-400" : "bg-red-400"}`} />
                          <span className="text-sm font-mono text-foreground">{p}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          {success && (
                            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                              1080p
                            </span>
                          )}
                          <span className="text-xs font-mono text-muted-foreground">
                            {success ? "1.2s" : "timeout"}
                          </span>
                          {success ? (
                            <Server className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <span className="text-xs text-red-400">fail</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="px-5 py-3 border-t border-white/5 bg-white/3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">
                    4/6 sources resolved · avg 1.4s
                  </span>
                  <span className="text-xs font-mono text-primary">
                    2 more loading...
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== API SNIPPET ===== */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground">
                Simple Integration
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                One HTTP request. All sources resolved. The API returns structured
                JSON with M3u8 links, subtitles, quality data, and response metrics
                — ready for your application.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { label: "TMDB or IMDB ID", value: "Any format accepted" },
                  { label: "Movie or TV", value: "Automatic detection" },
                  { label: "Response Time", value: "~1.5s average" },
                  { label: "Rate Limit", value: "60 req/min per IP" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="glass-panel rounded-xl border border-white/8 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-white/3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">bash</span>
                </div>
                <pre className="p-5 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">
                  <code>{`# Resolve a movie by TMDB ID
curl "http://localhost:8000/api/resolve?type=movie&id=278"

# Resolve a TV show episode
curl "http://localhost:8000/api/resolve?type=tv&id=tt0903747&season=1&episode=1"

# Target a single provider
curl "http://localhost:8000/api/resolve?type=movie&id=278&provider=vidsrc.pm"`}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        <div className="relative container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-5xl font-bold text-foreground">
              Ready to Decode?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Start resolving streams across all 12 sources. Try the interactive decoder or read the full API documentation.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/decoder">
                <Button size="lg" className="text-base px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan">
                  <Play className="w-4 h-4 mr-2" />
                  Open Decoder
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button variant="outline" size="lg" className="text-base px-8 h-12 border-white/15 text-foreground hover:bg-white/5">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Docs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* Small animated status dot */
function ActivityBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="text-primary">
      <circle cx="8" cy="8" r="4" fill="currentColor" opacity="0.3">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}
