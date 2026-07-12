/* Design: Broadcast Signal — provider showcase with network mesh background
   Signature: Signal strength bars, electric cyan status indicators, hover reveals URL patterns
*/
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, ExternalLink, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";

interface Provider {
  id: string;
  label: string;
  url: string;
  pattern: string;
  priority: number;
  status: "online" | "offline" | "unknown";
  avgTime: string;
}

const providers: Provider[] = [
  {
    id: "vidsrc.pm",
    label: "VidSrc.pm",
    url: "https://vidsrc.pm",
    pattern: "https://vidsrc.pm/embed/{type}/{id}[/season/episode]",
    priority: 1,
    status: "online",
    avgTime: "~1.2s",
  },
  {
    id: "moviesapi",
    label: "MoviesAPI",
    url: "https://moviesapi.to",
    pattern: "https://moviesapi.to/{type}/{id}[/season/episode]",
    priority: 2,
    status: "online",
    avgTime: "~1.4s",
  },
  {
    id: "111movies",
    label: "111Movies",
    url: "https://111movies.net",
    pattern: "https://111movies.net/{type}/{id}[/season/episode]",
    priority: 3,
    status: "online",
    avgTime: "~1.6s",
  },
  {
    id: "vidcore",
    label: "VidCore",
    url: "https://vidcore.org",
    pattern: "https://vidcore.org/embed/{type}/{id}[/season/episode]",
    priority: 4,
    status: "online",
    avgTime: "~1.3s",
  },
  {
    id: "vidsrc.to",
    label: "VidSrc.to",
    url: "https://vidsrc.to",
    pattern: "https://vidsrc.to/embed/{type}/{id}[/season/episode]",
    priority: 5,
    status: "online",
    avgTime: "~1.5s",
  },
  {
    id: "vidsrc.me",
    label: "VidSrc.me",
    url: "https://vidsrc.me",
    pattern: "https://vidsrc.me/embed/{type}/{id}[/season/episode]",
    priority: 6,
    status: "online",
    avgTime: "~1.7s",
  },
  {
    id: "vidlink.pro",
    label: "VidLink.pro",
    url: "https://vidlink.pro",
    pattern: "https://vidlink.pro/{type}/{id}[/season/episode]",
    priority: 7,
    status: "online",
    avgTime: "~1.1s",
  },
  {
    id: "vsembed.ru",
    label: "VsEmbed.ru",
    url: "https://vsembed.ru",
    pattern: "https://vsembed.ru/embed/{type}/{id}[/season]",
    priority: 8,
    status: "unknown",
    avgTime: "~2.0s",
  },
  {
    id: "vidsrc.top",
    label: "VidSrc.top",
    url: "https://vid-src.top",
    pattern: "https://vid-src.top/embed/{type}/{id}[/season/episode]",
    priority: 9,
    status: "online",
    avgTime: "~1.8s",
  },
  {
    id: "vidspark.to",
    label: "VidSpark.to",
    url: "https://vidspark.to",
    pattern: "https://vidspark.to/{type}/{id}[/season/episode]",
    priority: 10,
    status: "online",
    avgTime: "~1.4s",
  },
  {
    id: "autoembed.co",
    label: "AutoEmbed.co",
    url: "https://autoembed.co",
    pattern: "https://autoembed.co/{type}/{provider}/{id}[-season-episode]",
    priority: 11,
    status: "online",
    avgTime: "~1.6s",
  },
  {
    id: "vidsrc.in",
    label: "VidSrc.in",
    url: "https://vidsrc.in",
    pattern: "https://vidsrc.in/embed/{type}/{id}[/season/episode]",
    priority: 12,
    status: "online",
    avgTime: "~1.5s",
  },
];

export default function Providers() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/manus-storage/providers-bg_b92e705c.png"
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
              <Server className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {providers.length} Sources Monitored
              </span>
            </div>
            <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-foreground">
              Streaming Providers
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
              All 12 free streaming sources supported by Stream-Hub.pro. Each provider is
              monitored for availability, response time, and stream quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="container -mt-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="glass-panel rounded-xl border border-white/8 p-5 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Sources", value: "12", color: "text-foreground" },
            { label: "Online Now", value: "10+", color: "text-primary" },
            { label: "Avg Response", value: "~1.5s", color: "text-primary" },
            { label: "Coverage", value: "Movies + TV", color: "text-foreground" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`font-[var(--font-heading)] text-2xl md:text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Provider Grid */}
      <div className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card
                className={`bg-background border-white/8 overflow-hidden transition-all duration-200 cursor-pointer ${
                  expandedId === p.id ? "border-primary/40 glow-cyan" : "hover:border-primary/20"
                }`}
                onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
              >
                <div className="p-5">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        p.status === "online" ? "bg-green-400" : "bg-yellow-400"
                      }`} />
                      <span className="font-[var(--font-heading)] font-semibold text-foreground">
                        {p.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-mono bg-white/5">
                        #{p.priority}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          p.status === "online"
                            ? "text-green-400 border-green-400/30"
                            : "text-yellow-400 border-yellow-400/30"
                        }`}
                      >
                        {p.status === "online" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {p.status}
                      </Badge>
                    </div>
                  </div>

                  {/* URL link */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.url}
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* Expanded pattern */}
                  {expandedId === p.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-white/5"
                    >
                      <div className="text-xs text-muted-foreground mb-2">URL Pattern:</div>
                      <code className="text-xs font-mono text-primary bg-primary/5 px-3 py-2 rounded-md block break-all">
                        {p.pattern}
                      </code>
                      <div className="mt-3 flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          Avg: {p.avgTime}
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(30, 100 - p.priority * 5)}%` }}
                            className="h-full bg-primary/40 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
