'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api-client';
import {
  Newspaper,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface Article {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  published: boolean;
  views: number;
  categories: string[];
  updatedAt: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchArticles = async () => {
    try {
      // Fetching all (including drafts) - we need to make sure the endpoint handles this
      // Usually GET /api/articles with admin auth returns everything
      const res = await api.get('/articles');
      setArticles(res.data.articles);
    } catch (err) {
      console.error('Failed to fetch articles', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this article?')) return;
    try {
      await api.delete(`/articles/${id}`);
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Articles</h1>
          <p className="text-zinc-500 mt-1">Manage your technical blog and writings.</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] font-sans"
        >
          <Plus size={18} />
          Write Article
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" size={20} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-admin pl-12 h-12"
            placeholder="Search by title..."
          />
        </div>
        <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-all">
          <Filter size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredArticles.length > 0 ? filteredArticles.map((article) => (
          <div key={article._id} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 group hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-full md:w-32 h-20 bg-zinc-800 rounded-2xl overflow-hidden shrink-0 relative">
              {article.thumbnail ? (
                <Image src={article.thumbnail} alt={article.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <Newspaper size={24} />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${article.published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
                  {article.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-[10px] text-zinc-600 font-medium">Updated {formatDate(article.updatedAt)}</span>
              </div>
              <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{article.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-zinc-500 text-xs">
                <span className="flex items-center gap-1"><Eye size={12} /> {article.views} views</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {article.categories.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/articles/${article.slug}`}
                target="_blank"
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-all"
              >
                <ExternalLink size={18} />
              </Link>
              <Link
                href={`/admin/articles/${article._id}`}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-emerald-500 transition-all font-sans"
              >
                <Edit size={18} />
              </Link>
              <button
                onClick={() => handleDelete(article._id)}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 text-zinc-600 mb-4">
              <Search size={32} />
            </div>
            <p className="text-zinc-500">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
