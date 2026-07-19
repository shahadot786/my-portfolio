'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Plus, Trash2, Edit2, Check } from 'lucide-react';


interface SkillCategory {
  _id: string;
  title: string;
  icon: string;
  badge?: string;
  description?: string;
  skills: string[];
  order: number;
}

const skillSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  icon: z.string().default('Code2'),
  badge: z.string().optional(),
  description: z.string().optional(),
  skills: z.array(z.string()).default([]),
  order: z.number().default(0),
});

type SkillFormValues = z.infer<typeof skillSchema>;

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm<SkillFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(skillSchema) as any,
    defaultValues: { skills: [], order: 0, icon: 'Code2', badge: '', description: '' }
  });

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setCategories(res.data.skills || []);
    } catch (err) {
      console.error('Failed to fetch skills', err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const onSubmit = async (data: SkillFormValues) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/skills/${editingId}`, data);
      } else {
        await api.post('/skills', data);
      }
      setIsModalOpen(false);
      fetchSkills();
      reset();
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save skill category', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill category?')) return;
    try {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error('Failed to delete skill category', err);
    }
  };


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Technical Expertise & Skills</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage your core technical expertise bento cards and skill categories.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            reset({ skills: [], order: 0, icon: 'Code2', badge: '', description: '' });
            setIsModalOpen(true);
          }}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all"
        >
          <Plus size={18} />
          Add Expertise Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex items-start justify-between group hover:border-zinc-700 transition-all gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm shrink-0">
                {cat.badge || cat.icon || "EA"}
              </div>
              <div className="space-y-1">
                <h3 className="text-white font-bold text-base">{cat.title}</h3>
                {cat.description && (
                  <p className="text-zinc-400 text-xs line-clamp-2">{cat.description}</p>
                )}
                <div className="flex flex-wrap gap-1 pt-1">
                  {cat.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-zinc-800 text-emerald-400 font-mono text-[10px] rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0">
              <button
                onClick={() => { setEditingId(cat._id); reset(cat); setIsModalOpen(true); }}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">{editingId ? 'Edit Expertise Category' : 'New Expertise Category'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Category Title</label>
                <input {...register('title')} className="input-admin" placeholder="e.g. Enterprise Architecture" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Badge / Tag (e.g. EA, OFF)</label>
                  <input {...register('badge')} className="input-admin" placeholder="EA" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Icon Name</label>
                  <input {...register('icon')} className="input-admin" placeholder="Code2 / Server" />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Description (Displayed on Home Bento section)</label>
                <textarea {...register('description')} rows={3} className="input-admin resize-none text-xs" placeholder="Architecting enterprise mobile applications..." />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Skills & Tech Stack (Comma separated)</label>
                <input
                  className="input-admin"
                  placeholder="React Native, TypeScript, Node.js, MongoDB"
                  defaultValue={watch('skills')?.join(', ')}
                  onChange={(e) => setValue('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Display Order</label>
                <input type="number" {...register('order', { valueAsNumber: true })} className="input-admin" placeholder="0" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl text-zinc-400 font-bold hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={submitting}
                className="bg-primary text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
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
