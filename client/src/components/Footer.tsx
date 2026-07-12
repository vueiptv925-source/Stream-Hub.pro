/* Design: Broadcast Signal — dark technical footer with wave motif */
import { Link } from "wouter";
import { Github, ExternalLink, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card/50 mt-auto">
      {/* Wave divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/manus-storage/logo_6c7477fd.png"
                alt="Stream-Hub.pro"
                className="w-8 h-8 object-contain"
              />
              <span className="font-[var(--font-heading)] font-bold text-lg text-foreground">
                Stream-Hub<span className="text-primary">.pro</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Professional streaming source decoder and aggregator. Resolve any TMDB or IMDB ID across 12 free sources simultaneously with M3u8 extraction, subtitle detection, and quality analysis.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com/vueiptv925-source/Stream-Hub.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-[var(--font-heading)] font-semibold text-sm text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/decoder" className="text-sm text-muted-foreground hover:text-primary transition-colors">Stream Decoder</Link></li>
              <li><Link href="/providers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Providers</Link></li>
              <li><Link href="/api-docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-[var(--font-heading)] font-semibold text-sm text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/vueiptv925-source/Stream-Hub.pro" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Source Code</a></li>
              <li><a href="https://github.com/vueiptv925-source/Stream-Hub.pro#readme" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="https://github.com/vueiptv925-source/Stream-Hub.pro/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Report Issue</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Stream-Hub.pro. MIT License.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="w-3 h-3 text-primary" />
            <span>12 sources monitored</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
