'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Save, LayoutTemplate, PenLine } from 'lucide-react';

interface Page {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string()
  })
});

// We need an interface that matches exactly what the form inputs give us (strings)
// The backend expects an array, but we'll handle that transformation in the submit if needed
// or we can just let the backend receive a string and ignore it if it expects an array (requires backend check)
// Actually better: let the form manage string, and we split it before sending to API if the API demands array.
// But earlier seed/model defined keywords as string[]. Let's check model.
// Model: keywords: [String]
// So API expects array.
// Form has input.
// We should transform in onSubmit.

type PageFormValues = z.infer<typeof pageSchema>;

export default function PagesAdmin() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await api.get('/pages');
      setPages(res.data.pages);
    } catch (err) {
      console.error('Failed to fetch pages', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: Page) => {
    setSelectedPage(page);
    reset({
      title: page.title,
      subtitle: page.subtitle,
      seo: {
        title: page.seo.title,
        description: page.seo.description,
        keywords: page.seo.keywords.join(', ')
      }
    });
    setMessage(null);
  };

  const onSubmit = async (data: PageFormValues) => {
    if (!selectedPage) return;
    setSaving(true);
    setMessage(null);

    const payload = {
      ...data,
      seo: {
        ...data.seo,
        keywords: data.seo.keywords.split(',').map(k => k.trim()).filter(Boolean)
      }
    };

    try {
      await api.put(`/pages/${selectedPage.slug}`, payload);
      setMessage({ type: 'success', text: 'Page updated successfully!' });
      fetchPages();
    } catch {
      setMessage({ type: 'error', text: 'Failed to update page.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader className="animate-spin text-primary" size={32} />
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <LayoutTemplate className="text-primary" />
          Page Content
        </h1>
        <p className="text-zinc-500 mt-1">Manage titles, subtitles, and SEO for your pages.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Page List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Pages</h2>
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page._id}
                onClick={() => handleEdit(page)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${selectedPage?._id === page._id
                  ? 'bg-primary/10 border-primary text-white'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
              >
                <span className="capitalize font-medium">{page.slug}</span>
                <PenLine size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${selectedPage?._id === page._id ? 'text-primary' : 'text-zinc-500'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          {selectedPage ? (
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-500">Editing</span>
                  <span className="capitalize text-primary">{selectedPage.slug}</span>
                </h2>
              </div>

              {message && (
                <div className={`p-4 rounded-xl text-sm mb-6 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Content Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Page Content</h3>
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Page Title</label>
                    <input {...register('title')} className="input-admin" placeholder="e.g. Featured Projects" />
                    {errors.title && <p className="text-red-500 text-[10px] mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Subtitle / Introduction</label>
                    <textarea {...register('subtitle')} rows={3} className="input-admin resize-none" placeholder="Brief introduction text..." />
                  </div>
                </div>

                <div className="w-full h-px bg-zinc-800 my-6" />

                {/* SEO Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">SEO Metadata</h3>
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Meta Title</label>
                    <input {...register('seo.title')} className="input-admin" placeholder="Browser tab title" />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Meta Description</label>
                    <textarea {...register('seo.description')} rows={2} className="input-admin resize-none" placeholder="Search engine description" />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Keywords (comma separated)</label>
                    <input {...register('seo.keywords')} className="input-admin" placeholder="react, typescript, portfolio..." />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-zinc-500 border border-dashed border-zinc-800 rounded-3xl min-h-[400px]">
              Select a page to edit content
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
