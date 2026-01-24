'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import {
  ArrowLeft,
  Save,
  Loader,
  Eye,
  Image as ImageIcon,
  PenTool,
  Globe,
  Settings,
  X
} from 'lucide-react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type TabType = 'edit' | 'preview' | 'settings';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  thumbnail: z.string().optional(),
  categories: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export default function ArticleEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('edit');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<ArticleFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(articleSchema) as any,
    defaultValues: { published: false, categories: [] }
  });

  useEffect(() => {
    if (!isNew) {
      const fetchArticle = async () => {
        try {
          // We need a specific endpoint to fetch article by ID for editing
          // For now we'll assume the API provides it or we find by slug
          // In the seeded data we have IDs, so we can fetch by ID
          const res = await api.get(`/articles/id/${id}`);
          reset(res.data.article);
        } catch (err) {
          console.error(err);
          // fallback to articles list if not found
          router.push('/admin/articles');
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id, isNew, reset, router]);

  const onSubmit = async (data: ArticleFormValues) => {
    setSaving(true);
    try {
      if (isNew) {
        await api.post('/articles', data);
      } else {
        await api.put(`/articles/${id}`, data);
      }
      router.push('/admin/articles');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const title = watch('title');
  const content = watch('content');

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader className="animate-spin text-primary" size={32} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-black/50 backdrop-blur-md z-40 py-4 -mx-4 px-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles" className="p-2.5 rounded-xl bg-zinc-900 text-zinc-500 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white truncate max-w-[200px] md:max-w-md">
              {isNew ? 'New Article' : title || 'Untitled'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const isPublished = watch('published');
              setValue('published', !isPublished);
            }}
            className={cn(
              "p-2.5 rounded-xl font-bold text-xs uppercase transition-all flex items-center gap-2",
              watch('published') ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-900 text-zinc-500"
            )}
          >
            {watch('published') ? 'Published' : 'Draft'}
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={saving}
            className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all font-sans shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
          >
            {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
            Post
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-zinc-900/50 p-1 rounded-2xl w-fit">
        {[
          { id: 'edit', label: 'Write', icon: PenTool },
          { id: 'preview', label: 'Preview', icon: Eye },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'edit' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <input
            {...register('title')}
            className="text-4xl md:text-5xl font-black bg-transparent border-none placeholder:text-zinc-800 focus:ring-0 w-full p-0 text-white"
            placeholder="Article Title..."
          />
          <div className="h-px bg-zinc-800" />
          <textarea
            {...register('content')}
            rows={20}
            className="w-full bg-transparent border-none text-zinc-300 text-xl leading-relaxed placeholder:text-zinc-800 focus:ring-0 resize-none p-0"
            placeholder="Tell your story..."
          />
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{title || 'Post Preview'}</h1>
          <div
            className="prose prose-invert prose-emerald max-w-none text-zinc-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: content || 'No content yet...' }}
          />
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-300">
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Globe className="text-primary" size={20} />
              SEO & Metadata
            </h3>

            <div>
              <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Social Excerpt</label>
              <textarea {...register('excerpt')} rows={3} className="input-admin resize-none" placeholder="Catchy summary for cards..." />
            </div>

            <div>
              <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-zinc-600 text-xs">/articles/</span>
                <input {...register('slug')} className="input-admin h-9" placeholder="custom-slug" />
              </div>
            </div>

            <div>
              <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Categories (Comma separated)</label>
              <input
                className="input-admin"
                placeholder="Tech, React, JS"
                defaultValue={watch('categories')?.join(', ')}
                onChange={(e) => setValue('categories', e.target.value.split(',').map(c => c.trim()).filter(c => c))}
              />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <ImageIcon className="text-primary" size={20} />
              Cover Image
            </h3>

            <div className="aspect-video bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-800 flex items-center justify-center overflow-hidden">
              {watch('thumbnail') ? (
                <div className="relative group w-full h-full">
                  <NextImage src={watch('thumbnail') || ''} alt="Article cover" fill className="object-cover" />
                  <button
                    onClick={() => setValue('thumbnail', '')}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <ImageIcon className="mx-auto text-zinc-700 mb-2" size={32} />
                  <p className="text-zinc-600 text-xs">Enter image URL below</p>
                </div>
              )}
            </div>

            <input
              {...register('thumbnail')}
              className="input-admin"
              placeholder="https://image-url.com/cover.jpg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
