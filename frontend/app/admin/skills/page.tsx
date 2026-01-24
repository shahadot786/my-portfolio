'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Plus, Trash2, Edit2, Check, Code2 } from 'lucide-react';


interface SkillCategory {
  _id: string;
  title: string;
  icon: string;
  skills: string[];
  order: number;
}

const skillSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  icon: z.string().min(1, 'Icon name is required'),
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
    defaultValues: { skills: [], order: 0 }
  });

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setCategories(res.data.categories);
    } catch (err) {
      console.error('Failed to fetch skills', err);
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


  if (loading) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Skills</h1>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            reset();
            setIsModalOpen(true);
          }}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex items-center justify-between group hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Code2 size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold">{cat.title}</h3>
                <p className="text-zinc-500 text-xs">{cat.skills.length} skills</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => { setEditingId(cat._id); reset(cat); setIsModalOpen(true); }}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <Edit2 size={18} />
              </button>
              <button
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
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">{editingId ? 'Edit category' : 'New category'}</h2>
            <div className="space-y-4">
              <input {...register('title')} className="input-admin" placeholder="Category Title (e.g. Backend)" />
              <input {...register('icon')} className="input-admin" placeholder="Icon Name (e.g. Server)" />
              <div>
                <label className="block text-zinc-500 text-[10px] uppercase font-bold mb-2">Skills (Comma separated)</label>
                <input
                  className="input-admin"
                  placeholder="Node.js, Express, Go"
                  defaultValue={watch('skills')?.join(', ')}
                  onChange={(e) => setValue('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                />
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
