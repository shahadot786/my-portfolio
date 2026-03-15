"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, ArrowLeft, LayoutGrid, List } from 'lucide-react';
import { CONTENT_UNIVERSE } from '@/lib/data/content-universe';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ContentUniversePage() {
  const [activeFilter, setActiveFilter] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const filteredData = useMemo(() => {
    const results = [];
    let globalIndex = 0;

    for (const cat of CONTENT_UNIVERSE) {
      for (const topic of cat.topics) {
        globalIndex++;
        const matchesFilter = activeFilter === -1 || activeFilter === cat.id;
        const matchesSearch = !searchTerm || 
          topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
          cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cat.bn.includes(searchTerm);

        if (matchesFilter && matchesSearch) {
          results.push({
            id: globalIndex,
            category: cat.name,
            categoryBn: cat.bn,
            topic: topic,
            format: cat.format,
            colors: {
              bg: cat.bg,
              text: cat.dark_bg,
              dark_fg: cat.dark_fg
            }
          });
        }
      }
    }
    return results;
  }, [activeFilter, searchTerm]);

  // Reset to first page on filter/search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 mt-12 pb-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 disabled:opacity-50 disabled:hover:text-slate-400 disabled:hover:border-slate-800 transition-all"
        >
          Previous
        </button>
        
        <div className="flex items-center gap-1">
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum: number;
            if (totalPages <= 5) pageNum = i + 1;
            else if (currentPage <= 3) pageNum = i + 1;
            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
            else pageNum = currentPage - 2 + i;

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={cn(
                  "w-10 h-10 rounded-xl text-sm font-bold transition-all border",
                  currentPage === pageNum 
                    ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/20" 
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600"
                )}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 disabled:opacity-50 disabled:hover:text-slate-400 disabled:hover:border-slate-800 transition-all"
        >
          Next
        </button>
        
        <span className="ml-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-emerald-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative container-custom pt-12 pb-24 max-w-5xl">
        {/* Header */}
        <header className="mb-12 space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400"
            >
              🌿 ইমানের বাগান
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              12 categories · 1,110 video topics · A never-ending content universe for Islamic digital strategy.
            </motion.p>
          </div>
        </header>

        {/* Controls */}
        <div className="sticky top-6 z-40 mb-8 space-y-4">
          <div className="p-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search topics in English or Bengali..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/50 border-none rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
            
            {/* View Toggle */}
            <div className="hidden md:flex bg-slate-950/50 rounded-xl p-1 gap-1 border border-slate-800">
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === 'list' ? "bg-emerald-500/20 text-emerald-400" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === 'grid' ? "bg-emerald-500/20 text-emerald-400" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Count Badge */}
            <div className="px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-xl text-sm font-medium border border-emerald-500/20 flex items-center justify-center whitespace-nowrap">
              {filteredData.length.toLocaleString()} Topics
            </div>
          </div>

          {/* Categories */}
          <div className="p-2 bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-wrap gap-2 overflow-x-auto p-1 no-scrollbar justify-center md:justify-start">
              <button
                onClick={() => setActiveFilter(-1)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                  activeFilter === -1 
                    ? "bg-slate-200 text-slate-950 border-slate-200" 
                    : "bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-600"
                )}
              >
                All Categories
              </button>
              {CONTENT_UNIVERSE.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  style={{ 
                    backgroundColor: activeFilter === cat.id ? cat.bg : undefined,
                    color: activeFilter === cat.id ? cat.dark_bg : undefined,
                    borderColor: activeFilter === cat.id ? cat.bg : undefined,
                  }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                    activeFilter === cat.id 
                      ? "shadow-lg shadow-emerald-500/10 scale-105" 
                      : "bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-600"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-bottom border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">#</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-40">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Video Topic</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <AnimatePresence mode="popLayout">
                    {paginatedData.map((item, idx) => (
                      <motion.tr 
                        key={`${item.id}-${idx}`}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-500 tabular-nums">
                          {item.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span 
                              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight w-fit"
                              style={{ backgroundColor: item.colors.bg, color: item.colors.text }}
                            >
                              {item.category}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">{item.categoryBn}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-200 leading-relaxed group-hover:text-emerald-400 transition-colors">
                            {item.topic}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                          {item.format}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filteredData.length === 0 && (
                <div className="p-20 text-center">
                  <Info className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-300">No topics found</h3>
                  <p className="text-sm text-slate-500">Try adjusting your search or filter.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {paginatedData.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative p-6 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span 
                      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight"
                      style={{ backgroundColor: item.colors.bg, color: item.colors.text }}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-slate-700 tabular-nums">#{item.id}</span>
                  </div>
                  <p className="text-slate-200 font-medium leading-relaxed group-hover:text-emerald-300 transition-colors mb-4">
                    {item.topic}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.format}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{item.categoryBn}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredData.length === 0 && (
                <div className="col-span-full p-20 text-center">
                  <Info className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-300">No topics found</h3>
                  <p className="text-sm text-slate-500">Try adjusting your search or filter.</p>
                </div>
              )}
          </div>
        )}

        <Pagination />

        {/* Footer Info */}
        <footer className="mt-16 text-center space-y-4">
          <p className="text-slate-500 text-sm italic">
            &quot;Invite to the way of your Lord with wisdom and good instruction...&quot; — Quran 16:125
          </p>
          <div className="pt-8 border-t border-slate-900 flex justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Responsive Design
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Premium Interface
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
