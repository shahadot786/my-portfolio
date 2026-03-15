"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Copy, 
  Check, 
  History as HistoryIcon, 
  Loader2,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScriptHistory {
  _id: string;
  topic: string;
  category: string;
  audience: string;
  duration: string;
  tone: string;
  content: string;
  createdAt: string;
}

export default function ScriptGenerator() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("Sahaba Stories (Companions)");
  const audience = "Bangladeshi Muslims (general audience)";
  const [duration, setDuration] = useState("90-120 seconds (medium reel)");
  const tone = "warm and deeply emotional — bring tears through love not sadness";
  
  const [includeOverlay, setIncludeOverlay] = useState(true);
  const [bilingual, setBilingual] = useState(true);
  const [includeSource, setIncludeSource] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<ScriptHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/scripts');
      const data = await res.json();
      if (data.success) {
        setHistory(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const generate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setResult("");

    const prompt = `You are an expert Islamic content creator and scriptwriter for the Bengali Facebook Reel page "ইমানের বাগান" (Garden of Faith). You write with deep Islamic knowledge, verified from authentic sources, and craft emotionally resonant, beautifully structured scripts that serve both Muslim and non-Muslim audiences. You always verify Islamic facts before including them and clearly distinguish between authentic narrations and moral parables. Your writing is warm, cinematic, and spiritually nourishing.

━━━━━━━━━━━━━━━━━━━━
TOPIC: ${topic}
CATEGORY: ${category}
TARGET AUDIENCE: ${audience}
DURATION: ${duration}
EMOTIONAL TONE: ${tone}
━━━━━━━━━━━━━━━━━━━━

CRITICAL RULES YOU MUST FOLLOW:
1. The HOOK must be the first 3 seconds — a single shocking, emotional, or curiosity-driven sentence that stops the scroll.
2. The VIDEO TITLE (shown as text overlay in the video) must be a question-format title that grabs attention.
3. The SCRIPT must follow the 4-part storytelling structure: Hook (3s) → Story Body → Lesson Reveal → Call to Action.
4. Script 1 uses the EMOTIONAL NARRATIVE style.
5. Script 2 uses the REFLECTIVE QUESTION-LED style.
6. ${includeSource ? 'Cite authentic source (e.g., Sahih Bukhari / Surah X:Y).' : 'Skip the source section.'}
7. ${includeHashtags ? 'Generate 5 Bengali + 5 English + 3 universal Islamic hashtags.' : 'Skip hashtags.'}
8. ${bilingual ? 'Generate EACH script in BOTH Bengali (বাংলা) and English.' : 'Generate in Bengali only.'}

Use the output format exactly as specified.`;

    try {
      const res = await fetch('/api/scripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic, category, audience, duration, tone, prompt
        })
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.data.content);
        fetchHistory();
      } else {
        alert(data.error || "Generation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f1a14] text-[#e8f0e4] selection:bg-emerald-500/30 font-sans">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#162010]/95 backdrop-blur-xl border-b border-emerald-500/10 z-50 flex items-center px-6 gap-4">
        <div className="text-xl font-serif text-[#4caf7d] tracking-wide">🌿 ইমানের <span className="text-[#d4a017]">বাগান</span></div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
          Script Generator
        </div>
        <div className="ml-auto hidden md:block text-[10px] text-emerald-500/50 font-medium uppercase tracking-widest">
          2 styles · Bengali + English · Hook + Script + Metadata
        </div>
      </div>

      <div className="pt-16 flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Left Panel: Inputs */}
        <aside className="w-full md:w-[380px] bg-[#162010] border-r border-emerald-500/10 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-bold text-emerald-500/50 uppercase tracking-[2px]">Content Settings</h2>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "p-2 rounded-lg transition-all",
                showHistory ? "bg-emerald-500 text-slate-950" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
              )}
            >
              <HistoryIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-100/60 flex items-center gap-1.5">
                Video Topic <span className="text-emerald-500">*</span>
              </label>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Ali (RA) lifting the door of Khaybar..."
                className="w-full h-32 bg-[#243320] border border-emerald-500/10 rounded-xl p-4 text-sm focus:border-emerald-500/40 outline-none transition-all resize-none placeholder-emerald-100/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-100/60">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#243320] border border-emerald-500/10 rounded-xl p-3 text-sm focus:border-emerald-500/40 outline-none"
              >
                <option>Prophets&apos; Stories (قصص الأنبياء)</option>
                <option>Sahaba Stories (Companions)</option>
                <option>Seerah — Prophet&apos;s Life (সীরাতুন নবী)</option>
                <option>Tawbah & Hope (তওবা ও আশা)</option>
                <option>Quranic Story & Tadabbur (তাদাব্বুর)</option>
                <option>Islamic History (ইতিহাস)</option>
                <option>Hadith Life Lessons (হাদীস পাঠ)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-100/60">Duration</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#243320] border border-emerald-500/10 rounded-xl p-3 text-sm focus:border-emerald-500/40 outline-none"
              >
                <option>60-90 seconds (short reel)</option>
                <option>90-120 seconds (medium reel)</option>
                <option>120-180 seconds (full story reel)</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="pt-4 space-y-2">
              <h3 className="text-[10px] font-bold text-emerald-500/40 uppercase tracking-widest mb-3">Output Options</h3>
              <Toggle checked={includeOverlay} onChange={setIncludeOverlay} label="Include text overlay title" />
              <Toggle checked={bilingual} onChange={setBilingual} label="Bilingual (Bengali + English)" />
              <Toggle checked={includeSource} onChange={setIncludeSource} label="Citations & Sources" />
              <Toggle checked={includeHashtags} onChange={setIncludeHashtags} label="Generate Hashtags" />
            </div>
          </div>

          <button 
            onClick={generate}
            disabled={loading || !topic.trim()}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/20 disabled:text-emerald-500/40 text-[#0d2b1c] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? "Planting Seeds..." : "Generate 2 Scripts"}
          </button>
        </aside>

        {/* Right Panel: Display */}
        <main className="flex-1 bg-[#0f1a14] overflow-y-auto p-4 md:p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            {showHistory ? (
              <motion.div 
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold text-emerald-100">Generation History</h2>
                  <div className="text-sm text-emerald-500 font-medium">{history.length} scripts saved</div>
                </div>
                {history.length === 0 ? (
                  <div className="py-20 text-center border-2 border-dashed border-emerald-500/10 rounded-3xl">
                    <HistoryIcon className="w-12 h-12 text-emerald-500/20 mx-auto mb-4" />
                    <p className="text-emerald-100/40">No history found yet</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {history.map((item) => (
                      <HistoryCard key={item._id} item={item} onSelect={(content) => {setResult(content); setShowHistory(false);}} />
                    ))}
                  </div>
                )}
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="flex items-center justify-between sticky top-0 py-4 bg-[#0f1a14]/90 backdrop-blur-md z-10">
                  <h2 className="text-xl font-serif text-emerald-100 font-bold">Generated Script</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => copyToClipboard(result, 'result')}
                      className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-2 text-sm font-semibold"
                    >
                      {copyStatus === 'result' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copyStatus === 'result' ? "Copied" : "Copy All"}
                    </button>
                    <button 
                      onClick={() => setResult("")}
                      className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 hover:bg-emerald-500/20 transition-all"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-emerald-50/90 bg-[#162010] p-8 md:p-12 rounded-[2.5rem] border border-emerald-500/10 shadow-2xl">
                    {result}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-emerald-100 mb-4">Your script garden awaits</h2>
                <p className="text-emerald-100/40 max-w-md leading-relaxed">
                  Enter a video topic on the left and click Generate. Our AI will craft two deeply resonant scripts based on Islamic history and wisdom.
                </p>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
                  {["Prophets", "Sahaba", "Seerah", "Hope"].map(t => (
                    <div key={t} className="p-4 bg-[#162010] rounded-2xl border border-emerald-500/10 text-xs font-bold text-emerald-500 uppercase tracking-widest">{t}</div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean, onChange: (v: boolean) => void, label: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-[#243320] border border-emerald-500/10 rounded-xl hover:border-emerald-500/30 transition-all cursor-pointer" onClick={() => onChange(!checked)}>
      <span className="text-xs font-semibold text-emerald-100/70">{label}</span>
      <div className={cn(
        "w-10 h-5 rounded-full relative transition-all border border-emerald-500/20",
        checked ? "bg-emerald-500" : "bg-[#2e4028]"
      )}>
        <div className={cn(
          "absolute top-0.5 bottom-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all",
          checked ? "left-[22px]" : "left-0.5"
        )} />
      </div>
    </div>
  );
}

function HistoryCard({ item, onSelect }: { item: ScriptHistory, onSelect: (c: string) => void }) {
  return (
    <div 
      onClick={() => onSelect(item.content)}
      className="group p-5 bg-[#162010] border border-emerald-500/10 rounded-2xl hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col gap-3"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-emerald-100 line-clamp-1">{item.topic}</h3>
        <span className="text-[10px] text-emerald-500/40 tabular-nums uppercase font-bold tracking-widest">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-bold text-emerald-400 uppercase tracking-tighter">
          {item.category.split(' ')[0]}
        </span>
        <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[9px] font-bold text-amber-500 uppercase tracking-tighter">
          {item.duration.split(' ')[0]}s
        </span>
      </div>
      <div className="text-[12px] text-emerald-100/30 line-clamp-2 font-serif leading-relaxed italic">
        {item.content.substring(0, 150)}...
      </div>
    </div>
  );
}
