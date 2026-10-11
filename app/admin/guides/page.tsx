'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Edit, ExternalLink, Eye, EyeOff, Loader, Plus, Search, Trash2 } from 'lucide-react';
import { guidesClient } from '@/lib/guides/client';
import type { GuideSummary } from '@/lib/guides/types';
import { formatDate } from '@/lib/utils';

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState<GuideSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    try {
      setGuides(await guidesClient.listAll());
    } catch (err) {
      console.error('Failed to load guides', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const togglePublished = async (summary: GuideSummary) => {
    setBusyId(summary._id);
    try {
      const guide = await guidesClient.get(summary._id);
      if (!guide) return;
      await guidesClient.update(guide._id, { ...guide, published: !guide.published });
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this guide?')) return;
    setBusyId(id);
    try {
      await guidesClient.remove(id);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  const filtered = guides.filter((g) => g.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Guides</h1>
          <p className="text-zinc-500 mt-1">Write guides in markdown. Published guides appear in the Knowledge Hub.</p>
        </div>
        <Link
          href="/admin/guides/new"
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <Plus size={18} />
          New Guide
        </Link>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" size={20} />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-admin pl-12 h-12"
          placeholder="Search by title..."
          aria-label="Search guides"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.length > 0 ? (
          filtered.map((guide) => (
            <div
              key={guide._id}
              className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 group hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center gap-6"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      guide.published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {guide.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs text-zinc-600 font-medium">Updated {formatDate(guide.updatedAt)}</span>
                </div>
                <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors truncate">{guide.title}</h3>
                <p className="mt-1 text-sm text-zinc-500 line-clamp-1">{guide.summary || 'No summary'}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-zinc-500 text-xs">
                  <span className="flex items-center gap-1"><Clock size={12} /> {guide.readingTime} min read</span>
                  <span className="flex items-center gap-1 font-mono">/guides/{guide.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {guide.published && (
                  <Link
                    href={`/guides/${guide.slug}`}
                    target="_blank"
                    aria-label="Open public page"
                    className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                  >
                    <ExternalLink size={18} />
                  </Link>
                )}
                <button
                  onClick={() => togglePublished(guide)}
                  disabled={busyId === guide._id}
                  aria-label={guide.published ? 'Unpublish' : 'Publish'}
                  title={guide.published ? 'Unpublish' : 'Publish'}
                  className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-emerald-500 transition-all disabled:opacity-50"
                >
                  {guide.published ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <Link
                  href={`/admin/guides/${guide._id}`}
                  aria-label="Edit guide"
                  className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-emerald-500 transition-all"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(guide._id)}
                  disabled={busyId === guide._id}
                  aria-label="Delete guide"
                  className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500 transition-all disabled:opacity-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 text-zinc-600 mb-4">
              <BookOpen size={32} />
            </div>
            <p className="text-zinc-500">{guides.length ? 'No guides match your search.' : 'No guides yet. Write your first one.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
