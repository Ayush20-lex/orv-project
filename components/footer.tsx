import React from "react";
import Link from "next/link";
import { ExternalLink, ShieldAlert, Sparkles } from "lucide-react";

const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
const serifFont = { fontFamily: "'Instrument Serif', Georgia, serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative z-20 border-t border-[#82b1ff]/15 bg-[#03050a] text-slate-300 pt-16 pb-12 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Project Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#82b1ff] shadow-[0_0_10px_#82b1ff]" />
              <span style={serifFont} className="text-2xl text-white tracking-wide">
                Star Stream
              </span>
              <span
                style={monoFont}
                className="text-[9px] uppercase px-2 py-0.5 rounded bg-[#42a5f5]/10 border border-[#42a5f5]/30 text-[#82b1ff] font-bold"
              >
                Fan Companion
              </span>
            </div>
            <p style={uiFont} className="text-sm text-slate-400 leading-relaxed max-w-md">
              An unofficial, non-commercial digital companion dedicated to the narrative universe of{" "}
              <span className="text-slate-200">Omniscient Reader&apos;s Viewpoint</span> (전지적 독자 시점).
              Designed for readers navigating scenarios, constellations, and character archives.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-amber-300/90 pt-1">
              <ShieldAlert size={14} className="shrink-0 text-amber-400" />
              <span style={uiFont} className="text-xs">
                Unofficial fan creation. Not endorsed by or affiliated with the original authors or publishers.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p style={monoFont} className="text-xs uppercase tracking-wider text-[#82b1ff] font-bold">
              Archive Directory
            </p>
            <ul style={uiFont} className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Broadcast Hero &amp; Scenario Feed
                </Link>
              </li>
              <li>
                <Link href="/characters" className="hover:text-white transition-colors">
                  Key Companions &amp; Incarnations
                </Link>
              </li>
              <li>
                <Link href="/constellations" className="hover:text-white transition-colors">
                  Constellation Observatory Atlas
                </Link>
              </li>
              <li>
                <Link href="/quotes" className="hover:text-white transition-colors">
                  Canonical Quotes &amp; Transmissions
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-white transition-colors">
                  Incarnation Attribute Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Releases Attribution */}
          <div className="md:col-span-4 space-y-3">
            <p style={monoFont} className="text-xs uppercase tracking-wider text-[#82b1ff] font-bold">
              Official ORV Publications
            </p>
            <p style={uiFont} className="text-xs text-slate-400 leading-relaxed">
              Support the original creators and legal releases of Omniscient Reader&apos;s Viewpoint:
            </p>
            <div className="space-y-2 pt-1 text-xs" style={uiFont}>
              <a
                href="https://www.webtoons.com/en/action/omniscient-reader/list?title_no=2154"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#82b1ff]/40 hover:bg-[#82b1ff]/5 text-slate-200 transition-all group"
              >
                <span>Official Webtoon (LINE Webtoon)</span>
                <ExternalLink size={13} className="text-[#82b1ff] group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://series.naver.com/novel/detail.series?productNo=3400124"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#82b1ff]/40 hover:bg-[#82b1ff]/5 text-slate-200 transition-all group"
              >
                <span>Official Webnovel (Naver Series)</span>
                <ExternalLink size={13} className="text-[#82b1ff] group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://novel.munpia.com/104993"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#82b1ff]/40 hover:bg-[#82b1ff]/5 text-slate-200 transition-all group"
              >
                <span>Original Serial (Munpia)</span>
                <ExternalLink size={13} className="text-[#82b1ff] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers & IP Rights */}
        <div className="pt-8 space-y-4 text-xs text-slate-500" style={uiFont}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-slate-400 mb-1">Creators &amp; Copyright Ownership</p>
              <p className="leading-relaxed">
                <span className="text-slate-300">Omniscient Reader&apos;s Viewpoint</span> is created by{" "}
                <span className="text-slate-300">sing N song</span> (싱숑). Webtoon adaptation art by{" "}
                <span className="text-slate-300">Sleepy-C</span> / <span className="text-slate-300">REDICE Studio</span>.
                Novel covers and webnovel illustrations by <span className="text-slate-300">Blackbox</span> (블랙박스).
                Published by <span className="text-slate-300">Munpia</span> and{" "}
                <span className="text-slate-300">Naver Webtoon Corp.</span> All trademarks, story scenarios, character
                names, dialogue, and original visual assets remain the exclusive property of their respective copyright
                holders. Star Stream claims no ownership over the ORV intellectual property.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-400 mb-1">Visual Assets &amp; Fair Dealing Notice</p>
              <p className="leading-relaxed">
                Images and artwork presented on this website are provided strictly for educational commentary, archival
                cataloging, and non-commercial fan appreciation. Source attribution and chapter citations are documented
                for all assets; however, legal reuse permissions from the rights holders remain unverified and all rights
                remain reserved. No license is granted or implied.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
            <p>© {new Date().getFullYear()} Star Stream Companion. Unofficial fan tribute.</p>
            <p className="font-mono text-[10px]">Production Target: https://orv-project.vercel.app</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
