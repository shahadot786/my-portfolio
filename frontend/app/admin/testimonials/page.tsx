'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  company?: string;
  content: string;
  image?: string;
  url?: string;
  featured: boolean;
  order: number;
}

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  company: z.string().optional().default(''),
  content: z.string().min(1, 'Content is required'),
  image: z.string().optional().default(''),
  url: z.string().optional().default(''),
  featured: z.boolean().default(true),
  order: z.number().default(0),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<TestimonialFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(testimonialSchema) as any,
    defaultValues: { featured: true, order: 0 }
  });

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data.testimonials);
    } catch (err) {
      console.error('Failed to fetch testimonials', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const onSubmit = async (data: TestimonialFormValues) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, data);
      } else {
        await api.post('/testimonials', data);
      }
      setIsModalOpen(false);
      fetchTestimonials();
      reset();
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save testimonial', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t._id);
    reset(t);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Testimonials</h1>
          <p className="text-zinc-500 mt-1">Manage feedback from your clients and colleagues.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            reset({ featured: true, order: 0 });
            setIsModalOpen(true);
          }}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all font-sans"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {testimonials.length > 0 ? testimonials.map((t) => (
          <div key={t._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex items-center justify-between group hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold uppercase overflow-hidden relative">
                {t.image ? <Image src={t.image} alt={t.name} fill className="object-cover" /> : t.name[0]}
              </div>
              <div>
                <h3 className="text-white font-bold">{t.name}</h3>
                <p className="text-zinc-500 text-sm">{t.title} {t.company && `at ${t.company}`}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => handleEdit(t)}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-all"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800 text-zinc-500">
            No testimonials found.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>

            <div className="p-8 space-y-5 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Person Name</label>
                  <input {...register('name')} className="input-admin" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Position / Role</label>
                  <input {...register('title')} className="input-admin" placeholder="Senior Manager" />
                </div>
              </div>

              <div>
                <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Company</label>
                <input {...register('company')} className="input-admin" placeholder="Unilever" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Avatar URL (Optional)</label>
                  <input {...register('image')} className="input-admin" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Profile Link (Optional)</label>
                  <input {...register('url')} className="input-admin" placeholder="LinkedIn URL" />
                </div>
              </div>

              <div>
                <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Testimonial Content</label>
                <textarea {...register('content')} rows={5} className="input-admin resize-none" placeholder="He did a great job..." />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" {...register('featured')} id="t-featured" className="w-5 h-5 rounded-lg border-zinc-800 bg-zinc-950 text-emerald-500" />
                <label htmlFor="t-featured" className="text-sm text-zinc-400">Featured Testimonial</label>
              </div>
            </div>

            <div className="p-6 bg-zinc-800/50 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl text-zinc-400 font-bold">Cancel</button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={submitting}
                className="bg-primary text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all font-sans"
              >
                {submitting ? <Loader className="animate-spin" size={18} /> : <Check size={18} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
